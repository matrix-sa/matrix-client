<script setup>
  import { usePagination, useRequest } from 'vue-request'
  import AdsGroupsService from '@/services/ads-groups-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useI18n } from 'vue-i18n'
  import { paginationMeta } from '@/composable/utils'
  import moment from 'moment'

  const props = defineProps({
    campaignsIds: {
      type: Array,
      required: true,
    },
  })

  const emits = defineEmits(['selectionUpdated'])

  const { show } = useSnackbarStore()
  const { t } = useI18n()
  const router = useRouter()

  const totalCount = ref(0)
  const adsGroups = ref([])
  const pageSize = ref()
  const selectedItems = ref([])

  const options = ref({
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
    groupBy: [],
    search: undefined,
  })

  const headers = [
    {
      title: t('name'),
      key: 'name',
    },
    {
      title: t('status'),
      key: 'status',
    },
    {
      title: t('publishing_platform'),
      key: 'publishing_platform',
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

    params.campaignsIds.forEach(element => {
      query.append('campaignsIds', element)
    })

    query.append('PageSize', params.PageSize)
    query.append('Page', params.Page)

    return query
  }

  const { run, loading: loadingAdGroups } = usePagination(
    params => AdsGroupsService.get(getQuery(params)),
    {
      manual: true,
      onSuccess: res => {
        const { data, error, messages } = res.data

        if (error) {
          show(messages[0], 'error')

          return
        }

        adsGroups.value = data.items
        options.value.page = data.current_page
        pageSize.value = data.page_size
        totalCount.value = data.total_count
      },
      onError: err => {
        console.log(err)
      },
    }
  )

  const { run: runStartAdGroup, loading: loadingStart } = useRequest(
    (platform, params) => AdsGroupsService.activate(platform, params),
    {
      manual: true,
      onSuccess: res => {
        const { error, messages } = res.data
        if (error) {
          show(messages[0], 'error')

          return
        }

        show(t('updated_message'), 'success')
        run({ PageSize: options.value.itemsPerPage, Page: options.value.page })
      },
    }
  )

  const { run: runPauseAdGroup, loading: loadingPause } = useRequest(
    (platform, params) => AdsGroupsService.pause(platform, params),
    {
      manual: true,
      onSuccess: res => {
        const { error, messages } = res.data
        if (error) {
          show(messages[0], 'error')

          return
        }

        show(t('updated_message'), 'success')
        run({
          PageSize: options.value.itemsPerPage,
          Page: options.value.page,
          campaignsIds: props.campaignsIds,
        })
      },
    }
  )

  const { run: runDeleteAdGroup, loading: deleteLoading } = useRequest(
    (platform, params) => AdsGroupsService.remove(platform, params),
    {
      manual: true,
      onSuccess: () => {
        const { error, messages } = res.data
        if (error) {
          show(messages[0], 'error')

          return
        }

        show(t('deleted_message'), 'success')
        run({
          PageSize: options.value.itemsPerPage,
          Page: options.value.page,
          campaignsIds: props.campaignsIds,
        })
      },
    }
  )

  const handleWatch = () => {
    if (!props.campaignsIds?.length) return
    run({
      PageSize: options.value.itemsPerPage,
      Page: options.value.page,
      campaignsIds: props.campaignsIds,
    })
  }

  watch(options, handleWatch, { deep: true })

  watch(() => props.campaignsIds, handleWatch)

  const resolveUserStatusVariant = stat => {
    const statLowerCase = stat.toLowerCase()
    if (statLowerCase === 'pending') return 'warning'
    if (statLowerCase === 'active') return 'success'
    if (statLowerCase === 'inactive') return 'secondary'

    return 'primary'
  }

  const isActivateConfirmDialogVisible = ref(false)
  const isPauseConfirmDialogVisible = ref(false)
  const isDeleteConfirmDialogVisible = ref(false)

  const toggleDialog = (type, id, platform) => {
    selectedItemId.value = id
    selectedPlatform.value = platform

    switch (type) {
      case 'delete':
        isDeleteConfirmDialogVisible.value = !isDeleteConfirmDialogVisible.value
        break
      case 'activate':
        isActivateConfirmDialogVisible.value =
          !isActivateConfirmDialogVisible.value
        break
      case 'pause':
        isPauseConfirmDialogVisible.value = !isPauseConfirmDialogVisible.value
        break
    }
  }

  const selectedItemId = ref(null)
  const selectedPlatform = ref(null)

  const goToEdit = item => {
    console.log(item)
    router.push({
      name: '/ad-groups/[campaignId]/edit/',
      params: {
        campaignId: item.client_campaign_id,
      },
      query: {
        platform: item.ad_platform,
        id: item.id,
      },
    })
  }

  const deleteConfirmed = confirmed => {
    if (!confirmed) return
    runDeleteAdGroup(selectedPlatform.value, { id: selectedItemId.value })
  }

  const activateConfirmed = confirmed => {
    if (!confirmed) return

    runStartAdGroup(selectedPlatform.value, { id: selectedItemId.value })
  }

  const pauseConfirmed = confirmed => {
    if (!confirmed) return

    runPauseAdGroup(selectedPlatform.value, { id: selectedItemId.value })
  }

  const getStatus = status => {
    const loweredStatus = status.toLowerCase()

    return t(`ad_group_status_${loweredStatus}`)
  }

  const handleDate = date => {
    if (!date) return t('no_date')

    return moment(date).format('D/M/YYYY')
  }

  const loading = computed(
    () =>
      loadingAdGroups.value ||
      loadingStart.value ||
      loadingPause.value ||
      deleteLoading.value
  )

  watch(selectedItems, newValue =>
    emits(
      'selectionUpdated',
      adsGroups.value.filter(ag => newValue.includes(ag.id))
    )
  )
</script>

<template>
  <!-- SECTION datatable -->
  <VDataTableServer
    v-model="selectedItems"
    v-model:items-per-page="options.itemsPerPage"
    v-model:page="options.page"
    class="text-no-wrap"
    :headers="headers"
    :items="adsGroups"
    :items-length="totalCount"
    :loading="loading"
    no-data-text="no_data_text"
    select-strategy="all"
    show-select
    @update:options="options = $event"
  >
    <!-- Platform -->
    <template #item.publishing_platform="{ item }">
      <span class="font-weight-medium">
        {{ t(`platforms.${item.publishing_platform.toLowerCase()}.title`) }}
      </span>
    </template>

    <!-- Status -->
    <template #item.status="{ item }">
      <VChip
        class="text-capitalize"
        :color="resolveUserStatusVariant(item.status)"
        label
        size="small"
      >
        {{ getStatus(item.status) }}
      </VChip>
    </template>

    <!-- Created At -->
    <template #item.created_at="{ item }">
      <td class="d-flex flex-column">
        <span class="font-weight-medium">
          {{ handleDate(item.created_at) }}
        </span>
      </td>
    </template>

    <!-- Last Updated -->
    <template #item.last_updated="{ item }">
      <td class="d-flex flex-column">
        <span class="font-weight-medium">
          {{ handleDate(item.last_updated) }}
        </span>
      </td>
    </template>

    <!-- Actions -->
    <template #item.actions="{ item }">
      <VTooltip :text="t('delete')">
        <template #activator="{ props: toolTipProps }">
          <VBtn
            v-bind="toolTipProps"
            @click="toggleDialog('delete', item.id, item.ad_platform)"
          >
            <VIcon color="error" icon="tabler-trash" />
          </VBtn>
        </template>
      </VTooltip>
      <VTooltip :text="t('edit')">
        <template #activator="{ props: toolTipProps }">
          <VBtn :disabled="item.is_external===true" v-bind="toolTipProps" @click="goToEdit(item)">
            <VIcon icon="tabler-edit" />
          </VBtn>
        </template>
      </VTooltip>

      <VBtn
        v-if="['Paused', 'Created'].includes(item.status)"
        size="x-small"
        variant="outlined"
        @click="toggleDialog('activate', item.id, item.ad_platform)"
      >
        {{ t("start_ad_group") }}
      </VBtn>
      <VBtn
        v-else
        size="x-small"
        variant="outlined"
        @click="toggleDialog('pause', item.id, item.ad_platform)"
      >
        {{ t("pause_campaign_group") }}
      </VBtn>
    </template>

    <!-- pagination -->
    <template #bottom>
      <VDivider />
      <div
        class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3"
      >
        <p class="text-sm text-disabled mb-0">
          {{ paginationMeta(options, totalCount) }}
        </p>

        <VPagination
          v-model="options.page"
          :length="Math.ceil(totalCount / options.itemsPerPage)"
          total-visible="3"
        />
      </div>
    </template>
  </VDataTableServer>
  <!-- SECTION -->

  <!-- 👉 Delete Confirm Dialog -->
  <ConfirmDialog
    v-model:is-dialog-visible="isDeleteConfirmDialogVisible"
    :confirmation-question="t('dialog_question')"
    @confirm="deleteConfirmed"
  />

  <!-- 👉 Activate Confirm Dialog -->
  <ConfirmDialog
    v-model:is-dialog-visible="isActivateConfirmDialogVisible"
    :confirmation-question="t('dialog_question')"
    @confirm="activateConfirmed"
  />

  <!-- 👉 Deactivate Confirm Dialog -->
  <ConfirmDialog
    v-model:is-dialog-visible="isPauseConfirmDialogVisible"
    :confirmation-question="t('dialog_question')"
    @confirm="pauseConfirmed"
  />
</template>
