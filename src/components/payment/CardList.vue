<script setup>
  import { useI18n } from 'vue-i18n'
  import { defineProps } from 'vue'

  const { t } = useI18n()

  defineProps({
    cards: Array,
  })

</script>

<template>
  <div class="rounded-lg bg-white pa-4">
    <div class="header-container">
      <span class="cards-text"> {{ t("my_cards") }} </span>
      <v-btn color="warning" rounded>
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
