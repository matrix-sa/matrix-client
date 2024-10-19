<script setup>
const props = defineProps({
  spendings: Object,
})

const currency = inject('currency')
</script>

<template>
  <VCard :title="$t('return_on_spending')" :subtitle="$t('last-week')" class="d-flex flex-column">
    <VCardText>
      <div v-if="props.spendings !== null" class="d-flex flex-column align-start ga-3 h-100 justify-end">
        <div class="d-flex align-center ga-1">
          <h4 class="text-h5 font-weight-bold">
            {{ props.spendings?.total_current }}
          </h4>
          <sub>{{ currency }}</sub>
        </div>
        <VChip label density="comfortable" size="x-large" color="success" class="font-weight-bold px-3">
          {{ props.spendings?.rate }}%
          {{ props.spendings?.rate?.toString()?.includes('-') ? '-' : '+' }}
        </VChip>
        <span class="text-caption">{{ $t('compared-to-last-week') }}</span>
      </div>

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>
