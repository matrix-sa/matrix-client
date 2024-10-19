<script setup>
  const gender = ref(null)
</script>
<template>
  <ApptextField label="Enter your name" placeholder="Name" />

  <AppNumberField label="Enter your value" placeholder="150" />

  <AppSelect
    :items="[
      'California',
      'Colorado',
      'Florida',
      'Georgia',
      'Texas',
      'Wyoming',
    ]"
    label="Select"
    placeholder="Select"
  />

  <AppChipSelect
    v-model="gender"
    :items="[
      { id: 1, title: 'male' },
      { id: 2, title: 'female' },
    ]"
    label="Gender"
  />

  <app-file-input label="Upload" label-hint="png,svg" />
</template>
<style lang="scss"></style>
