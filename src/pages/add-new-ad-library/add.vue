<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'

  import adLibHeaderLogo from '@/assets/images/ad-lib-header.svg'
  import AdLibraryForm from '@/components/ad-library/AdLibraryForm.vue'

  const { update } = useBreadcrumbsStore()
  const { t, locale } = useI18n()

  watch(
    locale,
    () => {
      update([
        {
          title: t('campaigns'),
          active: false,
          to: '/campaigns/',
        },
        {
          title: t('add_campaign'),
          active: true,
          disabled: true,
          to: `/campaigns/add`,
        },
      ])
    },
    { immediate: true }
  )
</script>
<template>
  <div>
    <v-container class="wrapper-container mx-0 ">
      <v-row>
        <VCol cols="12">
          <header class="campaign-form-header">
            <img alt="" :src="adLibHeaderLogo">
            <div class="deascription">
              <h3 class="text-black">
                {{ t("add_new_ad") }}
              </h3>
              <p>{{ t("add_new_ad_slogan") }}</p>
            </div>
          </header>
          <v-divider class="mb-4 mt-6" />
        </VCol>
        <VCol class="pb-0 px-8" cols="7">
          <div class="campaign-form-container">

            <TitleBadge :title="$t('ad')" />

            <AdLibraryForm />

          </div>
        </VCol>
        <VCol class="pb-0 border-s px-8" cols="5">
          <div class="campaign-form-container">

            <ShareUrl />
          </div>
        </VCol>

        <div class="px-4 w-100">
          <VCol class="mt-8 mb-2 border-t  d-flex justify-end ga-2" cols="12">
            <VBtn class="return-btn px-6" elevation="0">
              {{ $t('return') }}
            </VBtn>

            <VBtn color="orange" type="submit">
              {{ $t('add_ad') }}
              <v-icon class="mx-2">mdi-arrow-left</v-icon>
            </VBtn>
          </VCol>
        </div>

      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
.wrapper-container {
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  min-width: 100%
}

.campaign-form-header {
  display: flex;
  gap: 1rem;

  img {
    margin-inline: 1rem;
  }

  h3 {
    font-weight: 700;
    font-size: 1.25rem;
  }

  p {
    font-weight: 400;
    color: rgb(var(--v-dark-1));
    font-size: 0.875rem;
  }
}

button[type="submit"] {
  color: #FFF !important;
  border-radius: 40px;
  height: 50px !important;

  font-size: 16px;
  font-weight: 700;
  line-height: 19.2px;
  display: flex;
  gap: 20px !important
}

.return-btn {
  border-radius: 40px;
  height: 50px !important;
}
</style>
