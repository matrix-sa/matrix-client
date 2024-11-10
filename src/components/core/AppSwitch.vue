<template>
  <v-switch hide-details inset class="custom-switch" v-model="localValue" :label="props.label" color="orange">
    <template #thumb>
      <v-icon size="20" :color="thumbColor">{{ icon }}</v-icon>
    </template>
  </v-switch>
</template>

<script setup>
import { computed, defineProps, watch, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  onIcon: {
    type: String,
    default: 'mdi-check',
  },
  offIcon: {
    type: String,
    default: 'si:close-line',
  },
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)
watch(localValue, (newValue) => {
  emit('update:modelValue', newValue)
})


// Dynamically set the colors based on switch state
const thumbColor = computed(() => (localValue.value ? '#fb813e' : '#222'))  // Thumb colors
const icon = computed(() => (localValue.value ? props.onIcon : props.offIcon))
</script>


<style scoped>
.custom-switch .v-input__details {
  display: none !important;
}

.custom-switch .v-switch__track {
  background-color: var(--track-color);
}

.custom-switch .v-switch__thumb {
  background-color: var(--thumb-color);
}
</style>
