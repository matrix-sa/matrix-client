<script setup>
  defineOptions({
    name: 'AppAutocomplete',
    inheritAttrs: false,
  })

  const elementId = computed(() => {
    const attrs = useAttrs()
    const _elementIdToken = attrs.id || attrs.label

    return _elementIdToken ? `app-autocomplete-${_elementIdToken}-${Math.random().toString(36).slice(2, 7)}` : undefined
  })

  const label = computed(() => useAttrs().label)
</script>

<template>
  <div
    class="app-autocomplete flex-grow-1"
    :class="$attrs.class"
  >
    <VLabel
      v-if="label"
      class="mb-1 text-body-2 text-dark-1"
      :for="elementId"
      :style="{ color: 'black' }"
      :text="label"
    />
    <VAutocomplete
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
      <template
        v-for="(_, name) in $slots"
        #[name]="slotProps"
      >
        <slot
          :name="name"
          v-bind="slotProps || {}"
        />
      </template>
    </VAutocomplete>
  </div>
</template>
<style lang="scss">
.app-autocomplete {
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
