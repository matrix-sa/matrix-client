<script setup>
  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: false,
    },
  })

  const emits = defineEmits(['update:modelValue'])
  const selected = ref(props.modelValue)

  watch(selected, newValue => {
    emits('update:modelValue', newValue)
  })

  watch(
    () => props.modelValue,
    newValue => selected.value = newValue
  )

  const elementId = computed(() => {
    const _elementIdToken = props.label

    return _elementIdToken
      ? `app-chip-select-${_elementIdToken}-${Math.random()
        .toString(36)
        .slice(2, 7)}`
      : undefined
  })
</script>
<template>
  <div class="app-chip-select flex-grow-1">
    <VLabel
      v-if="label"
      class="mb-1 text-body-2 text-dark-1"
      :for="elementId"
      persistent-placeholder
      :text="label"
    />

    <v-chip-group
      :id="elementId"
      v-model="selected"
      class="mx-n1"
      column
      selected-class="text-primary v-chip-selected"
    >
      <v-chip
        v-for="item in props.items"
        :key="item.id"
        class="mx-1"
        size="x-large"
        :text="item.title"
        :value="item.id"
      >
        <template v-if="item.withIcon">
          <div class="d-flex align-center ga-2">
            <img alt="" class="chip-icon" :src="item.iconSrc">
            <span class="ml-2">{{ item.title }}</span>
          </div>
        </template>
        <template v-else>
          {{ item.title }}
        </template>
        <template v-if="item.haveDiscount" #default>
          {{ item.title }}
          <div v-if="$slots.text" class="absolute-element d-flex align-center justify-center">
            <slot name="text" />
          </div>
        </template>
      </v-chip>
    </v-chip-group>
  </div>
</template>

<style lang="scss">
.app-chip-select {
  .v-chip {
    flex-grow: 1;
    border-radius: 12px;
    height: 48px;
    &.v-chip-selected {
      background-color: rgb(var(--v-theme-primary));
      .v-chip__content {
        color: white;
      }
    }
    .v-chip__content {
      font-size: 16px;
      margin: auto;
    }
  }
}

.absolute-element{
  position: absolute;
  top: 0;
  left: 20px;
  width: 30px;
  height: 30px;
  background: #F50;

  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  color: white;
  font-size: 12px;
  font-weight: 500;

}
</style>
