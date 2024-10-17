<script setup>
const props = defineProps({
  title: String,
  subtitle: String,
  size: { type: String, default: 'small' },
  white: Boolean,
})
</script>


<template>
  <section class="d-flex flex-column align-start">
    <VCardTitle class="pa-0 font-weight-bold" :class="[
      {
        'text-h6': size === 'small',
        'text-h5 mb-2': size === 'large',
        'text-white': white
      }
    ]" style="line-height: 1.3">
      {{ title }}
    </VCardTitle>
    <VCardSubtitle class="pa-0" :class="[
      {
        'text-sm': size === 'small',
        '': size === 'large',
        'text-white': white
      }
    ]">
      {{ subtitle }}
    </VCardSubtitle>
  </section>
</template>
