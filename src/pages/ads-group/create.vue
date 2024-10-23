<script setup>
//import AdsGroupForm from '@/components/AdsGroupForm.vue'
import i18n from '@/i18n';
import { useRoute } from 'vue-router'
import AdsGroupGoogleForm from '@/components/forms/campaigns/AdsGroupGoogleForm.vue';
const route = useRoute()
const { t } = i18n.global
</script>

<template>
  <VCard variant="outlined">
    <!-- SECTION Header -->
    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row">
      <div class="mt-1">
        <h6 class="font-weight-medium text-h4">
          {{ $t('create_ad_group_title') }}
        </h6>
      </div>
    </VCardText>
    <VCardText>
      <VRow>
        <VCol v-if="route.query.platform == 'GoogleAds'" cols="12">
          <AdsGroupGoogleForm :campaign-id="route.query.campaignId" :platform="route.query.platform" />
        </VCol>
        <VCol v-else cols="12">
          <AdsGroupForm :campaign-id="route.query.campaignId" :platform="route.query.platform" />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>


<style lang="scss">
.custom-loader {
  display: flex;
  animation: loader 1s infinite;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
