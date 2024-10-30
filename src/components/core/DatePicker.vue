<script setup>
  import { VDateInput } from 'vuetify/labs/VDateInput'
  import { ref } from 'vue'
  import i18n from '@/i18n'
  const { t } = i18n.global

  const model = ref(null)
</script>

<template>
  <div class="d-flex justify-center picker_container">
    <VDateInput
      v-model="model"
      base-color="#706D79"
      bg-color="#fff"
      color="#706D79"
      density="compact"
      :label="t('select_range')"
      max-width="368"
      multiple="range"
      prepend-icon="none"
      prepend-inner-icon="$calendar"
      rounded="xl"
      variant="outlined"
    />
  </div>
</template>

<style lang='scss' scoped>
.picker_container{
    height: 40px !important;
}
.datetime-picker input[data-v-a46a390c] {
    width: 150px !important;
    height: 20px !important;
}

</style>
