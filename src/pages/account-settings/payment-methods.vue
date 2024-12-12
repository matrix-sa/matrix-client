<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'

  const { update } = useBreadcrumbsStore()
  const { t, locale } = useI18n()

  const cardData = [
    {
      backgroundGradient: 'linear-gradient(135deg, #ff7f50, #ff4500)',
      cardCategory: 'Work Card',
      cardHolderName: 'Muhammad Ahmed',
      cardNumber: '1234567812342578',
      cardType: 'master',
      expirationDate: '10/28',
    },
    {
      backgroundGradient: 'linear-gradient(135deg, #6a11cb, #2575fc)',
      cardCategory: 'Home Card',
      cardHolderName: 'Abd Erahman',
      cardNumber: '5678567856781234',
      cardType: 'visa',
      expirationDate: '12/29',
    },
    {
      backgroundGradient: 'linear-gradient(135deg, #ff7f50, #ff4500)',
      cardCategory: 'Work Card',
      cardHolderName: 'Muhammad Ahmed',
      cardNumber: '1234567812342578',
      cardType: 'master',
      expirationDate: '10/28',
    },
    {
      backgroundGradient: 'linear-gradient(135deg, #6a11cb, #2575fc)',
      cardCategory: 'Home Card',
      cardHolderName: 'Abd Erahman',
      cardNumber: '5678567856781234',
      cardType: 'visa',
      expirationDate: '12/29',
    },
    {
      backgroundGradient: 'linear-gradient(135deg, #ff7f50, #ff4500)',
      cardCategory: 'Work Card',
      cardHolderName: 'Muhammad Ahmed',
      cardNumber: '1234567812342578',
      cardType: 'master',
      expirationDate: '10/28',
    },
    {
      backgroundGradient: 'linear-gradient(135deg, #6a11cb, #2575fc)',
      cardCategory: 'Home Card',
      cardHolderName: 'Abd Erahman',
      cardNumber: '5678567856781234',
      cardType: 'visa',
      expirationDate: '12/29',
    },
  ]

  watch(
    locale,
    () => {
      update([
        {
          title: t('payment_method'),
          active: false,
          to: '/account-settings/payment-methods/',
        },
      ])
    },
    { immediate: true }
  )
</script>

<template>
  <CardList :cards="cardData" />
</template>
