<script setup>
  import { useI18n } from 'vue-i18n'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import AppSelect from '../core/AppSelect.vue'
  import { useRulesModalsStore } from '@/stores/rulesModalsStore'
  import AppTextInput from '../core/AppTextInput.vue'

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

  const handleClose = () => {
    emit('update:isDialogVisible', false)
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

</script>
<template>
  <v-card class="connect-platform px-6 rounded-xl" min-width="40vw" rounded="lg">
    <v-card-title class="d-flex pb-1 py-4 justify-space-between align-center px-0">
      <div class="py-4 px-6 ga-3 mt-4  align-center w-100 d-flex filter-title">
        <v-icon icon="meteor-icons:bars-filter " />
        <span>{{ $t('ads_library.filters') }}</span>
      </div>
    </v-card-title>

    <v-divider />

    <div class="d-flex  ga-4">
      <span class="flex-2 text-tajawal filter-text mt-4">
        {{ $t('ads_library.filter') }}
      </span>
      <AppSelect
        v-model="form.credit_card_id"
        class="mt-5"
        :item-title="item => item.type"
        :item-value="item => item.id"
        :items="paymentMethods"
      />

      <AppSelect
        v-model="form.credit_card_id"
        class="mt-5"
        :item-title="item => item.type"
        :item-value="item => item.id"
        :items="paymentMethods"
      />

      <AppTextInput
        v-model="form.wallet_recharge_amount"
        class="mt-5"
        min="0"
        :placeholder="t('enter_value')"
        type="number"
        @keydown="handleWalletRechargeAmountKeydown"
      />

      <div class="w-50px">
        <VBtn class="delete-btn">
          <v-icon size="25">mdi-trash-can</v-icon>
        </VBtn>
      </div>
    </div>

    <div class="d-flex  ga-4">
      <AppSelect
        v-model="form.credit_card_id"
        class="mt-5 flex-2"
        :item-title="item => item.type"
        :item-value="item => item.id"
        :items="paymentMethods"
      />
      <AppSelect
        v-model="form.credit_card_id"
        class="mt-5"
        :item-title="item => item.type"
        :item-value="item => item.id"
        :items="paymentMethods"
      />

      <AppSelect
        v-model="form.credit_card_id"
        class="mt-5"
        :item-title="item => item.type"
        :item-value="item => item.id"
        :items="paymentMethods"
      />

      <AppTextInput
        v-model="form.wallet_recharge_amount"
        class="mt-5"
        min="0"
        :placeholder="t('enter_value')"
        type="number"
        @keydown="handleWalletRechargeAmountKeydown"
      />

      <div class="w-50px">
        <VBtn class="delete-btn">
          <v-icon size="25">mdi-trash-can</v-icon>
        </VBtn>
      </div>
    </div>

    <div class="d-flex  ga-4">
      <AppSelect
        v-model="form.credit_card_id"
        class="mt-5 flex-2"
        :item-title="item => item.type"
        :item-value="item => item.id"
        :items="paymentMethods"
      />
      <AppSelect
        v-model="form.credit_card_id"
        class="mt-5"
        :item-title="item => item.type"
        :item-value="item => item.id"
        :items="paymentMethods"
      />

      <AppSelect
        v-model="form.credit_card_id"
        class="mt-5"
        :item-title="item => item.type"
        :item-value="item => item.id"
        :items="paymentMethods"
      />

      <AppTextInput
        v-model="form.wallet_recharge_amount"
        class="mt-5"
        min="0"
        :placeholder="t('enter_value')"
        type="number"
        @keydown="handleWalletRechargeAmountKeydown"
      />

      <div class="w-50px">
        <VBtn class="delete-btn">
          <v-icon size="25">mdi-trash-can</v-icon>
        </VBtn>
      </div>
    </div>

  </v-card>
</template>

<style lang="scss">
.v-col-sm-6 {
  padding: 0 8px;
}

/* .v-dialog .v-card {
  transform: translateY(20%) translateX(14%) !important;
  position: relative;
  overflow: visible !important;
}

.v-dialog .v-card::after {
  content: '';
  position: absolute;
  top: -18px;
  z-index: 20;
  border: 10px solid #FFF;
  border-top-color: transparent;
  border-right-color: transparent;
  border-left-color: transparent;
  right: 3%;
} */

.connect-platform {

  .filter-title {
    background-color: #F8F7FA;
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
</style>
