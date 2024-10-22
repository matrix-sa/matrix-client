<script setup>
  defineOptions({
    name: 'AppTextField',
    inheritAttrs: false,
    appendText: '',
  })

  defineProps({
    appendText: {
      type: String,
      default: '',
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  })

  const elementId = computed(() => {
    const attrs = useAttrs()
    const _elementIdToken = attrs.id || attrs.label

    return _elementIdToken
      ? `app-text-field-${_elementIdToken}-${Math.random()
        .toString(36)
        .slice(2, 7)}`
      : undefined
  })

  const label = computed(() => useAttrs().label)
</script>

<template>
  <div class="app-text-field flex-grow-1" :class="$attrs.class">
    <VLabel
      v-if="label"
      class="mb-1 text-body-2 text-high-emphasis"
      :for="elementId"
      persistent-placeholder
      :text="label"
    />
    <VTextField
      class="text-input"
      :class="bordered ? 'input-bordered' : ''"
      height="40"
      v-bind="{
        ...$attrs,
        class: null,
        label: undefined,
        variant: 'solo-filled',
        id: elementId,
        'bg-color': 'background',
        flat: true,
      }"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>

      <template v-if="appendText" #append-inner>
        <span class="append-text" @click="onClick">{{ appendText }}</span>
      </template>
    </VTextField>
  </div>
</template>
<style lang="scss">
.app-text-field {
  .v-field {
    border-radius: 0.75rem;
    height: 48px;
    margin-top: 8px;
    padding: 11px 8px;
    align-content: center;
  }
}

.text-input.input-bordered {
  .v-input__control {
    .v-field {
      border: 1px solid #1f162526;
      background: rgb(var(--v-theme-background));
      transition: all 0.15s linear;

      &--focused {
        outline: 1px solid rgb(var(--v-theme-primary));
        border-color: rgb(var(--v-theme-primary));
      }
    }
    .v-field__overlay {
      background: unset;
    }
  }
}

.app-select .v-field__input {
  line-height: 48px;
}

.v-field__append-inner {
  padding-left: 5px;
}
</style>
