<script setup>
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { paginationMeta } from '@/composable/utils'

  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  // Table data
  const items = ref([])
  const totalItems = ref(0)
  const selectedItems = ref([])

  const options = ref({
    page: 1,
    itemsPerPage: 10,
  })

  const headers = [
    {
      title: t('ads_table.reference'),
      key: 'reference',
    },
    {
      title: t('ads_table.type'),
      key: 'type',
    },
    {
      title: t('ads_table.link'),
      key: 'link',
    },
    {
      title: t('ads_table.date'),
      key: 'date',
    },
    {
      title: t('ads_table.season'),
      key: 'season',
    },
    {
      title: t('ads_table.style'),
      key: 'style',
    },
    {
      title: t('ads_table.montier'),
      key: 'montier',
    },
    {
      title: t('ads_table.writer'),
      key: 'writer',
    },
    {
      title: t('ads_table.notes'),
      key: 'notes',
    },

  ]

  watch(
    locale, () => {
      update([
        {
          title: t('ads_library.name'),
          active: false,
          to: '/ads-library/',
        },
      ])
    },
    { immediate: true })

</script>

<template>
  <v-card class="my-4">
    <v-card-text>
      <VCard>
        <VCardText class="pa-4 pt-0">
          <!-- table start -->
          <VDataTableServer
            v-model="selectedItems"
            v-model:items-per-page="options.itemsPerPage"
            v-model:page="options.page"
            class="text-no-wrap"
            :headers="headers"
            :items="items"
            :items-length="totalItems"
            :no-data-text="'no_data_text'"
            select-strategy="all"
            @update:options="options = $event"
          >

            <!-- pagination -->
            <template #bottom>
              <div
                class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3"
              >
                <p class="text-sm text-disabled mb-0">
                  {{ paginationMeta(options, totalItems) }}
                </p>

                <VPagination
                  v-model="options.page"
                  :length="Math.ceil(totalItems / options.itemsPerPage)"
                  total-visible="3"
                />
              </div>
            </template>
          </VDataTableServer>
        </VCardText>
      </VCard>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
  .text-no-wrap {
    white-space: nowrap;
  }

:deep( .v-data-table-header__content){
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
