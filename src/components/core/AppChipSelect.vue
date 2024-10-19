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
  })

  const emits = defineEmits(['update:modelValue'])
  const selected = ref(null)
  watch(selected, newValue => {
    emits('update:modelValue', newValue)
  })

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
      class="mb-1 text-body-2 text-high-emphasis"
      :for="elementId"
      persistent-placeholder
      :text="label"
    />

    <v-chip-group
      :id="elementId"
      v-model="selected"
      column
      selected-class="text-primary v-chip-selected"
    >
      <v-chip
        v-for="item in props.items"
        :key="item.id"
        size="x-large"
        :text="item.title"
        :value="item.id"
      />

    </v-chip-group>
  </div>
</template>

<style lang="scss">
.app-chip-select{
    .v-chip{
        flex-grow: 1;
        border-radius: 12px;
        height: 48px;
        &.v-chip-selected{
            background-color: rgb(var(--v-theme-primary));
            .v-chip__content{
                color: white;
            }
        }
        .v-chip__content{
            margin: auto;
        }
    }
}
</style>
