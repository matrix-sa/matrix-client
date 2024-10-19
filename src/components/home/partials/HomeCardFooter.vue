<script setup>
import { inject } from 'vue'

const props = defineProps({
  description: Object,
  rate: Number || String,
  chipBg: {
    type: Boolean,
    default: false,
  },
  current: {
    type: Boolean,
    default: true,
  },
})

const currency = inject('currency')
</script>

<template>
  <VRow class="align-center">
    <VCol cols="3">
      <div v-if="current" class="d-flex align-center ga-1">
        <h4 class="text-h5 font-weight-bold">
          <slot name="current" />
        </h4>
        <sub>{{ currency }}</sub>
      </div>
    </VCol>
    <VCol cols="9">
      <div class="d-flex flex-column align-end" :class="chipBg ? 'ga-3' : ''">
        <VChip :label="chipBg" :density="chipBg ? 'comfortable' : 'compact'" :variant="chipBg ? 'tonal' : 'text'"
          size="x-large" :color="rate === 0
            ? 'secondary' : rate?.toString()?.includes('-')
              ? 'error'
              : 'success'" class="font-weight-bold" :class="chipBg ? 'py-0 px-3' : 'pa-0'">
          {{ rate }}%
          {{ rate?.toString()?.includes('-') ? '-' : '+' }}
        </VChip>
        <span class="text-end text-caption">
          {{ description ? description : $t('compared-to-last-week') }}
          <slot />
        </span>
      </div>
    </VCol>
  </VRow>
</template>
