<script setup>
import { useI18n } from 'vue-i18n'
import { useRequest } from 'vue-request'
import { useSnackbarStore } from '@/stores/useSnackBarStore'
import PaymentService from '@/services/payment-service'

defineProps({
  headers: {
    type: Array,
    required: true
  }
})



const emit = defineEmits(['saved', 'update:isDialogVisible', 'refetch-transactions', 'emitToggleVisibility'])

const form = ref({
  credit_card_id: null,
  wallet_recharge_amount: null,

})

const paymentMethods = ref([])

const { t } = useI18n()
const { show } = useSnackbarStore()

const toggleColumn = index => {
  emit('emitToggleVisibility', index)
}
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
  <v-card class="column-control px-6 rounded-xl" min-width="40vw" rounded="lg">
    <v-card-title class="d-flex pb-1 py-4 justify-space-between align-center px-0">
      <div class="py-4 px-6 ga-2 mt-4  align-center w-100 d-flex filter-title">
        <v-icon icon="bx:hide " />


        <span>{{ $t("ads_library.control") }}</span>
      </div>
    </v-card-title>


    <v-divider />

    <v-card-text>
      <div class="d-flex flex-column ga-3">
        <div class="columns-parent" v-for="(head, index) in headers" :key="index">
          <div v-if="index != 0" class="columns-item d-flex justify-space-between align-center">
            <span>{{ head.title }}</span>
            <v-btn class="show-btn" width="24" :color="head.visible ? '#24C87E' : '#F54A41'"
              @click="toggleColumn(index)">

              <v-icon icon="mdi:eye-outline " size="20" color="#FFF" v-if="head.visible" />
              <v-icon icon="mdi:eye-off-outline " size="20" color="#FFF" v-else />
            </v-btn>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="scss">
.v-col-sm-6 {
  padding: 0 8px;
}


.column-control {

  .filter-title {
    background-color: #f0c4fd;
    border-radius: 12px;

    span {
      font-size: 18px
    }
  }

  .w-50px {
    width: 50px;
    display: flex;
    justify-content: flex-end
  }

  .filter-text {
    font-size: 16px;
    font-weight: 500;
    line-height: 16.8px;

  }

  .v-divider {
    opacity: 1;
  }

  .flex-2,
  .app-select.flex-2 {
    flex: 2 !important
  }

  .app-text-field,
  .app-select {
    flex: 3 !important;
    margin-top: 0 !important
  }

  .delete-btn {
    background-color: transparent !important;
    box-shadow: none !important;
    border: 1px solid #1F16251A;
    min-width: 40px !important;
    min-height: 48px !important;
    border-radius: 12px
  }

  .app-text-field .v-field {
    margin-top: 0 !important
  }

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

.columns-item {
  background-color: #F8F7FA;
  padding: 12px 8px;
  font-size: 16px;
  color: #1F1625;
  font-weight: 500;
  border-radius: 12px;
  user-select: none
}

.show-btn {
  min-width: 40px !important;
  height: 40px !important;
  border-radius: 100%;
  background-color: red;
  display: flex;
  align-items: center;
  color: #FFF
}
</style>
