<template>
  <div class="switch-container">
    <v-switch
      v-model="localValue"
      :base-color="props.baseColor"
      class="custom-switch"
      color="green"
      hide-details
      inset
      :label="label"
    >
      <template #thumb>
        <div class="thumb" />
      </template>
    </v-switch>
    <slot />
  </div>
</template>

<script setup>
  import { computed, defineEmits, defineProps, ref, watch } from 'vue'

  const props = defineProps({
    modelValue: Boolean,
    label: String,
    baseColor: String,
  })

  const emit = defineEmits(['update:modelValue'])
  const localValue = ref(props.modelValue)

  // Sync `v-model` with local value
  watch(
    () => props.modelValue,
    newVal => {
      localValue.value = newVal
    }
  )

  watch(localValue, newVal => {
    emit('update:modelValue', newVal)
  })

  // Dynamically compute the track color
  const trackColor = computed(() => (localValue.value ? '#22c55e' : '#ef4444')) // Green for "on", Red for "off"
</script>

<style scoped>

.switch-container{
    display: flex;
    align-items: center;
    gap: 10px;
}
/* Container for the custom switch */
.custom-switch {
  --switch-track-width: 50px; /* Track width */
  --switch-track-height: 24px; /* Track height */
  --switch-thumb-size: 20px; /* Thumb size */
}

.custom-switch .v-input__control {
  display: flex;
  align-items: center;
}

/* Track (background of the switch) */
.custom-switch .v-switch {
  width: var(--switch-track-width);
  height: var(--switch-track-height);
  border-radius: var(--switch-track-height);
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease-in-out;
}

/* Dynamically set the track colors */
.custom-switch .v-switch {
  background-color: #ef4444; /* Default red */
}

.custom-switch .v-switch--model-value {
  background-color: #22c55e; /* Green when active */
}

/* Thumb (the moving circle) */
.custom-switch .thumb {
  position: absolute;
  top: 50%;
  left: 4px;
  width: var(--switch-thumb-size);
  height: var(--switch-thumb-size);
  background-color: white;
  border-radius: 50%;
  transform: translateY(-50%);
  transition: left 0.3s ease-in-out;
}

/* Thumb position when switch is on */
.custom-switch .v-switch--model-value .thumb {
  left: calc(100% - var(--switch-thumb-size) - 4px);
}

/* Remove Vuetify's default styles */
.v-switch__thumb {
  display: none !important;
}

.v-switch__track {
  background: red !important;
  border: none !important;
}

</style>
