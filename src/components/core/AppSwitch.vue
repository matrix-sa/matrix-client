<template>
  <v-switch
    v-model="localValue"
    class="custom-switch"
    color="orange"
    hide-details
    inset
    :label="label"
  >
    <template #thumb>
      <v-icon :color="thumbColor" size="20">{{ icon }}</v-icon>
    </template>
  </v-switch>
</template>

<script setup>
  import { computed, defineProps, ref, watch } from 'vue'

  const props = defineProps({
    modelValue: Boolean,
    onIcon: {
      type: String,
      default: 'mdi-check',
    },
    offIcon: {
      type: String,
      default: 'si:close-line',
    },
    label: String,
  })

  const emit = defineEmits(['update:modelValue'])
  const localValue = ref(props.modelValue)

  watch(
    () => props.modelValue,
    newVal => {
      localValue.value = newVal
    }
  )

  watch(localValue, newVal => {
    emit('update:modelValue', newVal)
  })

  // Dynamically set the colors based on switch state
  const thumbColor = computed(() => (localValue.value ? '#fb813e' : '#222'))
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
