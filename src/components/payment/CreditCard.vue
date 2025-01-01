<script setup>
  import { defineProps } from 'vue'
  import visaLogo from '@/assets/visaLogo.svg'
  import masterLogo from '@/assets/mastercardLogo.svg'
  import cardMaster from '@/assets/Card1.svg'
  import cardVisa from '@/assets/Card2.svg'
  const props = defineProps({
    cardType: {
      type: String,
      default: 'visa',
    },
    cardCategory: {
      type: String,
      default: 'Work Card',
    },
    cardNumber: {
      type: String,
      required: true,
    },
    cardHolderName: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: String,
      required: true,
    },
  })

  const maskedCardNumber = [props.cardNumber.slice(-4), '••••', '••••', '••••']
</script>

<template>
  <div>

    <v-card
      class="credit-card"
      flat
      :style="{ backgroundImage: cardType === 'master'? `url(${cardMaster})`: `url(${cardVisa})`
      }"
    >
      <v-card-text>
        <div class="card-header">
          <img alt="visa-logo" :src="cardType === 'master'? masterLogo : visaLogo">

          <span class="card-type">{{ cardCategory }}</span>
        </div>

        <div class="card-number">
          <span v-for="(part, index) in maskedCardNumber" :key="index">{{ part+' ' }} </span>
        </div>

        <div class="card-footer">
          <span>{{ expirationDate }}</span>
          <span>{{ cardHolderName }}</span>
        </div>
      </v-card-text>
    </v-card>
  </div>

</template>
<style scoped lang='scss'>

.credit-card {
  max-width: 260px;
  width: 100%;
  height: 158px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding:  18.5px 13px;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-position: center  ;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 auto;
  .v-card-text {
    padding: 0;
  }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  line-height: 14.06px;
  font-weight: 500;
}

.card-number {
  font-size: 18px;
  margin-top: 47px;
  margin-bottom: 20px;
  letter-spacing: 2px;
  text-align: left;
  line-height: 21.09px
}

.card-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 14.06px;
}

}

</style>
