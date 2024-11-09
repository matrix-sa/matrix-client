<script setup>
  import { radiusRangeValidator, requiredValidator } from '@/utilities/validators'
  import AdsGroupsService from '@/services/ads-groups-service'
  import TargetingService from '@/services/targeting-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { computed, reactive, ref, toRef, watch } from 'vue'
  import { useRequest } from 'vue-request'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const { t } = useI18n()

  const props = defineProps({
    adGroup: {
      type: Object,
      default: null,
    },
    campaignId: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: false,
      default: 'SNAPCHAT',
    },
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  })

  const router = useRouter()
  const refVForm = ref(null)

  // Gender, Operating Systems, and Language Options
  const genders = ref([
    { id: '', name: t('both_genders') },
    { id: 'Male', name: t('male') },
    { id: 'Female', name: t('female') },
  ])
  const operatingSystems = ref([
    { id: '', name: t('all_devices') },
    { id: 'iOS', name: 'iOS' },
    { id: 'Android', name: 'Android' },
  ])
  const languages = ref([
    { code: '', name: t('both_languages') },
    { code: 'ar', name: t('arabic') },
    { code: 'en', name: t('english') },
  ])

  const locations = ref([])

  const { show } = useSnackbarStore()

  const form = ref({
    id: null,
    campaign_id: props.campaignId,
    name: null,
    gender: null,
    language_code: null,
    operating_system: null,
    country_code: null,
    minimum_age: null,
    maximum_age: null,
    latitude: 24.802871,
    longitude: 46.677084,
    radius_in_meters: null,
  })

  const isEditMode = ref(false)

  if (props.adGroup) {
    form.value = { ...props.adGroup }
    isEditMode.value = true
  }

  const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
      if (!isValid) {
        const el = document.querySelector('.v-input--error:first-of-type')
        if (el) { el.scrollIntoView() }
        return
      }

      const data = { ...form.value }
      if (data.gender === '') data.gender = null
      if (data.language_code === '') data.language_code = null
      if (data.operating_system === '') data.operating_system = null

      if (isEditMode.value) {
        runUpdate(data)
      } else {
        runCreate(data)
      }
    })
  }

  const { run: runCreate, loading: creationLoading } = useRequest(
    data => AdsGroupsService.create(props.platform, data),
    {
      manual: true,
      onSuccess: () => {
        show(t('created_message'), 'success')
        router.push(`/campaigns/`)
      },
    }
  )

  const { run: runUpdate, loading: updateLoading } = useRequest(
    data => AdsGroupsService.update(props.platform, data),
    {
      manual: true,
      onSuccess: () => {
        show(t('updated_message'), 'success')
        router.push(`/campaigns/`)
      },
    }
  )

  // Snapchat-specific form logic
  const formModel = toRef(props, 'modelValue')
  const countries = ref([])

  const handleMarkerDrop = marker => {
    form.value.latitude = marker.latLng.lat()
    form.value.longitude = marker.latLng.lng()
  }

  const clearMapValues = () => {
    form.value.latitude = 24.802871
    form.value.longitude = 46.677084
  }

  const { run: fetchCountries, loading: countriesLoading } = useRequest(
    () => TargetingService.getSnapchatCountries(),
    {
      onSuccess: res => {
        const { error, data } = res.data
        if (error) show(res.data.messages[0], 'error')
        countries.value = data ?? []
      },
    }
  )

  watch(formModel, () => {
    emit('update:modelValue', formModel.value)
    form.value.country_code = formModel.value.country_code
  }, { deep: true })

  const loading = computed(() => creationLoading.value || updateLoading.value)
  const isLoading = computed(() => countriesLoading.value)

  const rules = reactive({
    name: [requiredValidator],
    country_code: [requiredValidator],
    minimum_age: [],
    maximum_age: [],
    latitude: [],
    longitude: [],
    radius_in_meters: [radiusRangeValidator, requiredValidator],
  })

  // Transform the arrays for AppChipSelect
  const processedOperatingSystems = computed(() =>
    operatingSystems.value.map(os => ({
      id: os.id,
      title: os.name,
    }))
  )

  const processedLanguages = computed(() =>
    languages.value.map(lang => ({
      id: lang.code,
      title: lang.name,
    }))
  )

  const processedGenders = computed(() =>
    genders.value.map(gender => ({
      id: gender.id,
      title: gender.name,
    }))
  )

