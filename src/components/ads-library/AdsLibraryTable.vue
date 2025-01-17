<script setup>
  import { computed, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'

  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  const headers = [
    { title: '#', key: 'id' },
    { title: t('ads_table.reference'), key: 'reference' },
    { title: t('ads_table.type'), key: 'type' },
    { title: t('ads_table.link'), key: 'link' },
    { title: t('ads_table.date'), key: 'date' },
    { title: t('ads_table.season'), key: 'season' },
    { title: t('ads_table.style'), key: 'style' },
    { title: t('ads_table.montier'), key: 'montier' },
    { title: t('ads_table.writer'), key: 'writer' },
    { title: t('ads_table.notes'), key: 'notes' },
  ]

  // Mock data
  const items = ref([
    { id: 1, title: 'إفطار صائم', reference: '5896324', type: 'تصميم', link: 'http://urlinkgoeshere.com', date: '2025.01.12', season: 'رمضان', style: 'بلان فاربادي', montier: 'أحمد محمد', writer: 'سعد عبدالعادي', notes: 'ملاحظات الإعلان تظهر هنا..' },
    { id: 2, title: 'إفطار صائم', reference: '4893254', type: 'تصميم', link: 'http://urlinkgoeshere.com', date: '2024.05.08', season: 'رمضان', style: 'مونتاج', montier: 'أسامة عبدالله', writer: 'جلال أحمد', notes: 'ملاحظات الإعلان تظهر هنا..' },
    { id: 3, title: 'إفطار صائم', reference: '89711235', type: 'تصميم', link: 'http://urlinkgoeshere.com', date: '2023.12.25', season: 'اليوم الوطني', style: 'تصوير ميداني', montier: 'خالد ملهم', writer: 'عبدالرحمن سعيد', notes: 'ملاحظات الإعلان تظهر هنا..' },
    { id: 4, title: 'سقيا الحجاج', reference: '5896324', type: 'تصميم', link: 'http://urlinkgoeshere.com', date: '2025.01.12', season: 'رمضان', style: 'مونتاج', montier: 'أحمد محمد', writer: 'سعد عبدالعادي', notes: 'ملاحظات الإعلان تظهر هنا..' },
    { id: 5, title: 'سقيا الحجاج', reference: '4893254', type: 'تصميم', link: 'http://urlinkgoeshere.com', date: '2024.05.08', season: 'رمضان', style: 'مونتاج جرافيك', montier: 'أسامة عبدالله', writer: 'جلال أحمد', notes: 'ملاحظات الإعلان تظهر هنا..' },
  ])

  // Group ads by title
  const groupedAds = computed(() => {
    const groups = items.value.reduce((acc, ad) => {
      if (!acc[ad.title]) {
        acc[ad.title] = []
      }
      acc[ad.title].push(ad)
      return acc
    }, {})

    return Object.entries(groups)
  })

  watch(
    locale,
    () => {
      update([
        {
          title: t('ads_library.name'),
          active: false,
          to: '/ads-library/',
        },
      ])
    },
    { immediate: true }
  )
</script>

<template>
  <v-card class="my-4">
    <v-card-text>

      <v-card class="px-4">
        <v-data-table
          class="text-no-wrap"
          :headers="headers"
          hide-default-footer
        >
          <v-card-text>
            <v-data-table
              class="text-no-wrap pa-8 table-header"
              :headers="headers"
              hide-default-body
              hide-default-footer
              :items="items"
            />
            <template v-for="([title, ads], index) in groupedAds" :key="index">
              <div class="category-section rounded-lg">
                <div class="group-title">
                  <span>{{ title }} </span>
                  <span class="ad-count">({{ ads.length }})</span>
                </div>
                <v-data-table
                  class="text-no-wrap pa-4"
                  :headers="headers"
                  hide-default-footer
                  hide-default-header
                  :items="ads"
                >
                  <template #item.id="{ index:idx }">
                    {{ idx + 1 }}
                  </template>
                </v-data-table>
              </div>
            </template>
          </v-card-text>
        </v-data-table>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.text-no-wrap {
  white-space: nowrap;
}

.group-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 19.2px;
  color: #1F1625;
  margin: 16px 0;
}

.ad-count {
  margin-left: 4px;
  margin-right: 4px;
  font-size: 14px;
  color: #888;
}

.category-section {
  background-color: #f8f7fa;
  padding: 16px;
  margin-bottom: 16px;
}

:deep(.v-card-text) {
  padding: 10px 0;
}

:deep(.v-data-table-header__content) {
  font-size: 12px;
  line-height: 14.4px;
  font-weight: 400;
  color: #706D79;
}

:deep(.v-data-table) {
  ::-webkit-scrollbar {
    height: 8px;
    text-decoration: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #4E1AC7;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: #F8F7FA;
    border-radius: 4px;
  }

}
</style>
