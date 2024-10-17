<script setup>
const props = defineProps({
  sales: Object,
})
</script>


<template>
  <VCard :title="$t('month-sales')" :subtitle="$t('last-month')">
    <VCardText class="d-flex flex-column">
      <template v-if="props.sales !== null">
        <HomeCardFooter :rate="props.sales?.rate_to_previous_month">
          <template #current>
            {{ props.sales?.sales }}
          </template>
        </HomeCardFooter>

        <VRow>
          <VCol cols="5">
            <div class="d-flex align-center mb-3">
              <VAvatar color="warning" variant="tonal" :size="24" rounded class="me-2">
                <VIcon size="18" icon="tabler-graph" />
              </VAvatar>

              <span>{{ $t('net') }}</span>
            </div>
            <h6 class="text-h5">
              {{ props.sales?.net_rate }}%
            </h6>
            <span class="text-sm text-surface-variant">{{ props.sales?.net }}</span>
          </VCol>

          <VCol cols="2">
            <div class="d-flex flex-column align-center justify-center h-100">
              <VDivider vertical class="mx-auto" />

              <div class="pa-1">
                <VChip size="20">
                  <span class="text-xs pa-1">VS</span>
                </VChip>
              </div>

              <VDivider vertical class="mx-auto" />
            </div>
          </VCol>

          <VCol cols="5" class="text-end">
            <div class="d-flex align-center justify-end mb-3">
              <span class="me-2">{{ $t('spendings') }}</span>

              <VAvatar color="primary" variant="tonal" :size="24" rounded>
                <VIcon size="18" icon="tabler-currency-dollar-off" />
              </VAvatar>
            </div>
            <h6 class="text-h5">
              {{ props.sales?.spendings_rate }}%
            </h6>
            <span class="text-sm text-surface-variant">{{ props.sales?.spendings }}</span>
          </VCol>
        </VRow>

        <div class="mt-6">
          <VProgressLinear :model-value="props.sales?.net_rate" color="warning" class="bg-primary" height="8" rounded />
        </div>
      </template>

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>
