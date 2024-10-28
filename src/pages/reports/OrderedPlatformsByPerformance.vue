<script setup>
  import i18n from '@/i18n'
  import { onMounted, ref } from 'vue'
  import axios from '@/plugins/axious'

  const { t } = i18n.global

  const headers = ref([
    { text: t('platform'), value: 'platform' },
    { text: t('active_compaigns'), value: 'campaigns' },
    { text: t('spendings'), value: 'spending' },
    { text: t('views'), value: 'view' },
    { text: t('return_on_spending'), value: 'roas' },
    { text: t('rank'), value: 'order' },
  ])

  const platforms = ref([])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://matrix.sa/Clients/Statistics/GetReportsStatistics')
      const sortedPlatforms = response.data.data.platforms_performance_records
        .map(item => ({
          platform: t(`platforms.${item.platform.toLowerCase()}.title`),
          icon: getPlatformIcon(item.platform),
          campaigns: item.campaigns,
          view: item.view,
          spending: item.spending,
          roas: item.roas,
          order: item.order,
        }))
        .sort((a, b) => b.order - a.order)

      platforms.value = sortedPlatforms.map((platform, index) => ({
        ...platform,
        rank: index + 1,
        rankColor: index === 0 ? 'orange' : 'purple',
      }))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

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

  onMounted(() => {
    fetchData()
  })
</script>

<template>
  <v-container class="rounded-lg bg-white">
    <div class="order_text">
      {{ t('platforms_order') }}
    </div>
    <!-- <hr> -->
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
          v-for="(platform, index) in platforms"
          :key="index"
          :class="{ 'highlight-row': index % 2 === 1 }"
        >
          <td class="text-start">
            <v-avatar class="mx-2" left>
              <v-img :src="platform.icon" />
            </v-avatar>
            {{ platform.platform }}
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

th:first-child {
  text-align: start !important;
}
.order_text{
  font-size: 16px;
  font-weight: 500;
  line-height: 19.2px;
  color: #1F1625;
  margin: 0 10px 10px 0;
}
</style>
