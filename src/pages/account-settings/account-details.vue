<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'
  import { useRequest } from 'vue-request'
  import AccountSettingsService from '@/services/account-settings-service'

  const { update } = useBreadcrumbsStore()
  const { t, locale } = useI18n()

  const generalInfoData = ref({
    name: '',
    mobile_number: '',
    email: '',
    company_name: '',
    company_website: '',
    company_headquarters: '',
    company_field: '',
  })

  defineExpose({ generalInfoData })

  const { loading: loadingData } = useRequest(
    () => AccountSettingsService.getAccountData(),
    {
      onSuccess: res => {
        generalInfoData.value = res.data?.data
      },
    }
  )
  watch(
    locale,
    () => {
      update([
        {
          title: t('account_settings'),
          active: false,
          to: '/account-settings/account-details/',
        },
        {
          title: t('account_details'),
          active: false,
          disable: true,
          to: '/account-settings/account-details/',
        },
      ])
    },
    { immediate: true }
  )
</script>

<template>
  <div>
    <v-overlay v-if="loadingData" v-model="loadingData" class="align-center justify-center" persistent>
      <v-progress-circular color="primary" indeterminate size="50" :width="7" />
    </v-overlay>
    <div class="d-flex align-center">
      <VIcon color="#1F1625" icon="gridicons:user" size="20" />
      <p class="link-ad-title ms-1">{{ t("account") }}</p>
    </div>

    <v-divider class="divider" />

    <div class="d-flex align-center">
      <div>
        <UserImg bg-color="primary" :height="60" :letter="generalInfoData.name.slice(0, 1)" :width="60" />
      </div>
      <div class="ms-2">
        <h4 class="text-black">{{ generalInfoData.name }}</h4>
        <span>{{ generalInfoData.email }}</span>
      </div>
    </div>

    <div class="mt-6">
      <GeneralInfo :data="generalInfoData" />
    </div>

    <div class="mt-6">
      <CompanyInfo :data="generalInfoData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  padding: 20px;
  background-color: white;
  border-radius: 1rem;
}

.link-ad-title {
  font-weight: 400;
  color: rgb(var(--v-dark-1));
}

.buttons-container {
  display: grid;
  grid-template-columns: repeat(2, auto) 1fr;
  justify-content: start;
  gap: 12px;

  button {
    font-weight: 500;
    font-family: "Tajawal";
  }

  button:last-child {
    background-color: red;
  }

  .store-btn {
    justify-self: end;
  }
}

.divider {
  margin-block: 1em;
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(2em);
  opacity: 0;
}

.v-btn__prepend {
  margin: 0 !important
}
</style>
