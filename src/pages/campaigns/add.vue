<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'
  import campaignHeaderLogo from '@/assets/images/campaign-header.svg'
  import { usePlatformsStore } from '@/stores/usePlatformsStore'
  import { useRequest } from 'vue-request'
  import { requiredValidator } from '@/utilities/validators'

  const platformsStore = usePlatformsStore()
  const { update } = useBreadcrumbsStore()
  const { t, locale } = useI18n()

  const selectedPlatform = ref(null)
  const platforms = ref([])
  const { loading: loadingPlatforms } = useRequest(
    platformsStore.getActivePlatforms,
    {
      onSuccess: res => {
        platforms.value = res
      },
    }
  )

  const campaignTitle = computed(() => {
    return selectedPlatform.value
      ? '(' + t(`platforms.${selectedPlatform.value.toLowerCase()}.title`) + ')'
      : ''
  })

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
  <div class="campaign-form-container">
    <header class="campaign-form-header">
      <img alt="" :src="campaignHeaderLogo">
      <div class="deascription">
        <h3 class="text-black">{{ t("campaign_settings") }} {{ campaignTitle }}</h3>
        <p>{{ t("how_to_edit_campaign") }} </p>
      </div>
    </header>
    <v-divider class="mb-4 mt-6" />
    <VCol cols="12">
      <AppSelect
        v-model="selectedPlatform"
        hide-no-data
        :item-title="(item) => item.title"
        :item-value="(item) => item.code"
        :items="platforms"
        :label="t('platform')"
        :loading="loadingPlatforms"
        :rules="[requiredValidator]"
      />
    </VCol>
    <p v-if="selectedPlatform === 'googleads'">Google</p>
    <CampaignForm v-else />
  </div>
</template>

<style lang="scss">
.campaign-form-container {
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;

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
}
</style>
