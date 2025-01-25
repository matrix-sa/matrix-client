<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'

const { t, locale } = useI18n()
const { update } = useBreadcrumbsStore()

const headers = ref([
  { title: '#', key: 'id', "visible": true },
  { title: t('ads_table.reference'), key: 'reference', icon: 'tabler-list', visible: true },
  { title: t('ads_table.type'), key: 'type', icon: 'tabler-circles', visible: true },
  { title: t('ads_table.link'), key: 'link', icon: 'mdi-link', visible: true },
  { title: t('ads_table.date'), key: 'date', icon: 'tabler-calendar-week', visible: true },
  { title: t('ads_table.season'), key: 'season', icon: 'tabler-building-lighthouse', visible: true },
  { title: t('ads_table.style'), key: 'style', icon: 'mdi-palette-swatch-outline', visible: true },
  { title: t('ads_table.montier'), key: 'montier', icon: 'mdi-fountain-pen-tip', visible: true },
  { title: t('ads_table.writer'), key: 'writer', icon: 'mdi-typewriter', visible: true },
  { title: t('ads_table.notes'), key: 'notes', icon: 'tabler-notes', visible: true },
])

const toggleVisibility = (index) => {
  headers.value[index].visible = !headers.value[index].visible;

}

const filteredHeaders = computed(() => {
  return headers.value.filter(header => header.visible);
})

watch(
  locale,
  () => {
    update([
      {
        title: t('ads_library.name'),
        active: true,
        to: '/ads-library',
      },
    ])
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <AdsHeader :headers="headers" @toggleVisibility="toggleVisibility" />
    <AdsLibraryTable :headers="filteredHeaders" />
  </div>
</template>
