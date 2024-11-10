<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const props = defineProps({
    locations: {
      type: Array,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
  })

  const emits = defineEmits(['update:locations'])

  const openLocationModal = ref(false)
  const optionViewLocationModal = ref(false)
  const selectedLocationToView = ref(null)

  const removeLocation = index => {
    emits(
      'update:locations',
      props.locations.filter((_, i) => i !== index)
    )
  }
  const handleSavedLocation = location => {
    emits('update:locations', [...props.locations, location])
  }
  const clearAllLocations = () => {
    emits('update:locations', [])
  }

  const viewLocation = location => {
    optionViewLocationModal.value = true
    selectedLocationToView.value = location
  }
</script>
<template>
  <div class="location-control-wrapper">
    <VLabel
      class="mb-1 text-body-2 text-dark-1"
      persistent-placeholder
      :text="t('location')"
    />
    <div class="location-control">
      <div class="chips-container">
        <v-chip
          v-for="(location, i) in locations"
          :key="`location-${i}`"
          closable
          :text="location.name"
          v-on="
            platform === 'snapchat'
              ? { click: () => viewLocation(location) }
              : {}
          "
        >
          <template #close>
            <v-icon icon="mdi-close-circle" @click.stop="removeLocation(i)" />
          </template>
        </v-chip>
      </div>
      <VTooltip :text="t('clear_all')">
        <template #activator="{ props: toolTipProps }">
          <v-btn
            color="secondary"
            v-bind="toolTipProps"
            icon="mdi-close"
            :rounded="false"
            size="large"
            variant="flat"
            @click="clearAllLocations"
          />
        </template>
      </VTooltip>
      <VTooltip :text="t('add_location')">
        <template #activator="{ props: toolTipProps }">
          <v-btn
            color="secondary"
            v-bind="toolTipProps"
            icon="mdi-plus"
            :rounded="false"
            size="large"
            variant="flat"
            @click="openLocationModal = true"
          />
        </template>
      </VTooltip>
    </div>
    <v-dialog
      v-if="platform === 'googleads'"
      v-model="openLocationModal"
      max-width="500"
    >
      <GoogleAdsLocationModal
        v-model:is-dialog-visible="openLocationModal"
        @saved="handleSavedLocation"
      />
    </v-dialog>
    <v-dialog
      v-if="platform === 'tiktok'"
      v-model="openLocationModal"
      max-width="500"
    >
      <TiktokAdsLocationModal
        v-model:is-dialog-visible="openLocationModal"
        @saved="handleSavedLocation"
      />
    </v-dialog>
    <v-dialog
      v-if="platform === 'snapchat'"
      v-model="openLocationModal"
      max-width="500"
    >
      <SnapChatLocationModal
        v-model:is-dialog-visible="openLocationModal"
        @saved="handleSavedLocation"
      />
    </v-dialog>
    <v-dialog
      v-if="platform === 'snapchat'"
      v-model="optionViewLocationModal"
      max-width="500"
    >
      <SnapChatLocationModal
        v-model:is-dialog-visible="optionViewLocationModal"
        is-view-mode
        :location="selectedLocationToView"
      />
    </v-dialog>
  </div>
</template>
<style lang="scss" scoped>
.location-control {
  display: flex;
}
.chips-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: rgb(var(--v-theme-secondary));
}
.location-control-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
