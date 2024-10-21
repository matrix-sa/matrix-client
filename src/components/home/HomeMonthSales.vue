<script setup>
  const props = defineProps({
    sales: Object,
  })
</script>

<template>
  <VCard :subtitle="$t('last-month')" :title="$t('month-sales')">
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
              <VAvatar
                class="me-2"
                color="warning"
                rounded
                :size="24"
                variant="tonal"
              >
                <VIcon icon="tabler-graph" size="18" />
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
              <VDivider class="mx-auto" vertical />

              <div class="pa-1">
                <VChip size="20">
                  <span class="text-xs pa-1">VS</span>
                </VChip>
              </div>

              <VDivider class="mx-auto" vertical />
            </div>
          </VCol>

          <VCol class="text-end" cols="5">
            <div class="d-flex align-center justify-end mb-3">
              <span class="me-2">{{ $t('spendings') }}</span>

              <VAvatar color="primary" rounded :size="24" variant="tonal">
                <VIcon icon="tabler-currency-dollar-off" size="18" />
              </VAvatar>
            </div>
            <h6 class="text-h5">
              {{ props.sales?.spendings_rate }}%
            </h6>
            <span class="text-sm text-surface-variant">{{ props.sales?.spendings }}</span>
          </VCol>
        </VRow>

        <div class="mt-6">
          <VProgressLinear
            class="bg-primary"
            color="warning"
            height="8"
            :model-value="props.sales?.net_rate"
            rounded
          />
        </div>
      </template>

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>
