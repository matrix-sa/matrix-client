<script setup>
  import { useI18n } from 'vue-i18n'
  import BankCard from '@/assets/images/icons/bank-card.svg'
  import MadaCard from '@/assets/images/icons/mada.svg'
  import ApplePay from '@/assets/images/checkout/apple-pay.svg'

  const { t } = useI18n()
</script>

<template>
  <div class="payment-method-container pb-10">
    <div class="text-wrapper d-flex flex-column">
      <span>{{ t("payment_method") }}</span>
    </div>

    <hr class="separator mt-4">

    <div class="mt-4">
      <span class="slogan">{{ t('payment_method_slogan') }}</span>
      <div class="mt-2">
        <AppChipSelect
          :have-discount="true"
          :items="[
            { id: 'bank_card', title: t('bank_card') , haveDiscount: false , withIcon: true, iconSrc: BankCard},
            { id: 'month2', title: t('mada_card') , haveDiscount: false, withIcon: true, iconSrc: MadaCard},

          ]"
          :label="''"
        >
          <template #icon>
            <v-icon>mdi-star</v-icon>
          </template>
          <template #text>
            <span>{{ t('Special Offer!') }}</span>
          </template>
        </AppChipSelect>
      </div>

      <div>

        <div class="mt-3">
          <v-select
            hide-details
            item-title="name"
            item-value="id"
            :items="[
              { id: 0, image: BankCard, name: 'Entry1' },
              { id: 1, image: MadaCard, name: 'Entry2' },
              { id: 2, image: BankCard, name: 'Entry3' },
            ]"
            menu-icon="tabler:caret-down-filled"
            placeholder="Select an option"
          >
            <!-- Slot for dropdown options -->
            <template #item="{ item, props }">
              <v-list-item v-bind="props">
                <template #title>
                  <span class="d-flex align-center ga-2">
                    <img alt="" class="option-image mr-2" :src="item.raw.image">
                    {{ item.title }}
                  </span>
                </template>
              </v-list-item>
            </template>

            <!-- Slot for selected option -->
            <template #selection="{ item }">
              <div v-if="item" class="d-flex align-center ga-2">
                <img alt="" class="selected-image mr-2" :src="item.raw.image">
                <span>
                  {{ item.title }}
                </span>    </div>
            </template>

          </v-select>
        </div>

        <div class="mt-2">
          <ApplyCoupon
            append-text=" "
            :placeholder="t('do_you_have_discount_code')"
            prepend-icon="tabler:ticket"
          >
            <template #appendEl>
              <VBtn class="apply-btn" color="primary" :ripple="false">
                {{ t('apply') }}
              </VBtn>
            </template>
          </ApplyCoupon>
        </div>
      </div>
      <div class="btns-container">
        <VBtn class="btn" color="black" rounded width="318">
          <div class="d-flex ga-1 ">
            {{ t("pay_with") }}
            <img :src="ApplePay">
          </div>

        </VBtn>

        <VBtn class="mt-4 btn" color="warning" rounded width="318">
          {{ t("pay") }}

        </VBtn>
      </div>

      <div class="mt-4 payment-method-desc">
        {{ t('payment_method_desc') }}
      </div>
    </div>

  </div>
</template>

<style lang="scss">
$borderColor: rgba(31, 22, 37, 0.1);

.payment-method-container{
    background-color: #F4F4F4;
    padding: 24px;
    border-radius: 16px;

    .text-wrapper {
    gap: 8px;

    span {
        font-size: 20px;
        font-weight: 700;
        color: rgb(var(--v-theme-on-code));
    }

    p {
        color: rgb(var(--v-dark-1));
    }
}

.separator {
    border-color: $borderColor;
}

.slogan{
font-size: 14px;
font-weight: 500;
line-height: 16.8px;
color: rgb(var(--v-dark-2));

}

.app-chip-select .v-chip {
    border-radius: 100px !important;
  }

  .v-chip-selected img{
    filter: brightness(0) invert(1);

  }

  .btns-container{
    button{
      height: 48px;
      font-size: 16px;
      font-weight: 500;
      box-shadow: none !important;
      width: 100% !important;
    }
  }

  .payment-method-desc{
font-size: 16px;
font-weight: 400;
line-height: 20px;
color: rgb(var(--v-theme-surface-variant));

  }

  .apply-btn{
    border-radius: 100px !important;
font-size: 12px;
font-weight: 500;
line-height: 14.4px;

  }

  .option-image,
.selected-image {
  width: 24px;
  height: 24px;
  object-fit: cover;
}

.v-field--variant-filled .v-field__overlay{
    background-color: #FFF !important;
    opacity: 1 !important;
    border: 0 !important;
    border-radius: 100px !important;
}

.v-field__append-inner svg{
    color: rgb(var(--v-dark-1));
    transform: scale(0.8);
}

.v-input__control *:not(.v-field__overlay){
    border: 0 !important;
    box-shadow: none !important;
    position: relative !important;
}

.v-field__outline{
    --v-field-border-width: 0px !important;
}

.v-label.v-field-label{
    display: none !important;
}

.v-chip--density-default{
    height: 55px !important;
}
}
</style>
