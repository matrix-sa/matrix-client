<script setup>
  import adsLogo from '@/assets/Ads-library-1.svg'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import AdLibFilterModal from '../dialogs/AdLibFilterModal.vue'

  const { t } = useI18n()

  const router = useRouter()
  const handleAddAd = () => {
    console.log('Add Ad')
    router.push(`/ads-library/add`)
  }

  const openFilterDialog = ref(false)

  const filterModalHandler = () => {
    openFilterDialog.value = true
  }

</script>

<template>
  <v-container class="rounded-xl bg-white main-container">
    <v-dialog v-model="openFilterDialog" content-class="v-dialog--custom">
      <AdLibFilterModal v-model:is-dialog-visible="openFilterDialog" />
    </v-dialog>
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex align-center mb-5">
        <img alt="ads Logo" :src="adsLogo">
        <div class="mx-3">
          <p class="title">{{ t('ads_library.name') }}</p>
          <p class="sub_title">{{ t('ads_library.header_text') }}</p>
        </div>
      </div>
      <v-btn color="warning" rounded @click="handleAddAd">
        <v-icon icon="tabler-circle-plus-filled" />
        {{ t("ads_library.add_ad") }}
      </v-btn>
    </div>
    <hr>
    <!--  Filter links  -->
    <div class="d-flex justify-space-between mb-4">
      <div class="d-flex ga-2 ">
        <v-btn color="#F8F7FA" rounded @click="filterModalHandler">
          <v-icon icon="meteor-icons:bars-filter " />
          <p>{{ t("ads_library.filter") }}11</p>
        </v-btn>
        <v-btn color="#C4ECFD" rounded>
          <v-icon icon="bitcoin-icons:node-0-connections-filled " />
          <p>{{ t("ads_library.group") }}</p>
        </v-btn>
        <v-btn color="#FDE1C4" rounded>
          <v-icon icon="solar:sort-from-bottom-to-top-linear" />
          <p>{{ t("ads_library.sort") }}</p>
        </v-btn>
        <v-btn color="#F0C4FD" rounded>
          <v-icon icon="bx:hide " />
          <p>{{ t("ads_library.control") }}</p>
        </v-btn>
      </div>
      <div class="d-flex ga-2 ">
        <v-btn color="#24C87E" rounded>
          <p class="text-white">{{ t("save") }}</p>
        </v-btn>
        <v-btn color="#F8F7FA" rounded>
          <v-icon icon="heroicons-outline:table" />
          <p>{{ t("ads_library.display_windows") }}</p>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<style lang='scss'>
.v-dialog {
  .v-dialog--custom {
    width: 50% !important
  }

  hr {
    border: 0 !important;
    background-color: transparent !important;
    border-bottom: 1px solid #1F16251A !important;
    margin-bottom: 24px;
    margin-top: 16px;
  }
}

.main-container {

  .title {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 8px;
  }

  .sub_title {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
  }

  hr {
    border: 1px solid #1F16251A;
    margin-bottom: 24px;
    margin-top: 16px;
  }

  p {
    font-size: 11px;
    font-weight: 500;
    line-height: 13.2px;
  }
}
</style>
