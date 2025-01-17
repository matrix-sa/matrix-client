<script setup>
  defineProps({
    title: { type: String, required: true },
  })
</script>

<template>
  <div class="title-badge-container">
    {{ title }}
  </div>
</template>

<style scoped>
.title-badge-container {
    background-color: rgba(var(--v-violet), 10%);
    width: 100%;
    padding: 18px;
    border-radius: 12px;

    font-size: 16px;
    font-weight: 700;
    line-height: 19.2px;
    color: #29213C
}
</style>
