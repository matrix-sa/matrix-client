<script setup>
import { requiredValidator } from '@/utilities/validators'
import { useI18n } from 'vue-i18n'
import { useRequest } from 'vue-request'
import { useSnackbarStore } from '@/stores/useSnackBarStore'
import AppChipSelect from '../core/AppChipSelect.vue'
import connectionRuleIcon from '@/assets/doc.svg'
import AppSelect from '../core/AppSelect.vue'
import AppCheckBox from '../core/AppCheckBox.vue'

import whatsApp from '@/assets/whats.svg'
import sms from '@/assets/email.svg'
import thread from '@/assets/thread.svg'
import ConnectionRuleService from '@/services/connection-rule-service'

const props = defineProps({})

const emit = defineEmits(['saved', 'update:isDialogVisible'])

const form = ref({
  indicator: null,
  comparison_type: null,
  channels: {},
  target_value: null,
  days_ago: null
})



const { t } = useI18n()
const { show } = useSnackbarStore()

const handleClose = () => {
  emit('update:isDialogVisible', false)
}

const submit = () => {

  const { channels } = form.value

  const truthyKeys = Object.entries(channels)
    .filter(([key, value]) => value)
    .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));


  create({ ...form.value, channels: truthyKeys })
}

const { run: create, loading: startLoading } = useRequest(
  data => ConnectionRuleService.run(data),
  {
    manual: true,
    onSuccess: res => {
      const { error, data, messages, code } = res.data

      if (error) {
        //show(messages[0], "error")

        if (data) {
          //
        }

        return
      }

    },
  },
)

const isFormValid = computed(() => {
  const requirements = {
    indicator: () =>
      form.value.indicator,
    comparison_type: () =>
      form.value.comparison_type,
    channels: () =>
      form.value.channels,
    target_value: () => form.value.target_value,
    days_ago: () => form.value.days_ago,
    default: () => form.value.indicator,

  }

  return !!(requirements.default)()
})
</script>
<template>
  <v-card class="connect-platform px-6 rounded-xl" min-width="40vw" rounded="lg">
    <v-card-title class="d-flex justify-space-between align-center px-0">
      <div class="text-h5 text-medium-emphasis text-tajawal">
        <div class="d-flex align-center ga-2">
          <v-img aspect-ratio="1/1" :src="connectionRuleIcon" width="30" />
          <p>
            <span class="dark-1 font-weight-bold"> {{ t("connection_rule") }} </span>
          </p>
        </div>
      </div>

      <v-btn class="close-btn" icon="mdi-close" variant="text" @click="handleClose" />
    </v-card-title>

    <v-divider class="mb-4" />

    <div class="camp-rule-text pa-4">
      <p>
        {{ t('connection_rule_text') }}
      </p>
    </div>


    <v-container class="mt-4">
      <v-row>
        <v-col cols="12" sm="6">
          <AppChipSelect v-model="form.comparison_type" :items="[
            { id: 'BiggerThan', title: t('increased') },
            { id: 'LessThan', title: t('decreased') },
          ]" :label="t('in_case')" />
        </v-col>
        <v-col cols="12" sm="6">

          <AppSelect v-model="form.indicator" :items="[
            'CTR',
            'CVC'
          ]" :label="t('select_the_indicator')" placeholder="Select" />

        </v-col>

        <v-col cols="12" sm="6">
          <ApptextField v-model="form.target_value" :label="t('specify_the_value')" :placeholder="t('enter_value')" />


        </v-col>
        <v-col cols="12" sm="6">
          <ApptextField v-model="form.days_ago" :label="t('during_another')" :appendText="t('day')"
            :placeholder="t('num_of_days')" />

        </v-col>


        <span>{{ t('send_a_notification_via') }}:</span>


        <div class="d-flex align-center justify-space-between w-100">
          <AppCheckBox v-model="form.channels.whatsApp" :label="t('whatsapp')" />
          <img :src="whatsApp" class="whatsapp" />
        </div>

        <div class="d-flex align-center justify-space-between w-100">
          <AppCheckBox v-model="form.channels.sms" :label="t('sms')" />
          <img :src="sms" class="chatbot-img" />

        </div>

        <div class="d-flex align-center justify-space-between w-100">
          <AppCheckBox v-model="form.channels.email" :label="t('email')" />
          <img :src="thread" class="chatbot-img" />
        </div>







      </v-row>
    </v-container>


    <v-divider class="mt-2" />

    <v-card-actions class="my-2 d-flex justify-end">
      <v-btn class="text-none" rounded="xl" :text="t('cancel')" @click="handleClose" />

      <v-btn @click="submit" append-icon="mdi-check" class="text-none save-btn" color="success" :disabled="!isFormValid"
        :loading="startLoading" rounded="xl" :text="t('save')" variant="flat" :width="120" />
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
