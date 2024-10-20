<script setup>
import CampaignRuleModal from '@/components/dialogs/CampaignRuleModal.vue';
import { ref } from 'vue'

const dialog = ref(false)
</script> <template>
  <div>

    <v-dialog v-model="dialog" max-width="500">
      <CampaignRuleModal v-model:is-dialog-visible="dialog" />
    </v-dialog>

    <button @click="dialog = true">Click</button>
  </div>
</template>
