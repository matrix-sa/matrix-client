<script setup>
// import AdsForm from '@/components/AdsForm.vue'
// import CreateCampaignHints from '@/components/CreateCampaignHints.vue'
import i18n from '@/i18n'
import { useSnackbarStore } from '@/stores/useSnackBarStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const { t } = i18n.global

const { show } = useSnackbarStore()
</script>

<template>
  <VCard variant="outlined">
    <!-- SECTION Header -->
    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row">
      <div class="mt-1">
        <h6 class="font-weight-medium text-h4">
          {{ $t('create_ad_title') }}
        </h6>
      </div>
    </VCardText>
    <!-- !SECTION -->
    <VCardText>
      <VRow>
        <VCol cols="8">
          <!--
            <AdsForm v-if="route.query.platform != 'GoogleAds'" :ad-group-id="route.query.groupId"
            :platform="route.query.platform" />
            -->
          <AdsGoogleForm :ad-group-id="route.query.groupId" :platform="route.query.platform" @show="show" />
        </VCol>

        <!--
          <VCol cols="4">
          <CreateCampaignHints />
        </VCol>
        -->
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
