<script setup>
  import { usePagination, useRequest } from 'vue-request'
  import CampaignsService from '@/services/campaigns-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useI18n } from 'vue-i18n'
  import { paginationMeta } from '@/composable/utils'
  import debounce from 'lodash/debounce'
  import moment from 'moment'

  const props = defineProps({
    dateRange: {
      type: Array,
      default: null,
    },
    search: {
      type: String,
      default: null,
    },
  })

  const emits = defineEmits(['selectionUpdated'])

  const { show } = useSnackbarStore()
  const { t } = useI18n()
  const router = useRouter()

  const { dateRange, search } = toRefs(props)

  const totalCampaigns = ref(0)
  const campaigns = ref([])
  const totalPage = ref()

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
      title: t('ad_platform'),
      key: 'ad_platform',
    },
    {
      title: t('status'),
      key: 'status',
    },
    {
      title: t('start_time'),
      key: 'start_time',
    },
    {
      title: t('end_time'),
      key: 'end_time',
    },
    {
      title: t('daily_budget'),
      key: 'daily_budget',
    },
    {
      title: '',
      key: 'actions',
      sortable: false,
    },
  ]

  const { run, loading: loadingFetchingData } = usePagination(
    () => CampaignsService.get({
      PageSize: options.value.itemsPerPage,
      Page: options.value.page,
      StartDate: dateRange.value?.[0],
      EndDate: dateRange.value?.[dateRange.value.length - 1],
      Search: search.value,
    }),
    {
      manual: true,
      onSuccess: res => {
        const { data } = res.data

        campaigns.value = data.items
        options.value.page = data.current_page
        totalPage.value = data.page_size
        totalCampaigns.value = data.total_count
      },
    }
  )
  const debouncedRun = debounce(run, 1000)

  const { run: runStartCampaign, loading: loadingStart } = useRequest(
    data => CampaignsService.startCampaign(data),
    {
      manual: true,
      onSuccess: res => {
        const { error, messages } = res.data

        run()

        if (error) {
          show(messages[0], 'error')
        } else {
          show(t('updated_message'), 'success')
        }
      },
    }
  )

  const { run: runPauseCampaign, loading: loadingPause } = useRequest(
    data => CampaignsService.pauseCampaign(data),
    {
      manual: true,
      onSuccess: res => {
        const { error, messages } = res.data

        run()

        if (error) {
          show(messages[0], 'error')
        } else {
          show(t('updated_message'), 'success')
        }
      },
    }
  )

  const { run: runDeleteCampaign, loading: loadingDelete } = useRequest(
    params => CampaignsService.deleteCampaign(params),
    {
      manual: true,
      onSuccess: res => {
        const { error, messages } = res.data

        if (error) {
          show(messages[0], 'error')
        } else {
          show(t('deleted_message'), 'success')
          run()
        }
      },
    }
  )

  watch(options, run, { deep: true })
  watch(search, debouncedRun)
  watch(dateRange, run)

  const resolveUserStatusVariant = stat => {
    const statLowerCase = stat.toLowerCase()

    switch (statLowerCase) {
      case 'paused':
        return 'warning'
      case 'active':
        return 'success'
      case 'archived':
        return 'secondary'
      default:
        return 'primary'
    }
  }

  const isActivateConfirmDialogVisible = ref(false)
  const isPauseConfirmDialogVisible = ref(false)
  const isDeleteConfirmDialogVisible = ref(false)

  const getPlayButtonIcon = status => {
    return status === 'Paused' ? 'tabler-player-play' : 'tabler-player-pause'
  }

  const getStatusAction = status => {
    return status === 'Paused' ? 'activate' : 'pause'
  }

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

  const editCampaign = id => {
    router.push({ name: '/campaigns/edit/[id]', params: { id } })
  }

  const selectedItemId = ref(null)
  const selectedPlatform = ref(null)

  const deleteConfirmed = confirmed => {
    if (!confirmed) return

    runDeleteCampaign({
      id: selectedItemId.value,
      platform: selectedPlatform.value,
    })
  }

  const activateConfirmed = confirmed => {
    if (!confirmed) return

    runStartCampaign({ id: selectedItemId, platform: selectedPlatform })
  }

  const pauseConfirmed = confirmed => {
    if (!confirmed) return

    runPauseCampaign({ id: selectedItemId, platform: selectedPlatform })
  }

  const getStatus = status => {
    const loweredStatus = status.toLowerCase()

    return t(`campaign_status_${loweredStatus}`)
  }

  const handleDate = date => {
    if (!date) return t('no_date')

    return moment(date).format('D/M/YYYY')
  }

  const loading = computed(() => {
    return (
      loadingFetchingData.value ||
      loadingStart.value ||
      loadingPause.value ||
      loadingDelete.value
    )
  })

  watch(selectedItems, newValue => {
    emits('selectionUpdated', campaigns.value.filter(c => newValue.includes(c.id)))
  })
</script>
<template>
  <VDataTableServer
    v-model="selectedItems"
    v-model:items-per-page="options.itemsPerPage"
    v-model:page="options.page"
    class="text-no-wrap"
    :headers="headers"
    :items="campaigns"
    :items-length="totalCampaigns"
    :loading="loading"
    :no-data-text="'no_data_text'"
    select-strategy="all"
    show-select
    @update:options="options = $event"
  >
    <!-- Start Time -->
    <template #item.start_time="{ item }">
      <td class="d-flex flex-column">
        <span class="font-weight-medium">
          {{ handleDate(item.start_time) }}
        </span>
      </td>
    </template>

    <!-- End Time -->
    <template #item.end_time="{ item }">
      <td class="d-flex flex-column">
        <span class="font-weight-medium">
          {{ handleDate(item.end_time) }}
        </span>
      </td>
    </template>

    <!-- Platform -->
    <template #item.ad_platform="{ item }">
      <span class="font-weight-medium">
        {{ t(`platforms.${item.ad_platform.toLowerCase()}.title`) }}
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
          <VBtn
            v-bind="toolTipProps"
            @click="editCampaign(item.id, item.ad_platform)"
          >
            <VIcon icon="tabler-edit" />
          </VBtn>
        </template>
      </VTooltip>
      <VTooltip
        v-if="
          ['Paused', 'Created', 'Started', 'Active'].includes(item.status)
        "
        :text="item.status === 'Paused' ? t('start_campaign'): t('pause_campaign')"
      >
        <template #activator="{ props: toolTipProps }">
          <VBtn
            v-if="
              ['Paused', 'Created', 'Started', 'Active'].includes(item.status)
            "
            v-bind="toolTipProps"
            @click="
              toggleDialog(
                getStatusAction(item.status),
                item.id,
                item.ad_platform
              )
            "
          >
            <VIcon :icon="getPlayButtonIcon(item.status)" />
          </VBtn>
        </template>
      </VTooltip>

      <!-- <VBtn
        v-if="
          ['Paused', 'Created', 'Started', 'Active'].includes(item.status)
        "
        size="x-small"
        variant="outlined"
        @click="
          toggleDialog(
            getStatusAction(item.status),
            item.id,
            item.ad_platform
          )
        "
      >
        {{ getPlayButtonIcon(item.status) }}
      </VBtn> -->
    </template>

    <!-- pagination -->
    <template #bottom>
      <VDivider />
      <div
        class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3"
      >
        <p class="text-sm text-disabled mb-0">
          {{ paginationMeta(options, totalCampaigns) }}
        </p>

        <VPagination
          v-model="options.page"
          :length="Math.ceil(totalCampaigns / options.itemsPerPage)"
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
