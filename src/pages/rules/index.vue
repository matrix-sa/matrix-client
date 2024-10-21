<script setup>
import ConnectionRuleModal from '@/components/dialogs/ConnectionRuleModal.vue';
import { ref } from 'vue'
import CampaignRuleModal from '@/components/dialogs/CampaignRuleModal.vue';

const connectionRuledialog = ref(false)
const dialog = ref(false)
</script>

<template>
  <div>



    <v-dialog v-model="connectionRuledialog" max-width="500">
      <ConnectionRuleModal v-model:is-dialog-visible="connectionRuledialog" />
    </v-dialog>

    <v-dialog v-model="dialog" max-width="500">
      <CampaignRuleModal v-model:is-dialog-visible="dialog" />
    </v-dialog>


    <v-btn @click="dialog = true" color="primary" rounded="xl" text="Click Campaign Rule" variant="flat" />

    <v-btn @click="connectionRuledialog = true" color="primary" rounded="xl" text="Click For Connection Rule"
      variant="flat" />
  </div>
</template>
