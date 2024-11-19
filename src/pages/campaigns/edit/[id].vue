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
  const recommendations = ref([
    {
      id: 1,
      text: 'my_answers_title',
    },
    {
      id: 2,
      text: 'my_answers_title',
    },
    {
      id: 3,
      text: 'my_answers_title',
    }, {
      id: 4,
      text: 'my_answers_title',
    },
  ])
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

  <div>
    <v-container>
      <v-row>
        <v-col class="ps-0" cols="8">
          <div class="campaign-form-container">
            <v-overlay v-model="loadingCampaign" class="align-center justify-center" persistent>
              <v-progress-circular color="primary" indeterminate size="50" :width="7" />
            </v-overlay>
            <template v-if="!loadingCampaign">

              <CampaignForm :campaign="campaign" :is-edit-mode="true">
                <template v-if="campaign?.ad_platform.toLowerCase() === 'googleads'" #default="{ data }">
                  <GoogleCampaignForm :campaign="campaign" :data="data" />
                </template>
              </CampaignForm>
            </template>
          </div>

        </v-col>
        <v-col class="pe-0" cols="4">
          <div class="campaign-form-container">
            <RecommendationList :recommendations="recommendations" />
          </div>
        </v-col>
      </v-row>
    </v-container>
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
