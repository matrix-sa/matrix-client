import i18n from '@/i18n'

const { t, locale } = i18n.global

export const paginateArray = (array, perPage, page) => array.slice((page - 1) * perPage, page * perPage)

// pagination meta
export const paginationMeta = computed(() => {
  return (options, total) => {
    const start = (options.page - 1) * options.itemsPerPage + 1
    const end = Math.min(options.page * options.itemsPerPage, total)

    return t('showing_entries', { start: start, end: end, total: total })
  }
})
export const genId = array => {
  const { length } = array
  let lastIndex = 0
  if (length)
    lastIndex = Number(array[length - 1]?.id) + 1

  return lastIndex || (length + 1)
}

export const localeTitle = computed(() => {
  return locale.value === 'ar' ? 'arabic_title' : 'english_title'
})
