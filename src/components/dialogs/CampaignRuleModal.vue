<script setup>
import { ref, computed, watch } from 'vue'
import { requiredValidator } from '@/utilities/validators'
import { useI18n } from 'vue-i18n'
import { useRequest } from 'vue-request'
import { useSnackbarStore } from '@/stores/useSnackBarStore'
import ruleIcon from '@/assets/rule-icon.svg'
import AppChipSelect from '../core/AppChipSelect.vue'
import CampaignRuleService from '@/services/campaign-rule-service'

const props = defineProps({
  rule: {
    type: Object,
    required: false,
  },
})

const emit = defineEmits(['saved', 'update:isDialogVisible'])

const form = ref({
  roas_condition: 'BiggerThan',
  roas_comparing_value: null,
  value_type: 'Value',
  value: null,
  last_days: null,
  name: null,

})

const { t } = useI18n()
const { show } = useSnackbarStore()

const handleClose = () => emit('update:isDialogVisible', false)

// Initialize form with prop data if provided
if (props.rule) {
  form.value = { ...props.rule }
}

// Computed properties for conditional rendering
const isValueTypeEqualValue = computed(() => form.value.value_type === 'Value' || form.value.value_type == null)

const isFormValid = computed(() => {
  return (
    form.value.roas_condition &&
    form.value.roas_comparing_value != null &&
    form.value.value_type &&
    ((form.value.value != null && form.value.value != '') && !isValueTypeStopCampaign) &&
    form.value.last_days != null
  )
})

const isBiggerThanCondition = computed(() => form.value.roas_condition === 'BiggerThan')
const isLessThanCondition = computed(() => form.value.roas_condition === 'LessThan')
const isValueTypeStopCampaign = computed(() => form.value.value_type === 'StopCampaign')

const computedLabel = computed(() => {
  if (isLessThanCondition.value) {
    return form.value.value_type === 'Value' ? 'rule_decrease_by_value' : 'rule_decrease_by_percentage'
  }
  return isValueTypeEqualValue.value ? 'increase_your_budget_by' : 'rule_increase_by_percentage'
})

const computedPlaceholder = computed(() => {
  return isValueTypeEqualValue.value ? 'enter_value' : 'enter_percentage'
})

// Define a function for submission based on presence of props.rule
const submit = () => {
  const submitData = {
    ...form.value,
    id: props.rule?.id,
  }

  const action = props.rule ? runUpdate : create
  action(submitData)
}

const { run: create, loading: startLoading } = useRequest(
  data => CampaignRuleService.run(data),
  {
    manual: true,
    onSuccess: res => {
      const { error, messages } = res.data
      show(t(error ? messages[0] : 'the_control_base_has_been_created'), error ? 'error' : 'success')
      if (!error) emit('update:isDialogVisible', false)
      emit('saved', !error)
    },
  },
)

const { run: runUpdate, loading: loadingRunUpdate } = useRequest(
  data => CampaignRuleService.update(data),
  {
    manual: true,
    onSuccess: response => {
      const { error, messages } = response.data
      show(t(error ? messages[0] : 'campaign_rule_updated_successfully'), error ? 'error' : 'success')
      if (!error) emit('update:isDialogVisible', false)
      emit('saved', !error)
    },
  }
)

// Watch for changes in props.rule to update the form
watch(
  () => props.rule,
  newRule => {
    if (newRule) Object.assign(form.value, newRule)
  },
  { immediate: true }
)
</script>

<template>
  <v-card class="connect-platform px-6 rounded-xl" min-width="40vw">
    <v-card-title class="d-flex justify-space-between align-center px-0">
      <div class="text-h5 text-medium-emphasis text-tajawal">
        <div class="d-flex align-center ga-2">
          <v-img :src="ruleIcon" width="40" />
          <p class="dark-1 font-weight-bold">{{ t("control_rule") }}</p>
        </div>
      </div>
      <v-btn icon="mdi-close" variant="text" @click="handleClose" />
    </v-card-title>

    <v-divider class="mb-4" />
    <div class="camp-rule-text pa-4">
      <p>{{ t("camaign_rule_modal_text") }}</p>
    </div>

    <v-container class="mt-4">
      <v-row>
        <v-col cols="12">
          <AppTextInput v-model="form.name" :label="t('name')" :placeholder="t('name')" />
        </v-col>

        <v-col cols="12" sm="6">
          <AppChipSelect v-model="form.roas_condition" :items="[
            { id: 'BiggerThan', title: t('greater_than') },
            { id: 'LessThan', title: t('less_than') }
          ]" :label="t('if_the_return_on_spending')" />
        </v-col>

        <v-col cols="12" sm="6">
          <AppTextInput type="number" v-model="form.roas_comparing_value" :append-text="t('SAR')"
            :label="t('the_value_of_return_on_spending')" :placeholder="t('enter_value')" />
        </v-col>

        <v-col cols="12" sm="12">
          <AppTextInput type="number" v-model="form.last_days" :append-text="t('day')" :label="t('at_end')"
            :placeholder="t('num_of_days')" />
        </v-col>

        <v-col cols="12" sm="6" v-if="isBiggerThanCondition">
          <AppChipSelect v-model="form.value_type" :items="[
            { id: 'Value', title: t('monetary_value') },
            { id: 'Percentage', title: t('percentage') }
          ]" :label="t('increase_the_value_select_the_type_of_increase')" />
        </v-col>

        <v-col cols="12" sm="12" v-if="isLessThanCondition">
          <AppChipSelect v-model="form.value_type" :items="[
            { id: 'Value', title: t('monetary_value') },
            { id: 'Percentage', title: t('percentage') },
            { id: 'StopCampaign', title: t('stopCampaign') }
          ]" :label="t('reduce_the_value_Select_the_type_of_reduction')" />
        </v-col>

        <v-col cols="12" :sm="isBiggerThanCondition ? 6 : 12" v-if="isBiggerThanCondition || !isValueTypeStopCampaign">
          <AppTextInput type="number" v-model="form.value" :append-text="isValueTypeEqualValue ? t('SAR') : '%'"
            :label="t(computedLabel)" :placeholder="t(computedPlaceholder)" />
        </v-col>
        <v-col cols="12" sm="12" class="mx-4" v-if="form.value_type == 'StopCampaign'">
          <ul>
            <li> {{ t('stop_campaign_msg') }}</li>
          </ul>
        </v-col>

      </v-row>
    </v-container>
    <v-divider class="mt-2" />

    <v-card-actions class="my-2 d-flex justify-end">
      <v-btn rounded="xl" :text="t('cancel')" @click="handleClose" />
      <v-btn append-icon="mdi-check" color="success" :disabled="!isFormValid"
        :loading="startLoading || loadingRunUpdate" rounded="xl" :text="t('save')" @click="submit" />
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
