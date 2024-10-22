<script setup>
import { requiredValidator } from '@/utilities/validators'
import { useI18n } from 'vue-i18n'
import { useRequest } from 'vue-request'
import { useSnackbarStore } from '@/stores/useSnackBarStore'
import ruleIcon from '@/assets/rule-icon.svg'
import AppChipSelect from '../core/AppChipSelect.vue'
import CampaignRuleService from '@/services/campaign-rule-service'
import AppTextField from '../core/ApptextField.vue'

const props = defineProps({
  rule: {
    type: Object,
    required: false,
  },
})

const emit = defineEmits(['saved', 'update:isDialogVisible'])

const form = ref({
  roas_condition: null,
  roas_comparing_value: null,
  increment_type: null,
  increment_value: null,
})


const { t } = useI18n()
const { show } = useSnackbarStore()

const handleClose = () => {
  emit('update:isDialogVisible', false)
}


if (props.rule) {
  form.value = props.rule
}
const submit = () => {

  if (!props.rule) {
    create({ ...form.value })
  } else {
    runUpdate({
      id: props.rule.id,
      increment_type: form.value.increment_type,
      increment_value: form.value.increment_value,
      roas_comparing_value: form.value.roas_comparing_value,
      roas_condition: form.value.roas_condition
    })
  }
}

const { run: create, loading: startLoading } = useRequest(
  data => CampaignRuleService.run(data),
  {
    manual: true,
    onSuccess: res => {
      const { error, data, messages, code } = res.data

      if (error) {
        // show(messages[0], "error")

        if (data) {
          //
        }
      }
    },
  },
)

const { run: runUpdate, loading: loadingRunUpdate } = useRequest(
  data => CampaignRuleService.update(data),
  {
    manual: true,
    onSuccess: response => {
      const { error, messages } = response.data
      if (error) {
        show(messages[0], 'error')
        return
      }
      show(t('campaign_rule_updated_successfully'), 'success')

    },
  }
)



const isFormValid = computed(() => {
  const requirements = {
    roas_condition: () => form.value.roas_condition,
    roas_comparing_value: () => form.value.roas_comparing_value,
    increment_type: () => form.value.increment_type,
    increment_value: () => form.value.increment_value,
    default: () => form.value.roas_condition,
  }

  return !!(requirements.default)();
});


watch(
  () => props.rule,
  (newRule) => {
    Object.assign(form.value, newRule);
  },
  { immediate: true }
);
</script>

<template>
  <v-card class="connect-platform px-6 rounded-xl" min-width="40vw" rounded="lg">
    <v-card-title class="d-flex justify-space-between align-center px-0">
      <div class="text-h5 text-medium-emphasis text-tajawal">
        <div class="d-flex align-center ga-2">
          <v-img aspect-ratio="1/1" :src="ruleIcon" width="40" />
          <p>
            <span class="dark-1 font-weight-bold">
              {{ t("control_rule") }}
            </span>
          </p>
        </div>
      </div>

      <v-btn class="close-btn" icon="mdi-close" variant="text" @click="handleClose" />
    </v-card-title>

    <v-divider class="mb-4" />

    <div class="camp-rule-text pa-4">
      <p>
        {{ t("camaign_rule_modal_text") }}
      </p>
    </div>

    <v-container class="mt-4">
      <v-row>
        <v-col cols="12" sm="6">
          <AppChipSelect v-model="form.roas_condition" :items="[
            { id: 'BiggerThan', title: t('greater_than') },
            { id: 'LessThan ', title: t('less_than') },
          ]" :label="t('if_the_return_on_spending')" />
        </v-col>
        <v-col cols="12" sm="6">
          <AppTextField v-model="form.roas_comparing_value" :append-text="t('SAR')"
            :label="t('the_value_of_return_on_spending')" :placeholder="t('enter_value')" />
        </v-col>

        <v-col cols="12" sm="6">

          <AppChipSelect v-model="form.increment_type" :items="[
            { id: 'Value', title: t('monetary_value') },
            { id: 'Percentage', title: t('percentage') },
          ]" :label="t('increase_the_value_select_the_type_of_increase')" />
        </v-col>
        <v-col cols="12" sm="6">
          <AppTextField v-model="form.increment_value" :append-text="t('SAR')" :label="t('increase_your_budget_by')"
            :placeholder="t('enter_value')" />
        </v-col>
      </v-row>
    </v-container>

    <v-divider class="mt-2" />

    <v-card-actions class="my-2 d-flex justify-end">
      <v-btn class="text-none" rounded="xl" :text="t('cancel')" @click="handleClose" />

      <v-btn append-icon="mdi-check" class="text-none save-btn" color="success" :disabled="!isFormValid"
        :loading="startLoading" rounded="xl" :text="t('save')" variant="flat" :width="120" @click="submit" />
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

.app-select {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
