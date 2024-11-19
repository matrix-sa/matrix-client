<script setup>
  const props = defineProps({
    icon: String,
    title: String,
    size: String,
  })
</script>

<template>
  <div class="d-flex flex-column align-center justify-center text-center">
    <VIcon
      :icon="icon? icon : 'tabler-database-off'"
      :size="size? size : '60'"
    />
    {{ title? title : $t('no-data-found') }}
  </div>
</template>
