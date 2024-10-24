<script setup>
  import { usePagination, useRequest } from 'vue-request'
  import CampaignsService from '@/services/campaigns-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { usePlatformsStore } from '@/stores/usePlatformsStore'
  import { useAuthStore } from '@/stores/useAuthStore'
  import { storeToRefs } from 'pinia'
  import { paginationMeta } from '@/composable/utils'
  import moment from 'moment'

  const { show } = useSnackbarStore()
  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()
  const { user } = storeToRefs(useAuthStore())
  const router = useRouter()

  const totalCampaigns = ref(0)
  const campaigns = ref([])
  const totalPage = ref()

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

  const { run, loading } = usePagination(
    params => CampaignsService.get(params),
    {
      manual: true,
      onSuccess: res => {
        const { data, error, message } = res.data

        campaigns.value = data.items
        options.value.page = data.current_page
        totalPage.value = data.page_size
        totalCampaigns.value = data.total_count
      },
    },
  )

  const { run: runStartCampaign } = useRequest(
    data => CampaignsService.startCampaign(data),
    {
      manual: true,
      onSuccess: res => {
        const { error, data, messages, code } = res.data

        run({ PageSize: options.value.itemsPerPage, Page: options.value.page })

        if (error) {
          show(messages[0], 'error')
        } else {
          show(t('updated_message'), 'success')
        }
      },
    },
  )

  const { run: runPauseCampaign } = useRequest(
    data => CampaignsService.pauseCampaign(data),
    {
      manual: true,
      onSuccess: res => {
        const { error, data, messages, code } = res.data

        run({ PageSize: options.value.itemsPerPage, Page: options.value.page })

        if (error) {
          show(messages[0], 'error')
        } else {
          show(t('updated_message'), 'success')
        }
      },
    },
  )

  const { run: runDeleteCampaign } = useRequest(
    params => CampaignsService.deleteCampaign(params),
    {
      manual: true,
      onSuccess: res => {
        const { error, data, messages, code } = res.data

        if (error) {
          show(messages[0], 'error')
        } else {
          show(t('deleted_message'), 'success')
          run({ PageSize: options.value.itemsPerPage, Page: options.value.page })
        }
      },
    },
  )

  watch(
    options,
    () => {
      run({ PageSize: options.value.itemsPerPage, Page: options.value.page })
    },
    { deep: true },
  )

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

  const addNewCampaign = userData => {
    router.push({ name: 'campaigns-create' })
  }

  const isActivateConfirmDialogVisible = ref(false)
  const isPauseConfirmDialogVisible = ref(false)
  const isDeleteConfirmDialogVisible = ref(false)

  const getPlayButtonText = status => {
    return status === 'Paused' ? t('start_campaign') : t('pause_campaign')
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

  watch(
    locale,
    () => {
      update([
        {
          title: t('campaigns'),
          active: false,
          to: '/campaigns/',
        },
      ])
    },
    { immediate: true }
  )
</script>
<template>
  <VCard>
    <div class="d-flex align-center justify-space-between ga-4 pa-4">
      <VCardTitle class="font-weight-medium text-surface-variant pa-0">
        {{ $t("campaigns") }}
      </VCardTitle>
      <VBtn color="warning" rounded :to="{ name: '/campaigns/add' }">
        <VIcon icon="tabler-circle-plus-filled" />
        {{ $t("add_campaign") }}
      </VBtn>
    </div>

    <VCardText class="pa-4 pt-0">
      <VDivider />
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        class="text-no-wrap"
        :headers="headers"
        :items="campaigns"
        :items-length="totalCampaigns"
        :loading="loading"
        :no-data-text="'no_data_text'"
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
                @click="
                  toggleDialog('delete', item.id, item.ad_platform)
                "
              >
                <VIcon
                  color="error"
                  icon="tabler-trash"
                />
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

          <VBtn
            v-if="
              ['Paused', 'Created', 'Started', 'Active'].includes(
                item.status
              )
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
            {{ getPlayButtonText(item.status) }}
          </VBtn>
        </template>

        <!-- pagination -->
        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
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
    </VCardText>
  </VCard>
</template>
