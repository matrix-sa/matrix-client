<script setup>
  import { usePagination, useRequest } from 'vue-request'
  import AdsService from '@/services/ads-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useI18n } from 'vue-i18n'
  import { paginationMeta } from '@/composable/utils'
  import moment from 'moment'

  const props = defineProps({
    adGroupsIds: {
      type: Array,
      required: true,
    },
  })

  const { show } = useSnackbarStore()
  const { t } = useI18n()

  const isDeleteConfirmDialogVisible = ref(false)
  const adPlatformToDelete = ref(null)
  const idToDelete = ref(null)

  const ads = ref([])
  const totalPage = ref()
  const totalAds = ref(0)

  const options = ref({
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
    groupBy: [],
    search: undefined,
  })

  // Headers
  const headers = [
    {
      title: t('ads_name'),
      key: 'name',
    },
    {
      title: t('status'),
      key: 'status',
    },
    {
      title: t('created_at'),
      key: 'created_at',
    },
    {
      title: t('last_updated'),
      key: 'last_updated',
    },
    {
      title: '',
      key: 'actions',
      sortable: false,
    },
  ]

  const getQuery = params => {
    const query = new URLSearchParams()

    params.adGroupsIds.forEach(element => {
      query.append('adGroupsIds', element)
    })

    query.append('PageSize', params.PageSize)
    query.append('Page', params.Page)

    return query
  }

  const { run, loading: loadingAds } = usePagination(
    params => AdsService.get(getQuery(params)),
    {
      manual: true,
      onSuccess: res => {
        const { data, error, messages } = res.data

        if (error) {
          show(messages[0], 'error')

          return
        }

        ads.value = data.items
        options.value.page = data.current_page
        totalPage.value = data.page_size
        totalAds.value = data.total_count
      },
    }
  )

  const handleWatch = () => {
    run({
      PageSize: options.value.itemsPerPage,
      Page: options.value.page,
      adGroupsIds: props.adGroupsIds,
    })
  }

  watch(options, handleWatch, { deep: true })

  watch(() => props.adGroupsIds, handleWatch)

  const resolveUserStatusVariant = stat => {
    const statLowerCase = stat.toLowerCase()
    if (statLowerCase === 'pending') return 'warning'
    if (statLowerCase === 'active') return 'success'
    if (statLowerCase === 'inactive') return 'secondary'

    return 'primary'
  }

  const { run: runDelete, loading: loadingDelete } = useRequest(
    (platform, params) => AdsService.deleteAd(platform, params),
    {
      manual: true,
      onSuccess: res => {
        const { error, messages } = res.data

        if (error) {
          show(messages[0], 'error')

          return
        }

        show(t('deleted_message'), 'success')
        run({
          PageSize: options.value.itemsPerPage,
          Page: options.value.page,
          adGroupsIds: props.adGroupsIds,
        })
      },
    }
  )

  const deleteConfirmed = () => {
    runDelete(adPlatformToDelete.value, { id: idToDelete.value })
  }

  const toggleDeleteDialog = (adPlatform, id) => {
    isDeleteConfirmDialogVisible.value = true
    adPlatformToDelete.value = adPlatform
    idToDelete.value = id
  }

  const handleDate = date => {
    if (!date) return t('no_date')

    return moment(date).format('MMMM Do YYYY, h:mm a')
  }

  const loading = computed(() =>
    loadingAds.value || loadingDelete.value)
</script>

<template>
  <VDataTableServer
    v-model:items-per-page="options.itemsPerPage"
    v-model:page="options.page"
    class="text-no-wrap"
    :headers="headers"
    :items="ads"
    :items-length="totalAds"
    :loading="loading"
    :no-data-text="t('no_data_text')"
    @update:options="options = $event"
  >
    <template #item.status="{ item }">
      <VChip
        class="text-capitalize"
        :color="resolveUserStatusVariant(item.status)"
        label
        size="small"
      >
        {{ item.status }}
      </VChip>
    </template>

    <!-- Created At -->
    <template #item.created_at="{ item }">
      <div class="d-flex align-center">
        <div class="d-flex flex-column">
          <span class="font-weight-medium">
            {{ handleDate(item.created_at) }}
          </span>
        </div>
      </div>
    </template>

    <!-- Last Updated -->
    <template #item.last_updated="{ item }">
      <div class="d-flex align-center">
        <div class="d-flex flex-column">
          <span class="font-weight-medium">
            {{ handleDate(item.last_updated) }}
          </span>
        </div>
      </div>
    </template>

    <!-- Actions -->
    <template #item.actions="{ item }">
      <VTooltip :text="t('delete')">
        <template #activator="{ props: toolTipProps }">
          <VBtn
            v-if="!['Archived', 'Created', 'Deleted'].includes(item.status)"
            v-bind="toolTipProps"
            @click="toggleDeleteDialog(item.ad_platform, item.id)"
          >
            <VIcon color="error" icon="tabler-trash" />
          </VBtn>
        </template>
      </VTooltip>
    </template>

    <!-- pagination -->
    <template #bottom>
      <VDivider />
      <div
        class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3"
      >
        <p class="text-sm text-disabled mb-0">
          {{ paginationMeta(options, totalAds) }}
        </p>

        <VPagination
          v-model="options.page"
          :length="Math.ceil(totalAds / options.itemsPerPage)"
          total-visible="3"
        />
      </div>
    </template>
  </VDataTableServer>
  <!-- 👉 Delete Confirm Dialog -->
  <ConfirmDialog
    v-model:is-dialog-visible="isDeleteConfirmDialogVisible"
    :confirmation-question="t('dialog_question')"
    @confirm="deleteConfirmed"
  />
</template>
