<script setup>
  import { VDateInput } from 'vuetify/labs/VDateInput'
  defineOptions({
    name: 'AppDateField',
    inheritAttrs: false,
    appendText: '',
  })

  defineProps({
    bordered: {
      type: Boolean,
      default: false,
    },
  })

  const elementId = computed(() => {
    const attrs = useAttrs()
    const _elementIdToken = attrs.id || attrs.label

    return _elementIdToken
      ? `app-date-field-${_elementIdToken}-${Math.random()
        .toString(36)
        .slice(2, 7)}`
      : undefined
  })

  const label = computed(() => useAttrs().label)
</script>

<template>
  <div class="app-date-field flex-grow-1" :class="$attrs.class">
    <VLabel
      v-if="label"
      class="mb-1 text-body-2 text-dark-1"
      :for="elementId"
      persistent-placeholder
      :text="label"
    />
    <VDateInput
      class="date-input"
      :class="bordered ? 'input-bordered' : ''"
      v-bind="{
        ...$attrs,
        class: null,
        label: undefined,
        variant: 'solo-filled',
        prependIcon: null,
        id: elementId,
        'bg-color': 'background',
        flat: true,
        'ok-text': 'agree',
        'cancel-text': 'cancel',
      }"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </VDateInput>
  </div>
</template>
<style lang="scss">
.app-date-field {
  .v-field {
    border-radius: 0.75rem;
    height: 48px;
    margin-top: 8px;
    padding: 11px 8px;
    align-content: center;
  }
}

.date-input.input-bordered {
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

  .v-field__input {
    line-height: 48px;
  }

  .v-field__append-inner {
    padding-left: 5px;
  }
}
</style>
