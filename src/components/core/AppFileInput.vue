<script setup>
  import uploadIcon from '@/assets/upload_icon.svg'

  const attrs = useAttrs()
  document.documentElement.style.setProperty(
    '--hint-content',
    `"${attrs['label-hint']}"`
  )

  const elementId = computed(() => {
    const attrs = useAttrs()
    const _elementIdToken = attrs.id || attrs.label

    return _elementIdToken
      ? `app-file-input-${_elementIdToken}-${Math.random()
        .toString(36)
        .slice(2, 7)}`
      : undefined
  })

  const fileInput = ref(null)
  const fileExists = computed(
    () => fileInput.value?.modelValue?.[0] && !fileInput.value.error
  )

  const fileAndErrorExist = computed(() => fileInput.value?.modelValue?.[0] && fileInput.value.error)
</script>
<template>
  <div class="app-select flex-grow-1" :class="$attrs.class">
    <div class="app-file-input">
      <img
        alt="upload image"
        :src="uploadIcon"
        @click="$refs.fileInput.click()"
      >
      <v-file-input
        ref="fileInput"
        v-bind="{
          ...$attrs,
          class: null,
          variant: 'solo-filled',
          prependIcon: null,
          id: elementId,
          'bg-color': 'transparent',
          flat: true,
          class: {
            'hide-hint': fileExists,
            
          },
        }"
      />
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --hint-content: "cool";
}
.app-file-input {
  display: flex;
  align-items: start;
  img {
    height: 3.5rem;
    cursor: pointer;
  }
  .v-label {
    color: #1f1625;
  }
  .v-label::after {
    display: block;
    color: rgb(var(--v-theme-surface-variant));
    content: var(--hint-content);
  }
  .v-field__overlay {
    display: none;
  }
}
.app-file-input .hide-hint{
  .v-label::after {
    display: none;
  }
  .v-field__input{
    margin-block-start: 0.5em;
  }
}
</style>
