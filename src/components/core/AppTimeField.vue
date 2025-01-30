<script setup>
  import moment from 'moment'
  import { VTimePicker } from 'vuetify/labs/VTimePicker'

  defineOptions({
    name: 'AppTimeField',
    inheritAttrs: false,
    appendText: '',
  })

  const props = defineProps({
    title_name: {
      type: String,
      default: null,
      required: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Number],
      required: false,
    },
  })

  const emits = defineEmits(['update:modelValue'])
  const time = ref(
    props.title_name ? (props.title_name == 'start' ? moment().startOf('day').format('HH:mm') : moment().endOf('day').format('HH:mm')) : null)
  const modal = ref(false)

  watch(time, newValue => {
    emits('update:modelValue', newValue)
  })

  watch(
    () => props.modelValue,
    newValue => { // Corrected arrow function syntax
      time.value = newValue
    }
  )

  const elementId = computed(() => {
    const attrs = useAttrs()
    const _elementIdToken = attrs.id || attrs.label

    return _elementIdToken
      ? `app-time-field-${_elementIdToken}-${Math.random()
        .toString(36)
        .slice(2, 7)}`
      : undefined
  })

  const label = computed(() => useAttrs().label)
</script>

<template>
  <div class="app-time-field flex-grow-1" :class="$attrs.class">
    <VLabel
      v-if="label"
      class="mb-1 text-body-2 text-dark-1"
      :for="elementId"
      persistent-placeholder
      :text="label"
    />
    <v-text-field
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
      v-model="time"
      :active="modal"
      :focused="modal"
      readonly
    >
      <template #default>
        <v-dialog v-model="modal" activator="parent" width="auto">
          <v-time-picker v-if="modal" v-model="time" :title="'select_time'" />
        </v-dialog>
      </template>
    </v-text-field>
  </div>
</template>
<style lang="scss">
.app-time-field {
  .v-field {
    border-radius: 0.75rem;
    height: 48px;
    margin-top: 8px;
    padding: 11px 8px;
    align-content: center;
  }
}

.time-input.input-bordered {
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
