<script setup>

  const bool = ref(false)
</script>

<template>
  <v-btn @click="bool = true">
    Open Dialog
  </v-btn>
  <v-dialog v-model="bool" width="auto">
    <CampaignRuleModal
      v-model:is-dialog-visible="bool"
    />
  </v-dialog>

</template>
