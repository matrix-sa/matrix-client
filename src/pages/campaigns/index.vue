<script setup>
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'

  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  const selectedCampaigns = ref([])
  const selectedCampaignsIds = computed(() =>
    selectedCampaigns.value.map(c => c.id))

  const selectedAdGroups = ref([])
  const selectedAdGroupsIds = computed(() =>
    selectedAdGroups.value.map(c => c.id))

  const addAdGroupRoute = computed(() =>
    selectedCampaigns.value.length === 1
      ? {
        name: '/ad-groups/[campaignId]/add/',
        params: {
          campaignId: selectedCampaigns.value[0].id,
        },
        query: {
          platform: selectedCampaigns.value[0].ad_platform,
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
          platform: selectedAdGroups.value[0].ad_platform,
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
  <div class="container">
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
        <CampaignsTable @selection-updated="selectedCampaigns = $event" />
      </VCardText>
    </VCard>

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
        <AdsTable
          :ad-groups-ids="selectedAdGroupsIds"
        />
      </VCardText>
    </VCard>
  </div>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