</script>

<template>
  <VForm ref="refVForm" @submit.prevent="onSubmit">
    <VRow>
      <!-- Common fields -->
      <VCol cols="12">
        <AppTextInput v-model="form.name" autofocus :label="$t('ad_group_name')" :rules="rules.name" />
      </VCol>
      <VCol cols="12">
        <AppChipSelect v-model="form.language_code" hide-no-data :items="processedLanguages" :label="$t('language')" />
      </VCol>
      <VCol cols="12">
        <AppChipSelect v-model="form.gender" hide-no-data :items="processedGenders" :label="$t('gender')" />
      </VCol>
      <VCol cols="12">
        <AppChipSelect
          v-model="form.operating_system"
          :items="processedOperatingSystems"
          :label="$t('operating_system')"
        />
      </VCol>

      <!-- Snapchat-specific fields -->
      <VCol cols="12">
        <AppAutocomplete
          :id="`country-${form.id}`"
          v-model="form.country_code"
          hide-no-data
          :item-title="item => item.name"
          :item-value="item => item.id"
          :items="countries"
          :label="$t('country')"
          :rules="rules.country_code"
        />
      </VCol>
      <VCol cols="12">
        <AppTextInput
          v-model="form.minimum_age"
          :label="$t('ad_minimum_age')"
          :rules="rules.minimum_age"
        />
      </VCol>
      <VCol cols="12">
        <AppTextInput
          v-model="form.maximum_age"
          :label="$t('ad_maximum_age')"
          :rules="rules.maximum_age"
        />
      </VCol>
      <VCol cols="12">
        <AppTextInput
          v-model="form.radius_in_meters"
          :label="$t('radius_in_meters')"
          :rules="rules.radius_in_meters"
        />
      </VCol>
      <VCol cols="12">
        <LocationControl
          :locations="locations"
          platform="snapchat"
          @update:locations="locations = $event"
        />
      </VCol>
      <VCol cols="12">
        <label
          class="v-label mb-1 text-body-2 text-high-emphasis"
        >
          {{ t("point") }}
        </label>
        <GMapMap
          :center="{
            lat: form.latitude,
            lng: form.longitude,
          }"
          map-type-id="terrain"
          style="height: 300px;"
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
            }"
            :position="{
              lat: form.latitude,
              lng: form.longitude,
            }"
            @dragend="handleMarkerDrop"
          >
            <GMapCircle
              :center="{
                lat: form.latitude,
                lng: form.longitude,
              }"
              :options="{
                fillColor: '#528BE2',
                strokeColor: '#528BE2',
              }"
              :radius="+form.radius_in_meters"
            />
          </GMapMarker>
        </GMapMap>
      </VCol>
      <VCol cols="5">
        <AppTextInput
          v-model="form.longitude"
          disabled
          :label="$t('longitude')"
        />
      </VCol>
      <VCol cols="5">
        <AppTextInput
          v-model="form.latitude"
          disabled
          :label="$t('latitude')"
        />
      </VCol>
      <VCol
        class="my-auto"
        cols="2"
      >
        <VBtn
          color="error"
          height="40px"
          @click="clearMapValues"
        >
          {{ t("clear") }}
        </VBtn>
      </VCol>
      <!-- Loading overlay -->
      <VOverlay v-model="isLoading" class="align-center justify-center" persistent>
        <VProgressCircular indeterminate />
      </VOverlay>

      <!-- Submit button -->
      <VCol class="mx-10" cols="2">
        <VBtn
          block
          color="primary"
          :disabled="loading"
          :loading="loading"
          type="submit"
        >
          {{ t('save') }}
          <template #loader>
            <span class="custom-loader">
              <VIcon icon="tabler-refresh" />
            </span>
          </template>
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>

<style lang="scss">
.fade-enter-active {
  transition: opacity 1s ease;
}
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
