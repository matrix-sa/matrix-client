<script setup>
  defineOptions({
    name: 'AppCheckbox',
    inheritAttrs: false,
  })

  defineProps({
    label: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  })

  const elementId = computed(() => {
    const attrs = useAttrs()
    const _elementIdToken = attrs.id || attrs.label

    return _elementIdToken
      ? `app-checkbox-${_elementIdToken}-${Math.random()
        .toString(36)
        .slice(2, 7)}`
      : undefined
  })
</script>

<template>
  <div class="app-checkbox" :class="$attrs.class">
    <VCheckbox
      v-bind="{
        ...$attrs,
        class: null,
        id: elementId,

        color: color || 'primary',
        hideDetails: true
      }"
    >
      <template #label>
        <span class="custom-label">{{ label }}</span>
      </template>
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </VCheckbox>

  </div>
</template>

<style lang="scss" scoped>
.v-input__control {
  height: 30px !important;
}

.custom-label {
  color: rgb(var(--v-dark-1)) !important;

}

.v-checkbox.v-input {
  height: 50px !important;

}
</style>
