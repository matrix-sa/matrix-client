<script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const props = defineProps({
    showAddCardPopup: Boolean,
  })

  const form = ref({
    cardHolderName: '',
    cardNumber: '',
    cvc: '',
    expiryMonth: '',
    expiryYear: '',
    cardType: '',
    isDefault: 'false',
  })

  const cardTypes = ref(['Visa', 'MasterCard',
  ])

  const isFormValid = computed(() => {
    return (
      !!form.value.cardHolderName &&
      !!form.value.cardNumber &&
      !!form.value.cvc &&
      !!form.value.expiryMonth &&
      !!form.value.expiryYear &&
      !!form.value.cardType

    )
  })

  const showPopup = ref(props.showAddCardPopup)

  watch(() => props.showAddCardPopup, newVal => {
    showPopup.value = newVal
  })

  const emit = defineEmits(['close', 'save'])

  const handleClose = () => {
    emit('close')
  }

  const handleSave = () => {
    emit('save', form.value)
    handleClose()
  }

</script>

<template>
  <v-dialog v-model="showPopup" max-width="600px" persistent @click:outside="handleClose">
    <v-card class="pa-4 rounded-xl">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <v-icon size="22px">tabler-credit-card</v-icon>
          <span class="card-title mx-2">أضف بطاقة</span>
        </div>
        <v-btn icon="mdi-close" @click="handleClose" />
      </v-card-title>

      <v-divider />

      <v-container>
        <v-row>
          <v-col cols="12">
            <AppTextInput
              v-model="form.cardHolderName"
              label="اسم حامل البطاقة"
              placeholder="أدخل الاسم"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <AppTextInput
              v-model="form.cardNumber"
              label="رقم البطاقة"
              placeholder="أدخل الرقم"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <AppSelect
              v-model="form.cardType"
              class="ma-2"
              :items="cardTypes"
              :label="'نوع البطاقة'"
              :placeholder="'نوع البطاقة'"
            />
          </v-col>

          <v-col cols="3">
            <AppTextInput
              v-model="form.expiryMonth"
              label="شهر"
              placeholder="MM"
              type="number"
            />
          </v-col>

          <v-col cols="3">
            <AppTextInput
              v-model="form.expiryYear"
              label="سنة"
              placeholder="YYYY"
              type="number"
            />
          </v-col>
          <v-col cols="6">
            <AppTextInput
              v-model="form.cvc"
              label="CVC"
              placeholder="أدخل الرمز"
              type="number"
            />
          </v-col>

          <v-col cols="12">
            <v-switch
              v-model="form.isDefault"
              color="warning"
              :label="'تحديد كمفضلة عند الدفع'"
            />
          </v-col>
        </v-row>
      </v-container>

      <v-divider class="mt-2 mb-4" />

      <v-card-actions class="d-flex justify-end">
        <v-btn class="text-none" rounded="xl" :text="t('cancel')" @click="handleClose" />
        <v-btn
          append-icon="mdi-check"
          class="text-none save-btn"
          color="success"
          :disabled="!isFormValid"
          rounded="xl"
          :text="t('save')"
          variant="flat"
          :width="120"
          @click="handleSave"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang='scss'>

.card-title{
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;

}

:deep(.v-col) {
    padding-top: 0px;
    padding-bottom: 0px;
}

</style>
