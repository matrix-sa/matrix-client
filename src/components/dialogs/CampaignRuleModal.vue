<script setup>
import { requiredValidator } from '@/utilities/validators'
import { useI18n } from 'vue-i18n'
import { useRequest } from 'vue-request'
import { useSnackbarStore } from '@/stores/useSnackBarStore'
import ruleIcon from '@/assets/rule-icon.svg'
import AppChipSelect from '../core/AppChipSelect.vue'
const props = defineProps({})

const emit = defineEmits(['saved', 'update:isDialogVisible'])

const form = ref({
  ad_account_id: null,
  pixel_id: null,
  public_profile_id: null,
  funding_instrument_id: null,
  facebook_page_id: null,
})

const { t } = useI18n()
const { show } = useSnackbarStore()

const handleClose = () => {
  emit('update:isDialogVisible', false)
}
</script>
<template>
  <v-card class="connect-platform px-6 rounded-xl" min-width="40vw" rounded="lg">
    <v-card-title class="d-flex justify-space-between align-center px-0">
      <div class="text-h5 text-medium-emphasis text-tajawal">
        <div class="d-flex align-center ga-2">
          <v-img aspect-ratio="1/1" :src="ruleIcon" width="40" />
          <p>
            <span class="dark-1 font-weight-bold"> {{ t("control_rule") }} </span>
          </p>
        </div>
      </div>

      <v-btn class="close-btn" icon="mdi-close" variant="text" @click="handleClose" />
    </v-card-title>

    <v-divider class="mb-4" />

    <div class="camp-rule-text pa-4">
      <p>
        {{ t('camaign_rule_modal_text') }}
      </p>
    </div>


    <v-container class="mt-4">
      <v-row>
        <v-col cols="12" sm="6">
          <AppChipSelect v-model="gender" :items="[
            { id: 1, title: t('greater_than') },
            { id: 2, title: t('less_than') },
          ]" :label="t('if_the_return_on_spending')" />
        </v-col>
        <v-col cols="12" sm="6">
          <ApptextField :appendText="t('SAR')" :label="t('the_value_of_return_on_spending')"
            :placeholder="t('enter_value')" />

        </v-col>

        <v-col cols="12" sm="6">
          <AppChipSelect v-model="gender" :items="[
            { id: 1, title: t('monetary_value') },
            { id: 2, title: t('percentage') },
          ]" :label="t('increase_the_value_select_the_type_of_increase')" />
        </v-col>
        <v-col cols="12" sm="6">
          <ApptextField :appendText="t('SAR')" :label="t('increase_your_budget_by')" :placeholder="t('enter_value')" />

        </v-col>
      </v-row>
    </v-container>


    <v-divider class="mt-2" />

    <v-card-actions class="my-2 d-flex justify-end">
      <v-btn class="text-none" rounded="xl" :text="t('cancel')" @click="handleClose" />

      <v-btn append-icon="mdi-check" class="text-none save-btn" color="success" :disabled="!isFormValid"
        :loading="loadingSubmittingAdAccount || loadingCheckingPlatform" rounded="xl" :text="t('save')" variant="flat"
        :width="120" @click="() => { }" />
    </v-card-actions>
  </v-card>
</template>

<style lang="scss">
.v-col-sm-6 {
  padding: 0 8px;
}

.connect-platform {
  .dark-1 {
    color: rgb(var(--v-dark-1));
  }

  .close-btn {
    svg {
      color: rgb(var(--v-dark-1));
    }
  }

  .save-btn {
    justify-content: space-around;
  }

  .save-btn:disabled {
    opacity: 0.35 !important;
  }

  .camp-rule-text {
    background-color: rgb(var(--v-theme-background));
    border-radius: 12px;

    p {
      color: rgb(var(--v-dark-1));
    }
  }
}
</style>
