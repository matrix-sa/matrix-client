<script setup>
  import i18n from '@/i18n'
  import { computed, defineProps } from 'vue'

  const { t } = i18n.global
  const props = defineProps({
    leastCampaigns: {
      type: Array,
      required: true,
    },
    topCampaigns: {
      type: Array,
      required: true,
    },
  })
  const headers = [
    { text: t('campaign_and_platform'), value: 'platform' },
    { text: t('spendings'), value: 'spending' },
    { text: t('revenue'), value: 'revenue' },
    { text: t('return_on_spending'), value: 'return_on_spending' },
    { text: t('rank'), value: 'order' },
  ]

  const getTopFiveCampaigns = campaigns => {
    return campaigns.slice(0, 5).map((item, index) => ({
      ...item,
      rank: index + 1,
      rankColor: index === 0 ? 'green' : 'purple',
    }))
  }

  const leastCampaigns = computed(() => getTopFiveCampaigns(props.leastCampaigns))
  const topCampaigns = computed(() => getTopFiveCampaigns(props.topCampaigns))
  const numOfAddsTop = computed(() => props.topCampaigns.length)
  const numOfAddsLeast = computed(() => props.leastCampaigns.length)

  const getPlatformIcon = platformName => {
    const icons = {
      Snapchat: 'src/assets/images/logos/icons-snapchat-96.svg',
      TikTok: 'src/assets/images/logos/icons-tiktok-96.svg',
      Facebook: 'src/assets/images/logos/icons-facebook-96.svg',
      Instagram: 'src/assets/images/logos/icons-instagram-96.svg',
      GoogleAds: 'src/assets/images/logos/icons-google-96.svg',
      Youtube: 'src/assets/images/logos/icons-youtube-96.svg',
      Twitter: 'src/assets/images/logos/icons-twitterx-96.svg',
    }
    return icons[platformName] || 'https://cdn-icons-png.flaticon.com/512/6415/6415824.png'
  }
</script>

<template>
  <div class="d-flex ga-5 my-10">
    <div class="rounded-lg bg-white pa-4">
      <div class="campaigns_title">{{ t('top_adds_ad_campaigns') }}</div>
      <div class="campaigns_number">{{ t('you_have') }} {{ numOfAddsTop }} {{ t('ad_campaign') }}</div>
      <v-table class="rounded-lg ">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header.value" class="header text-center text-no-wrap">

              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr
            v-for="(campaign, index) in topCampaigns"
            :key="index"
            :class="{ 'highlight-row': index % 2 === 1 }"
          >
            <td class="text-start">
              <div class="d-flex ">
                <v-avatar class="platform_icon" left>
                  <v-img :src="getPlatformIcon(campaign.publishing_platform)" />
                </v-avatar>
                <div>
                  {{ t("campaign") }} {{ campaign.name }}
                  <div class="platform_text">{{ t('platform') }}: {{ t(`platforms.${campaign.publishing_platform.toLowerCase()}.title`) }}</div>
                </div>
              </div>
            </td>
            <td>{{ campaign.spending }}</td>
            <td>{{ campaign.sales }}</td>
            <td>{{ campaign.roas }}</td>
            <td>
              <v-chip :color="campaign.rankColor" dark>{{ campaign.rank }}</v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
    <div class="rounded-lg bg-white pa-4">
      <div class="campaigns_title">{{ t('least_adds_ad_campaigns') }}</div>
      <div class="campaigns_number">{{ t('you_have') }} {{ numOfAddsLeast }} {{ t('ad_campaign') }}</div>
      <v-table class="rounded-lg ">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header.value" class="header text-center text-no-wrap">

              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr
            v-for="(campaign, index) in leastCampaigns"
            :key="index"
            :class="{ 'highlight-row': index % 2 === 1 }"
          >
            <td class="text-start">
              <div class="d-flex">
                <v-avatar class="platform_icon" left>
                  <v-img :src="getPlatformIcon(campaign.publishing_platform)" />
                </v-avatar>
                <div>
                  {{ t("campaign") }} {{ campaign.name }}
                  <div class="platform_text">{{ t('platform') }}: {{ t(`platforms.${campaign.publishing_platform.toLowerCase()}.title`) }}</div>
                </div>
              </div>
            </td>
            <td>{{ campaign.spending }}</td>
            <td>{{ campaign.sales }}</td>
            <td>{{ campaign.roas }}</td>
            <td>
              <v-chip :color="campaign.rankColor" dark>{{ campaign.rank }}</v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<style lang="scss">

.header {
  color: #706D79;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
}

.highlight-row {
  background-color: #f8f7fa;
}
th{
    border-top: 1px solid #f0f0f1;
}
th:first-child {
  text-align: start !important;
  padding: 0 15px 0 15px !important;

}
.order_text {
  font-size: 16px;
  font-weight: 500;
  line-height: 19.2px;
  color: #1F1625;
  margin: 0 10px 10px 0;
}
.platform_text{
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
    color: #706D79;
}
.campaigns_number{
    margin: 0 1rem;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    color: #706D79;
    margin: 8px 0 16px 0;
}
.campaigns_title{
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;

}
.v-table--density-default{
    --v-table-header-height:41px;
}
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td, .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  border-bottom: none;
}
tr {
    clip-path: xywh(0 0 100% 100% round 30px)
}

</style>
