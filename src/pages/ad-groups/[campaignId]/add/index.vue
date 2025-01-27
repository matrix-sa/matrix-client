<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'
  import campaignHeaderLogo from '@/assets/images/campaign-header.svg'

  const route = useRoute()
  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()
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
  const platform = route.query.platform?.toLocaleLowerCase()
  const campaignId = route.params.campaignId

  watch(
    locale,
    () => {
      update([
        {
          title: t('ad_groups'),
          active: false,
          to: '/campaigns/',
        },
        {
          title: t('add_ad_group'),
          active: true,
          disabled: true,
          to: `/campaigns/add`,
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
          <div class="ad-group-form-container">
            <header class="ad-group-form-header">
              <img alt="" height="45" :src="campaignHeaderLogo">
              <div class="deascription">
                <h3 class="text-black">
                  {{ t("ad_group_settings") }}
                </h3>
              </div>
            </header>
            <v-divider class="mb-4 mt-6" />
            <AdsGroupTiktokForm v-if="platform === 'tiktok'" :campaign-id="campaignId" />
            <AdsGroupSnapchatForm v-if="platform === 'snapchat'" :campaign-id="campaignId" />
            <AdsGroupXForm v-if="platform === 'twitter'" :campaign-id="campaignId" />
            <AdsGroupGoogleForm v-if="platform === 'googleads'" :campaign-id="campaignId" />
          </div>

        </v-col>
        <v-col class="pe-0" cols="4">
          <div class="main-container">
            <RecommendationList :recommendations="recommendations" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<style lang="scss">
.main-container {
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
}

.ad-group-form-container {
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;

  .ad-group-form-header {
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
