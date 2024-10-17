<script setup>
const props = defineProps({
  icon: String,
  title: String,
})
</script>


<template>
  <div class="d-flex flex-column align-center justify-center text-center">
    <VIcon
      :icon="icon? icon : 'tabler-database-off'"
      size="100"
    />
    {{ title? title : $t('no-data-found') }}	
  </div>
</template>
