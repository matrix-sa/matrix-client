<script setup>
  import locationIcon from '@/assets/images/logos/location.svg'
  import {
    radiusRangeValidator,
    requiredValidator,
  } from '@/utilities/validators'
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    isDialogVisible: {
      type: Boolean,
      required: true,
    },
    location: {
      type: Object,
      required: false,
      default: null,
    },
    isViewMode: {
      type: Boolean,
      required: false,
      default: false,
    },
  })

  const emit = defineEmits(['saved', 'update:isDialogVisible'])

  const { t } = useI18n()

  const latitude = ref(24.802871)
  const longitude = ref(46.677084)
  const radiusInMeters = ref(1000)

  if (props.location) {
    latitude.value = props.location.latitude
    longitude.value = props.location.longitude
    radiusInMeters.value = props.location.radius_in_meters
  }

  const radiusInput = ref(null)

  const selectedCoordinates = computed(() => {
    return {
      latitude: latitude.value,
      longitude: longitude.value,
      radius_in_meters: radiusInMeters.value,
      name: t('snap_location'),
    }
  })

  const handleMarkerDrop = marker => {
    latitude.value = marker.latLng.lat()
    longitude.value = marker.latLng.lng()
  }

  const submit = () => {
    emit('saved', selectedCoordinates.value)
    emit('update:isDialogVisible', false)
  }
  const handleClose = () => {
    emit('update:isDialogVisible', false)
  }

  const isRadiusInputValid = computed(() => {
    return (
      radiusRangeValidator(radiusInMeters.value) === true &&
      requiredValidator(radiusInMeters.value) === true
    )
  })
  const isValid = computed(
    () => !!selectedCoordinates.value && isRadiusInputValid.value
  )
</script>
<template>
  <v-card class="connect-platform px-6 rounded-xl" min-width="40vw">
    <v-card-title class="d-flex justify-space-between align-center px-0">
      <div class="text-h6 text-medium-emphasis text-tajawal">
        <div class="d-flex align-center ga-2">
          <v-img :src="locationIcon" width="20" />
          <p class="dark-1 font-weight-bold">{{ t("location_modal") }}</p>
        </div>
      </div>
      <v-btn icon="mdi-close" variant="text" @click="handleClose" />
    </v-card-title>

    <v-divider />

    <v-container>
      <v-row>
        <VCol cols="12">
          <VForm ref="radiusInput">
            <AppTextInput
              v-model="radiusInMeters"
              :label="$t('radius_in_meters')"
              :readonly="isViewMode"
              :rules="[requiredValidator, radiusRangeValidator]"
            />
          </VForm>
        </VCol>
        <VCol cols="12">
          <label class="v-label mb-1 text-body-2 text-high-emphasis">
            {{ t("point") }}
          </label>
          <GMapMap
            :center="{
              lat: latitude,
              lng: longitude,
            }"
            map-type-id="terrain"
            style="height: 300px"
            :zoom="11"
          >
            <GMapMarker
              clickable
              draggable
              :options="{
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                rotateControl: true,
                fullscreenControl: true,
                draggable: !isViewMode,
              }"
              :position="{
                lat: latitude,
                lng: longitude,
              }"
              @dragend="handleMarkerDrop"
            >
              <GMapCircle
                :center="{
                  lat: latitude,
                  lng: longitude,
                }"
                :options="{
                  fillColor: '#528BE2',
                  strokeColor: '#528BE2',
                }"
                :radius="+radiusInMeters"
              />
            </GMapMarker>
          </GMapMap>
        </VCol>
      </v-row>
    </v-container>
    <v-divider class="mt-2" />
    <v-card-actions class="my-2 d-flex justify-end">
      <v-btn rounded="xl" :text="t('cancel')" @click="handleClose" />
      <v-btn
        v-if="!isViewMode"
        append-icon="mdi-check"
        color="success"
        :disabled="!isValid"
        rounded="xl"
        :text="t('save')"
        @click="submit"
      />
    </v-card-actions>
  </v-card>
</template>

<style lang="scss">
.v-col-sm-6 {
  padding: 0 8px;
}

.connect-platform {
  .dark-1 {
    color: rgb(var(--v-dark-1));
  }

  .close-btn {
    svg {
      color: rgb(var(--v-dark-1));
    }
  }

  .save-btn {
    justify-content: space-around;
  }

  .save-btn:disabled {
    opacity: 0.35 !important;
  }

  .camp-rule-text {
    background-color: rgb(var(--v-theme-background));
    border-radius: 12px;

    p {
      color: rgb(var(--v-dark-1));
    }
  }
}

.app-select {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
