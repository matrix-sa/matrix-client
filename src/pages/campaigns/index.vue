<script setup>
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { VDateInput } from 'vuetify/labs/VDateInput'

  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  const tab = ref('campaigns')

  const selectedCampaigns = ref([])
  const selectedCampaignsIds = computed(() =>
    selectedCampaigns.value.map(c => c.id)
  )
  const dateRange = ref(null)
  const search = ref(null)

  const selectedAdGroups = ref([])
  const selectedAdGroupsIds = computed(() =>
    selectedAdGroups.value.map(c => c.id)
  )

  const addAdGroupRoute = computed(() =>
    selectedCampaigns.value.length === 1
      ? {
        name: '/ad-groups/[campaignId]/add/',
        params: {
          campaignId: selectedCampaigns.value[0].id,
        },
        query: {
          platform: selectedCampaigns.value[0].platform,
        },
      }
      : null
  )

  const addAdRoute = computed(() =>
    selectedAdGroups.value.length === 1
      ? {
        name: '/ads/[adGroupId]/add/',
        params: {
          adGroupId: selectedAdGroups.value[0].id,
        },
        query: {
          platform: selectedAdGroups.value[0].platform,
        },
      }
      : null
  )

  watch(
    locale,
    () => {
      update([
        {
          title: t('campaigns'),
          active: false,
          to: '/campaigns/',
        },
      ])
    },
    { immediate: true }
  )
</script>
<template>
  <div>
    <div class="filters-container">
      <div>
        <v-date-input
          v-model="dateRange"
          bg-color="secondary"
          cancel-text="cancel"
          class="date-range-input"
          clearable
          density="comfortable"
          flat
          hide-details
          :label="t('select_range_date')"
          multiple="range"
          ok-text="ok"
          persistent-clear
          :prepend-icon="null"
          prepend-inner-icon="tabler-calendar"
          variant="solo-filled"
          @click:clear="dateRange = null"
        />
      </div>
      <div>
        <v-text-field
          v-model="search"
          class="search-campaign-input"
          clearable
          density="comfortable"
          height="48px"
          hide-details
          :label="t('look_for_campaign')"
          prepend-inner-icon="tabler-search"
          variant="outlined"
          @click:clear="search = null"
        />
      </div>
    </div>
    <v-card>

      <v-tabs v-model="tab" bg-color="secondary" color="warning" :grow="true">
        <v-tab
          base-color="secondary"
          :text="`(${selectedCampaigns.length}) ` + $t('campaigns')"
          value="campaigns"
          variant="elevated"
        />
        <v-tab
          base-color="secondary"
          :text="`(${selectedAdGroups.length}) ` + $t('ad_groups')"
          value="ad-groups"
          variant="elevated"
        />
        <v-tab
          base-color="secondary"
          :text="$t('ads')"
          value="ads"
          variant="elevated"
        />
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="campaigns">
            <VCard>
              <div class="d-flex align-center justify-space-between ga-4 pa-4">
                <VCardTitle class="font-weight-medium text-surface-variant pa-0">
                  {{ $t("campaigns") }}
                </VCardTitle>
                <VBtn color="warning" rounded :to="{ name: '/campaigns/add' }">
                  <VIcon icon="tabler-circle-plus-filled" />
                  {{ $t("add_campaign") }}
                </VBtn>
              </div>

              <VCardText class="pa-4 pt-0">
                <VDivider />
                <CampaignsTable
                  :date-range="dateRange"
                  :search="search"
                  @selection-updated="selectedCampaigns = $event"
                />
              </VCardText>
            </VCard>
          </v-tabs-window-item>

          <v-tabs-window-item value="ad-groups">
            <VCard>
              <div class="d-flex align-center justify-space-between ga-4 pa-4">
                <VCardTitle class="font-weight-medium text-surface-variant pa-0">
                  {{ $t("ad_groups") }}
                </VCardTitle>
                <VBtn
                  color="warning"
                  :disabled="selectedCampaigns.length !== 1"
                  rounded
                  :to="addAdGroupRoute"
                >
                  <VIcon icon="tabler-circle-plus-filled" />
                  {{ $t("add_ad_group") }}
                </VBtn>
              </div>

              <VCardText class="pa-4 pt-0">
                <VDivider />
                <AdsGroupsTable
                  :campaigns-ids="selectedCampaignsIds"
                  @selection-updated="selectedAdGroups = $event"
                />
              </VCardText>
            </VCard>
          </v-tabs-window-item>

          <v-tabs-window-item value="ads">
            <VCard>
              <div class="d-flex align-center justify-space-between ga-4 pa-4">
                <VCardTitle class="font-weight-medium text-surface-variant pa-0">
                  {{ $t("ads") }}
                </VCardTitle>
                <VBtn
                  color="warning"
                  :disabled="selectedAdGroups.length !== 1"
                  rounded
                  :to="addAdRoute"
                >
                  <VIcon icon="tabler-circle-plus-filled" />
                  {{ $t("add_ad") }}
                </VBtn>
              </div>

              <VCardText class="pa-4 pt-0">
                <VDivider />
                <AdsTable :ad-groups-ids="selectedAdGroupsIds" />
              </VCardText>
            </VCard>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.filters-container {
  padding: 1rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 370px 1fr;
  gap: 1rem;
  background-color: white;
  border-radius: 1rem;
}
</style>
<style lang="scss">
.filters-container {
  .date-range-input {
    .v-field {
      border-radius: 0.75rem;
    }
    .v-field__overlay {
      background: unset;
      display: none;
    }
  }

  .search-campaign-input {
    .v-field {
      border-radius: 0.75rem;
    }
    .v-field__overlay {
      background: unset;
      display: none;
    }
  }
}
</style>
