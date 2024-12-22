<script setup>
  import ChatbotLogo from '@/assets/digital-writer/digital.svg'
  import CalendarIcon from '@/assets/images/icons/calendar.svg'

  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
</script>
<template>
  <div class="mt-4 order-stats-container">
    <div class="d-flex align-center justify-space-between">
      <div>
        <div class="d-flex align-center ga-3">
          <div class="icon-container d-flex justify-center align-center">
            <img alt="chatbot" :src="ChatbotLogo">
          </div>
          <div>
            <span class="title">{{ t('digital_writer') }}</span>
            <div class="mt-1">
              <span class="ref-text">{{ t('ref_num') }}</span>:
              <span class="ref-num">5628</span>
            </div>
          </div>
        </div>
      </div>
      <div class="first-price">750 {{ t('sar') }}</div>

    </div>
    <div class="mt-4 date-container ga-4 d-flex justify-space-between">
      <div class="d-flex align-center justify-space-between flex-1">
        <div class="d-flex ga-1">
          <img alt="chatbot" :src="CalendarIcon">
          <span class="start-date">{{ t('start_date') }} :</span>
        </div>
        <div class="date">10.25.2024</div>
      </div>
      <span>|</span>
      <div class="flex-1 d-flex align-center justify-space-between">
        <div class="d-flex ga-1">
          <img alt="chatbot" :src="CalendarIcon">
          <span class="start-date">{{ t('end_date') }} :</span>
        </div>
        <div class="date">10.25.2024</div>
      </div>
    </div>
    <hr class="separator mt-4">
    <div class="mt-4">
      <AppChipSelect
        :have-discount="true"
        :items="[
          { id: 'month', title: t('last-month') , haveDiscount: false},
          { id: 'month2', title: t('last-month') , haveDiscount: false},
          { id: 'month3', title: t('last-month'), haveDiscount: false },
          { id: 'month4', title: t('last-month') , haveDiscount: true}
        ]"
        :label="t('select_the_subscription_duration')"
      >
        <template #text>
          <span>%25</span>
        </template>
      </AppChipSelect>
    </div>

    <div class="desc-box mt-4">
      <span class="desc-box-title"> {{ t('service_desc') }}</span>
      <p class="service-desc">هذا نص يوضح ما سيقدمه الكاتب الرقمي للمستخدم عند الشراء.</p>
    </div>
    <hr class="separator mt-4">

    <div class="total-box mt-4 d-flex flex-column">
      <ul class="ms-7 d-flex flex-column ga-2">
        <li>
          <div class="d-flex justify-space-between align-center">
            <span>{{ t('digital_Writer_subscription') }}</span>
            <span class="second-price">750 {{ t('sar') }}</span>
          </div>
        </li>
        <li>
          <div class="d-flex justify-space-between align-center">
            <span>{{ t('digital_Writer_subscription') }}</span>
            <span class="second-price">750 {{ t('sar') }}</span>
          </div>
        </li>
      </ul>

      <hr class="separator mt-2">

      <div class="d-flex mt-2">
        <div class="d-flex align-center  justify-space-between w-100">

          <div class="d-flex align-center">
            <div>
              <AppCheckBox color="orange" />
            </div>
            <div class="d-flex flex-column ga-1">
              <span class="wallet-balance">
                {{ t('wallet_balance' , {balance: 100 , currency: t('sar')}) }}
              </span>
              <span class="wallet-balance-note">{{ t('wallet_balance_note') }}</span>
            </div>
          </div>
          <div>
            <span class="wallet-after-use">100-</span>
          </div>
        </div>
      </div>
      <hr class="separator mt-2">
      <div class="d-flex mt-1">
        <ul class="ms-7 w-100 d-flex flex-column ga-2 total-list">
          <li>
            <div class="d-flex justify-space-between align-center">
              <span class="total-price-title">{{ t('total-sum') }}</span>
              <span class="total-price">750 {{ t('sar') }}</span>
            </div>
          </li></ul>
      </div>
    </div>
  </div>
</template>

<style  lang="scss">
$blackColor: #000000;

.order-stats-container {
  .flex-1 {
    flex: 1;
  }

  .icon-container {
    background-color: #f4f4f4;
    width: 64px;
    height: 64px;
    border-radius: 16px;
  }

  .title {
    font-size: 18px;
    font-weight: 500;
    line-height: 21.6px;
    color: rgb(var(--v-dark-2));
  }

  .ref-text {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    color: #706d79;
  }

  .ref-num {
    color: rgb(var(--v-dark-2));
    font-weight: 500;
  }

  .first-price {
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
    color: rgb(var(--v-dark-2));
  }

  .date-container {
    .start-date {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: $blackColor;
    }

    .date {
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      color: $blackColor;
    }
  }

  .app-chip-select .v-chip {
    border-radius: 100px !important;
  }

  .desc-box {
    background-color: #f4f4f4;

padding: 16px ;
gap: 8px;
border-radius: 16px ;

&-title{
    color: #706D79 !important;
    font-size: 14px;
}
.service-desc{
font-size: 16px;
font-weight: 400;
line-height: 20px;
color: #000;
margin-top: 8px;

}

  }

  .separator {
    border-color: #DDDDDD;
    border-top: 0;
    border-width: 1px;
}

.total-box{
    background-color: #f4f4f4;

padding: 16px ;
gap: 8px;
border-radius: 16px ;

.second-price{
font-size: 14px;
font-weight: 400;
line-height: 20px;
color: #000;

}

ul li{
    color: rgb(var(--v-theme-primary)) ;

    span:nth-child(1){
        color: rgb(var(--v-dark-2)) !important;

    }
}

.wallet-balance{
font-size: 14px;
font-weight: 500;
line-height: 20px;
color: #000

}

.wallet-balance-note{
font-size: 12px;
font-weight: 400;
line-height: 20px;

}
.wallet-after-use{
    color: rgb(var(--v-theme-primary));
font-size: 14px;
font-weight: 400;
line-height: 20px;

}

.total-list{
    .total-price-title,.total-price{
    color: #000 !important;
font-size: 14px;
font-weight: 700;
line-height: 20px;

}

}
}

}

</style>
