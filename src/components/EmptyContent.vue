<script setup>
  import emptyImg from '@images/empty.svg'
  defineProps({
    title: {
      type: String,
      default: '',
    },
    action: Object,
  })
</script>
<template>
  <VEmptyState :image="emptyImg" :title="title ? title : $t('no_data_text')">
    <VBtn v-if="action" color="primary" rounded :to="action.route">
      {{ action.title }}
    </VBtn>
    <slot />
  </VEmptyState>
</template>
