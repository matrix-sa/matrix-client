<script setup>
  import i18n from '@/i18n'
  import { computed } from 'vue'
  import snapchat from '@/assets/images/logos/reports/snap.svg'
  import tiktok from '@/assets/images/logos/reports/tiktok.svg'
  import facebook from '@/assets/images/logos/reports/meta.svg'
  import instagram from '@/assets/images/logos/reports/instagram.svg'
  import googleads from '@/assets/images/logos/reports/google.svg'
  import youtube from '@/assets/images/logos/reports/youtube.svg'
  import twitter from '@/assets/images/logos/reports/x.svg'

  const { t } = i18n.global

  const props = defineProps({
    platformsData: {
      type: Array,
      required: true,
    },
  })

  const headers = [
    { text: t('platform'), value: 'platform' },
    { text: t('active_compaigns'), value: 'campaigns' },
    { text: t('spendings'), value: 'spending' },
    { text: t('views'), value: 'view' },
    { text: t('return_on_spending'), value: 'roas' },
    { text: t('rank'), value: 'order' },
  ]

  const platforms = computed(() => {
    return props.platformsData.map(item => ({
      platform: item.platform,
      campaigns: item.campaigns,
      view: item.view,
      spending: item.spending,
      roas: item.roas,
      order: item.order,
    }))
  })

  const rankedPlatforms = computed(() => {
    return platforms.value.map((platform, index) => ({
      ...platform,
      rank: index + 1,
      rankColor: index === 0 ? 'orange' : 'purple',
    }))
  })

  const getPlatformIcon = platformName => {
    const icons = {
      snapchat,
      tiktok,
      facebook,
      instagram,
      googleads,
      youtube,
      twitter,
    }
    return icons[platformName] || 'https://cdn-icons-png.flaticon.com/512/6415/6415824.png'
  }
</script>

<template>
  <v-container class="rounded-lg bg-white">
    <div class="order_text">
      {{ t('platforms_order') }}
    </div>
    <v-table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.value" class="header text-center">
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr
          v-for="(platform, index) in rankedPlatforms"
          :key="index"
          :class="{ 'highlight-row': index % 2 === 1 }"
        >
          <td class="text-start">
            <v-avatar class="mx-2" left>
              <v-img :src="getPlatformIcon(`${platform.platform}`.toLowerCase())" />
            </v-avatar>
            {{ t(`platforms.${platform.platform.toLowerCase()}.title`) }}
          </td>
          <td>{{ platform.campaigns }}</td>
          <td>{{ platform.spending }}</td>
          <td>{{ platform.view }}</td>
          <td>{{ platform.roas }}</td>
          <td>
            <v-chip :color="platform.rankColor" dark>{{ platform.rank }}</v-chip>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
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
  color: #1F1625;
  margin: 12px 12px 30px 12px !important;
  font-size: 16px;
  font-weight: 500;
  line-height: 19.2px;
}
.v-table--density-default{
    --v-table-header-height:41px;
}
tr {
  clip-path: xywh(0 0 100% 100% round 30px);
  margin-right: 10px;
}
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td{
  border-bottom: none;
}
.v-table__wrapper > table > tfoot > tr > th{
  padding: 0;
}
</style>
