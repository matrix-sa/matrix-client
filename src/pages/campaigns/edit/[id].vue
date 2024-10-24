<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'
  import campaignHeaderLogo from '@/assets/images/campaign-header.svg'
  import { useRequest } from 'vue-request'
  import CampaignsService from '@/services/campaigns-service'

  const { update } = useBreadcrumbsStore()
  const { t, locale } = useI18n()
  const route = useRoute()

  const campaign = ref(null)

  const { loadingCampaign } = useRequest(
    () =>
      CampaignsService.getById(
        { id: route.params.id },
        useRoute().query.platform,
      ),
    {
      onSuccess: res => {
        campaign.value = res?.data?.data
      },
    },
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
        {
          title: t('edit_campaign'),
          active: true,
          disabled: true,
          to: `/campaigns/edit/[id]`,
        },
      ])
    },
    { immediate: true }
  )
</script>
<template>
  <div class="campaign-form-container">
    <v-overlay
      v-model="loadingCampaign"
      class="align-center justify-center"
      persistent
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="50"
        :width="7"
      />
    </v-overlay>
    <template v-if="!loadingCampaign">
      <header class="campaign-form-header">
        <img alt="" :src="campaignHeaderLogo">
        <div class="deascription">
          <h3 class="text-black">{{ t("campaign_settings") }} ({{ t('platforms.googleads.title') }})</h3>
          <p>{{ t("how_to_edit_campaign") }} </p>
        </div>
      </header>
      <v-divider class="mb-4 mt-6" />
      <GoogleAdsCampaignForm v-if="campaign?.ad_platform.toLowerCase() === 'googleads'" />
      <TiktokCampaignForm
        v-if="campaign?.ad_platform.toLowerCase() === 'tiktok'"
        :campaign="campaign"
        :is-edit-mode="true"
      />
    </template>
  </div>
</template>

<style lang="scss">
.campaign-form-container {
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;

  .campaign-form-header {
    display: flex;
    gap: 1rem;

    img {
      margin-inline: 1rem;
    }

    h3 {
      font-weight: 700;
      font-size: 1.25rem;
    }
    p {
      font-weight: 400;
      color: rgb(var(--v-dark-1));
      font-size: 0.875rem;
    }
  }
}
</style>
