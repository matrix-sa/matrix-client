<script setup>
  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
  })
</script>

<template>
  <VBtn
    class="text-white"
    color="#1877F2"
    v-bind="{ ...$attrs }"
  >
    <template #append>
      <VIcon
        icon="ic:baseline-facebook"
        size="30"
      />
    </template>

    {{ props.text }}
  </VBtn>
</template>

<style>
.white-text {
  color: white !important;
}
</style>
