<script setup>
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'

  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  // Watch locale for breadcrumbs update
  watch(
    locale,
    () => {
      update([
        {
          title: t('checkout'),
          active: false,
          to: '/checkout',
        },
      ])
    },
    { immediate: true }
  )

</script>

<template>
  <div class="d-flex flex-column writer-wrapper">

    <CheckoutHeader />
    <hr class="separator">
    <v-container class="pt-2 px-0 mx-0 main-container">
      <v-row>
        <v-col cols="7">
          <OrderSummary />
        </v-col>
        <v-col cols="5">
          <PaymentMethod />
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<style lang="scss" scoped>
$borderColor: rgba(31, 22, 37, 0.1);

.writer-wrapper {
    gap: 16px;
    background-color: #fff;
    padding: 24px;
    border-radius: 16px;

    .separator {
        border-color: $borderColor;
    }
}

.main-container{
    min-width: 100%;
}
</style>
