<script setup>
  defineOptions({
    name: 'AppSelect',
    inheritAttrs: false,
  })

  const elementId = computed(() => {
    const attrs = useAttrs()
    const _elementIdToken = attrs.id || attrs.label

    return _elementIdToken
      ? `app-select-${_elementIdToken}-${Math.random()
        .toString(36)
        .slice(2, 7)}`
      : undefined
  })

  const label = computed(() => useAttrs().label)
</script>

<template>
  <div class="app-select flex-grow-1" :class="$attrs.class">
    <VLabel
      v-if="label"
      class="mb-1 text-body-2 text-high-emphasis"
      :for="elementId"
      persistent-placeholder
      :text="label"
    />
    <v-select
      v-bind="{
        ...$attrs,
        class: null,
        label: undefined,
        variant: 'solo-filled',
        id: elementId,
        'bg-color': 'secondary',
        flat: true,
        density: 'comfortable',
        height: '48'
      }"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </v-select>
  </div>
</template>

<style lang="scss">
.app-select {
  .v-field {
    border-radius: 0.75rem;
    height: 48px !important;
  }

  .v-field__input {
    min-height: 48px;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    display: flex;
    align-items: center;
  }

  .v-select__selection {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
}
</style>
