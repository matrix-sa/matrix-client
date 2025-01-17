<script setup>
  import ShareLogo from '@/assets/images/share-img.svg'

</script>

<template>
  <v-card class="share-card" elevation="0">
    <TitleBadge :title="$t('share_url')" />

    <img class="w-100" :src="ShareLogo">

    <div class="position-relative">
      <AppTextInput
        autofocus
        class="w-auto mx-4 mt-4 paste-input"
        :disabled="true"
        :label="$t('public_link_for_entry')"
        :value="'http:\\\\matrix.ad.link.com'"
      />

      <VBtn class="paste-btn flex g-4" color="primary" size="small">
        <v-icon>mdi-content-copy</v-icon>
        {{ $t('tracking.copy') }}
      </VBtn>

    </div>

    <div class="note ps-8">
      {{ $t('easily_add_new_ads_to_your_ad_library') }}
    </div>
  </v-card>
</template>

<style scoped>
.position-relative .app-text-field .v-field {
    height: 50px !important;
    color: #1F1625 !important;
    font-size: 18px !important;
}

.paste-btn {
    position: absolute;
    top: 42%;
    left: 5%;
    border-radius: 8px !important;
    display: flex !important;
    gap: 20px !important;
    font-size: 14px;
    padding: 0 12px
}

input.disabled {
    color: red !important
}

.note {
    position: relative;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
}

.note::after {
    content: '';
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    background-color: #706D79;
    border-radius: 50%
}

.v-card {
    border-radius: 0 !important
}
</style>
