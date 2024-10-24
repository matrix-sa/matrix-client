<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'

  import GoogleCampaignForm from '@/components/forms/campaigns/GoogleCampaignForm.vue'

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
  <div class="campaign-form-container">

    <CampaignForm>
      <template #default="{ data }">
        <GoogleCampaignForm :data="data" />
      </template>
    </CampaignForm>
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
