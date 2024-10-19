<script setup>
  import uploadIcon from '@/assets/upload_icon.svg'
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
        }"
      />
    </div>
  </div>
</template>

<style lang="scss">
.app-file-input {
  display: flex;
  align-items: start;
  img {
    height: 3.5rem;
    cursor: pointer;
  }
  .v-field__overlay {
    display: none;
  }
}
</style>
