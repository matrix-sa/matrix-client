<script setup>
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import { useRequest } from 'vue-request'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import CreditCardService from '@/services/credit-card-service'

  const { show } = useSnackbarStore()
  const { t } = useI18n()
  const route = useRoute()

  const cards = ref([])

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

  // Get Credit Cards
  const { run: GetCreditCards } = useRequest(
    () => CreditCardService.GetCreditCards(),
    {
      onSuccess: res => {
        const { error, messages, data } = res.data
        if (error) {
          show(messages[0], 'error')
        } else {
          cards.value = data
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
    AddCreditCard(newCard)
  }

  // Watch for changes in the route's query parameters
  watch(
    () => route.query,
    newQuery => {
      const { message, isSuccessful } = newQuery
      if (message) {
        if (isSuccessful.toLocaleLowerCase() === 'true') {
          show(message, 'success')
        } else if (isSuccessful.toLocaleLowerCase() === 'false') {
          show(message, 'error')
        }
      }
    },
    { immediate: true }
  )

  // Get Credit Cards on component mount
  onMounted(() => {
    GetCreditCards()
  })
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
            :card-category="card.name"
            :card-holder-name="card.card_holder_name"
            :card-number="card.card_number"
            :card-type="card.type"
            :expiration-date="card.expiry_date"
            :theme="card.theme"
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
