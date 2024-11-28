<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useRequest } from 'vue-request'
  import TargetingService from '@/services/targeting-service'
  import CurrenciesService from '@/services/currencies-service'
  import AppSwitch from '@/components/core/AppSwitch.vue'
  import Pill from '@/assets/pill.svg'
  import AccountSettingsService from '@/services/account-settings-service'

  const { update } = useBreadcrumbsStore()
  const { t, locale } = useI18n()
  const { show } = useSnackbarStore()
  const countries = ref([])
  const currencies = ref([])
  const generalInfoData = ref({
    country: null,
    currency: null,
    notifications_settings: {
      allow_all: false,
      when_campaign_ends: false,
    },

  })

  defineExpose({ generalInfoData })

  const { loading: loadingData } = useRequest(
    () => AccountSettingsService.getAccountData(),
    {
      onSuccess: res => {
        generalInfoData.value = res.data?.data
        generalInfoData.value.notifications_settings.allow_all = res.data?.data.notifications_settings?.allow_all || false
        generalInfoData.value.notifications_settings.when_campaign_ends = res.data?.data.notifications_settings?.when_campaign_ends || false
      },
    }
  )

  const { loading: loadingCountries } = useRequest(
    () => TargetingService.getSupportedCountries('GoogleAds'),
    {
      onSuccess: res => {
        const { error, data, messages, code } = res.data

        if (error) {
          show(messages[0], 'error')
        }
        countries.value = data ?? []
      },
    }
  )

  const { loading: loadingCurrencies } = useRequest(
    () => CurrenciesService.getSupportedCurrencies(),
    {
      onSuccess: res => {
        currencies.value = res.data?.data
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
      <VIcon color="primary" icon="tdesign:setting-filled" size="20" />
      <p class="link-ad-title ms-1">{{ t("account_settings") }}</p>
    </div>

    <v-divider class="divider" />

    <v-container class="px-0">
      <v-row>
        <v-col cols="12" sm="6">
          <AppAutocomplete
            v-model="generalInfoData.country"
            hide-no-data
            icon="mdi-flag"
            item-title="name"
            item-value="id"
            :items="countries"
            :label="$t('main_target_country')"
            :loading="loadingCountries"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <AppAutocomplete
            v-model="generalInfoData.currency"
            hide-no-data
            icon="clarity:dollar-line"
            item-title="name"
            item-value="code"
            :items="currencies"
            :label="$t('used_currency')"
            :loading="loadingCurrencies"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container class="px-0 py-0">

      <div class="d-flex align-center">
        <img :src="Pill">
        <p class="link-ad-title ms-1">{{ t("not_settings") }}</p>
      </div>

      <v-divider class="divider" />
      <v-row>

        <v-col cols="12" sm="12">
          <AppSwitch
            v-model="generalInfoData.notifications_settings.allow_all"
            :label="t('all_notifications_on')"
            :off-icon="'mdi:close'"
            :on-icon="'mdi-check'"
          />

          <AppSwitch
            v-model="generalInfoData.notifications_settings.when_campaign_ends"
            :label="t('notify_when_camp_end')"
            :off-icon="'mdi:close'"
            :on-icon="'mdi-check'"
          />

          <!-- <AppSwitch v-model="onAllNotifications" :label="t('another_notify')" :off-icon="'mdi:close'"
            :on-icon="'mdi-check'" />

          <AppSwitch v-model="onAllNotifications" :label="t('another_notify')" :off-icon="'mdi:close'"
            :on-icon="'mdi-check'" /> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.main {
  padding: 20px;
  background-color: white;
  border-radius: 1rem;
}

.link-ad-title {
  font-weight: 500;
  font-size: 16px;
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

.user-img {
  width: 100px;
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

.v-field__field {
  line-height: 48px !important
}
</style>
