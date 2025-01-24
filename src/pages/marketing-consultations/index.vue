<script setup>
  import { localeTitle, paginationMeta } from '@/composable/utils'
  import { useI18n } from 'vue-i18n'
  import { DateFormat, NumberFormat } from '@/composable/useFormat'
  import MarketingConsultationsOrdersService from '@/services/marketing-consultations-orders-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useRequest } from 'vue-request'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { watch } from 'vue'
  const { update } = useBreadcrumbsStore()
  const totalCount = ref(0)
  const consultationsOrders = ref([])

  const options = ref({
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
    groupBy: [],
    search: undefined,
  })

  const { t, locale } = useI18n()

  const { show } = useSnackbarStore()

  const headers = [
    {
      title: t('marketing-consultation-order.title'),
      key: localeTitle,
    },
    {
      title: t('marketing-consultation-order.status'),
      key: 'status',
    },
    {
      title: t('marketing-consultation-order.created_at'),
      key: 'created_at',
    },
    {
      title: t('marketing-consultation-order.serial_number'),
      key: 'serial_number',
    },
    {
      title: t('marketing-consultation-order.price'),
      key: 'price',
    },
  // {
  //   title: t("marketing-consultation-order.actions"),
  //   key: "actions",
  // },
  ]

  const { run: fetchOrders, loading: loadingOrders } = useRequest(
    MarketingConsultationsOrdersService.getAll,
    {
      isManual: true,
      onSuccess: response => {
        const { data, error, messages } = response.data

        if (error) {
          show(messages[0], 'error')

          return
        }

        consultationsOrders.value = data.items
        options.value.page = data.current_page
        options.value.itemsPerPage = data.page_size
        totalCount.value = data.total_count
      },
    },
  )

  const resolveStatusVariant = status => {
    const statusVariants = {
      created: 'success',
      accepted: 'primary',
      rejected: 'error',
      confirmed: 'info',
      cancelled: 'warning',
      completed: 'success',
      deleted: 'secondary',
    }

    return statusVariants[status?.toLowerCase()] || 'primary'
  }

  const getStatus = status => {
    const loweredStatus = status?.toLowerCase()

    return t(`marketing-consultation-order.statuses.${loweredStatus}`)
  }

  watch(
    options,
    () => {
      fetchOrders({
        PageSize: options.value.itemsPerPage,
        Page: options.value.page,
      })
    },
    { deep: true },
  )
  watch(
    locale,
    () => {
      update([
        {
          title: t('marketing-consultation.name'),
          active: true,
          to: '/marketing-consultations',
        },
      ])
    },
    { immediate: true }
  )

  const loading = computed(() => loadingOrders.value)
</script>

<template>
  <VCard>
    <div class="d-flex align-center justify-space-between ga-4 pa-4">
      <VCardTitle class="font-weight-medium text-surface-variant pa-0">
        {{ $t("consultationsLog") }}
      </VCardTitle>
      <VBtn color="warning" rounded :to="{ name: '/marketing-consultations-orders/' }">
        <VIcon icon="tabler-circle-plus-filled" />
        {{ $t("requestConsult") }}
      </VBtn>
    </div>

    <VCardText class="pa-4 pt-0">
      <VDivider />
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        class="text-no-wrap"
        :headers="headers"
        :items="consultationsOrders"
        :items-length="totalCount"
        :loading="loading"
        :no-data-text="$t('no_data_text')"
        @update:options="options = $event"
      >
        <!-- Created At -->
        <template #item.created_at="{ item }">
          {{ DateFormat(item.created_at) }}
        </template>

        <!-- Last Updated -->
        <template #item.price="{ item }">
          {{ NumberFormat(item.price) }}
          <sub> {{ $t(item.currency) }}</sub>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip class="text-capitalize px-0" :color="resolveStatusVariant(item.status)" variant="text">
            {{ getStatus(item.status) }}
          </VChip>
        </template>

        <!-- Actions -->
        <!-- <template #item.actions="{ item }">
            <td>
              <VTooltip :text="$t('details')">
                <template #activator="{ props }">
                  <VBtn icon="carbon:view-filled" size="x-small" color="primary" v-bind="props" :to="{
                    name: 'marketing-consultations-orders-details-id',
                    params: { id: item.id },
                  }" />
                </template>
              </VTooltip>

              <VTooltip v-if="item.status === 'Accepted'" :text="$t('pay')">
                <template #activator="{ props }">
                  <VBtn icon="game-icons:take-my-money" size="x-small" color="primary" v-bind="props" :to="{
                    name: 'marketing-consultations-orders-pay-id',
                    params: { id: item.id },
                  }" />
                </template>
              </VTooltip>
            </td>
          </template> -->

        <!-- pagination -->
        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta(options, totalCount) }}
            </p>

            <VPagination
              v-model="options.page"
              :length="Math.ceil(totalCount / options.itemsPerPage)"
              total-visible="6"
            />
          </div>
        </template>
      </VDataTableServer>
    </VCardText>
  </VCard>
</template>
