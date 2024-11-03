<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'

  const route = useRoute()
  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  const platform = route.query.platform?.toLocaleLowerCase()

  watch(
    locale,
    () => {
      update([
        {
          title: t('ad_groups'),
          active: false,
          to: '/campaigns/',
        },
        {
          title: t('add_ad_group'),
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
  <div class="ad-group-form-container">
    <header class="ad-group-form-header">
      <img alt="" src="https://picsum.photos/100">
      <div class="deascription">
        <h3 class="text-black">
          {{ t("ad_group_settings") }} ({{
            t(`platforms.${platform}.title`)
          }})
        </h3>
        <p>{{ t("how_to_edit_ad_group") }}</p>
      </div>
    </header>
    <v-divider class="mb-4 mt-6" />
    <AdsGroupTiktokForm v-if="platform === 'tiktok'" />
    <AdsGroupXForm v-if="platform === 'twitter'" />
    <AdsGroupGoogleForm v-if="platform === 'googleads'" />
  </div>
</template>

<style lang="scss">
.ad-group-form-container {
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;

  .ad-group-form-header {
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
