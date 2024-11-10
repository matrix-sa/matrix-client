<script setup>

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  iconSize: {
    type: String,
    default: "24px",
    required: false
  },
  value: {
    type: String,
    default: '',
    required: true
  }
})
</script>

<template>
  <div class="d-flex flex-column">
    <label>{{ label }} </label>
    <div class="card d-flex align-center justify-space-between mt-2">
      <div class="d-flex align-center">

        <v-icon :size="iconSize" color="dark-1">{{ icon }}</v-icon>
        <span class="value ms-2">{{ value }}</span>
      </div>

      <div class="d-flex">
        <slot name="appendEl"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
label {
  font-weight: 400;
  line-height: 17.5px;
  color: rgb(var(--v-theme-surface-variant));
}

.card {
  background-color: #EEE;
  padding: 12px;
  border-radius: 8px;
  gap: 10px;

  .value {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    text-align: right;

    color: rgb(var(--v-dark-1));
  }
}
</style>
