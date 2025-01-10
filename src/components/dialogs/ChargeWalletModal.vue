<script setup>
  import { requiredValidator } from '@/utilities/validators'
  import { useI18n } from 'vue-i18n'
  import { useRequest } from 'vue-request'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import connectionRuleIcon from '@/assets/doc.svg'
  import AppSelect from '../core/AppSelect.vue'
  import { useRulesModalsStore } from '@/stores/rulesModalsStore'
  import AppTextInput from '../core/AppTextInput.vue'
  import PaymentService from '@/services/payment-service'

  const props = defineProps({
    rule: {
      type: Object,
      required: false,
    },
  })

  const emit = defineEmits(['saved', 'update:isDialogVisible', 'refetch-transactions'])

  const form = ref({
    credit_card_id: null,
    wallet_recharge_amount: null,

  })

  const paymentMethods = ref([])

  const { t } = useI18n()
  const { show } = useSnackbarStore()
  const rulesModalsStore = useRulesModalsStore()

  const handleClose = () => {
    emit('update:isDialogVisible', false)
  }
  const handleWalletRechargeAmountInput = event => {
    const value = event.target.value
    if (value < 0) {
      event.preventDefault()
      form.value.wallet_recharge_amount = ''
    } else {
      form.value.wallet_recharge_amount = value
    }
  }

  const handleWalletRechargeAmountKeydown = event => {
    // Allow only numeric keys, backspace, delete, and arrow keys
    const allowedKeys = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'Backspace', 'Delete',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Tab',
    ]

    // Prevent if the key is not allowed
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault()
    }
  }

  const submit = () => {
    chargeWallet(form.value)
  }

  const { run, loading: loadData } = useRequest(
    () => PaymentService.getCreditCards(),
    {

      onSuccess: res => {
        const { data, error, messages } = res.data
        if (error) {
          show(messages[0], 'error')
          return
        }
        paymentMethods.value = data.map(item => ({ ...item, title: item.name }))
      },
      onError: err => {
        console.error(err)
      },
    }
  )

  const { run: chargeWallet, loading: startLoading } = useRequest(
    data => PaymentService.chargeWallet(data),
    {
      manual: true,
      onSuccess: res => {
        const { error, data, messages, code } = res.data

        if (error) {
          show(messages[0], 'error')
        }

        show(t('charge_success'), 'success')

        emit('refetch-transactions')
        emit('update:isDialogVisible', false)
      },
    }
  )

  const isFormValid = computed(() => {
    return (
      !!form.value.credit_card_id &&
      !!form.value.wallet_recharge_amount &&
      form.value.wallet_recharge_amount > 0

    )
  })

</script>
<template>
  <v-card class="connect-platform px-6 rounded-xl" min-width="40vw" rounded="lg">
    <v-card-title class="d-flex justify-space-between align-center px-0">
      <div class="text-h5 text-medium-emphasis text-tajawal">
        <div class="d-flex align-center ga-2">
          <v-img aspect-ratio="1/1" :src="connectionRuleIcon" width="30" />
          <p>
            <span class="dark-1 font-weight-bold">
              {{ t("charge_amount") }}
            </span>
          </p>
        </div>
      </div>
      <v-btn class="close-btn" icon="mdi-close" variant="text" @click="handleClose" />
    </v-card-title>

    <v-divider class="mb-4" />

    <v-container>
      <v-row>
        <v-col class="pb-0" cols="12">
          <AppSelect
            v-model="form.credit_card_id"
            :item-title="item => item.type"
            :item-value="item => item.id"
            :items="paymentMethods"
            :label="t('payment_method')"
            :placeholder="t('funding_instrument')"
          />
        </v-col>

        <v-col class="pt-0" cols="12">

          <AppTextInput
            v-model="form.wallet_recharge_amount"
            :label="t('specify_the_value')"
            min="0"
            :placeholder="t('enter_value')"
            type="number"
            @input="handleWalletRechargeAmountInput"
            @keydown="handleWalletRechargeAmountKeydown"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-divider class="mt-2" />

    <v-card-actions class="my-2 d-flex justify-end">
      <v-btn class="text-none" rounded="xl" :text="t('cancel')" @click="handleClose" />

      <v-btn
        append-icon="mdi-check"
        class="text-none save-btn"
        color="success"
        :disabled="!isFormValid"
        :loading="startLoading"
        rounded="xl"
        :text="t('save')"
        variant="flat"
        :width="120"
        @click="submit"
      />
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
}
</style>
