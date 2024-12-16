<script setup>
  import { defineProps, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRequest } from 'vue-request'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import CreditCardService from '@/services/credit-card-service'

  const { show } = useSnackbarStore()
  const { t } = useI18n()

  defineProps({
    cards: Array,
  })

  const showAddCardPopup = ref(false)
  const formHTML = ref('')

  // Add Credit Card
  const { run: AddCreditCard } = useRequest(
    data => CreditCardService.AddCreditCard(data),
    {
      manual: true,
      onSuccess: res => {
        const { error, messages } = res.data
        if (error) {
          show(messages[0], 'error')
        } else {
          show(t('loading'), 'success')

          formHTML.value = res.data
          submitPaymentForm(formHTML.value)
        }
      },
    }
  )

  // Submit Payment Form
  const submitPaymentForm = htmlForm => {
    const formElement = document.createElement('div')
    formElement.innerHTML = htmlForm

    document.body.appendChild(formElement)

    const form = formElement.querySelector('form')
    if (form) {
      form.submit()
    }
  }

  // Handle Adding Card
  const handleAddCard = newCard => {
    console.log('Adding Card:', newCard)
    AddCreditCard(newCard)
  }

</script>

<template>
  <div class="rounded-lg bg-white pa-4">
    <div class="header-container">
      <span class="cards-text"> {{ t("my_cards") }} </span>
      <v-btn color="warning" rounded @click="showAddCardPopup = true">
        <v-icon icon="tabler-circle-plus-filled" />
        {{ t("add_card") }}
      </v-btn>
    </div>
    <v-container>
      <v-row>
        <v-col
          v-for="(card, index) in cards"
          :key="index"
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
          <CreditCard
            :background-gradient="card.backgroundGradient"
            :card-category="card.cardCategory"
            :card-holder-name="card.cardHolderName"
            :card-number="card.cardNumber"
            :card-type="card.cardType"
            :expiration-date="card.expirationDate"
          />
        </v-col>
      </v-row>
    </v-container>
    <PaymentDialog
      :show-add-card-popup="showAddCardPopup"
      @close="showAddCardPopup = false"
      @save="handleAddCard"
    />
  </div>
</template>

<style scoped lang="scss">
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 16px;
  line-height: 19.2px;
  font-weight: 500;
  color: #1F1625;
  border-bottom: 1px solid #1F16251A;
}
</style>
