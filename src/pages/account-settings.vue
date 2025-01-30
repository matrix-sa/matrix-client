<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'
  import editPen from '@/assets/edit-pen.svg'
  import password from '@/assets/Password.svg'
  import AccountSettingsService from '@/services/account-settings-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useRequest } from 'vue-request'

  const { t, locale } = useI18n()
  const route = useRoute()
  const accountComponent = ref(null)
  const { show } = useSnackbarStore()
  const { update } = useBreadcrumbsStore()

  const activeRoute = computed(() => {
    const routeName = route.name || ''
    return {
      isAccountDetails: routeName.includes('account-details'),
      isAccountPayment: routeName.includes('payment-methods'),
      isAccountSettings: routeName.includes('/account-settings/settings'),
    }
  })

  const activeBtnProps = ref({
    color: 'warning',
    flat: true,
  })

  const inActiveBtnProps = ref({
    color: 'surface-variant',
    flat: true,
    variant: 'outlined',
  })

  const { run: runUpdate, loading: updateLoading } = useRequest(
    data => AccountSettingsService.updateAccountData(data),
    {
      manual: true,
      onSuccess: res => {
        const { error, messages } = res.data

        if (error) {
          show(messages[0], 'error')
          return
        }
        show(t('updated_message'), 'success')
      },
    },
  )

  const submit = () => {
    const generalInfoData = accountComponent?.value.generalInfoData

    if (activeRoute.value?.isAccountDetails && accountComponent.value) {
      runUpdate(generalInfoData)
    } else {
      runUpdate(generalInfoData)
    }
  }
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

    <div class="d-flex mb-6 justify-space-between align-center">
      <div class="buttons-container">
        <v-btn
          v-bind="activeRoute?.isAccountDetails ? activeBtnProps : inActiveBtnProps"
          height="40px"
          rounded
          :to="{ name: '/account-settings/account-details' }"
        >

          <template #prepend>
            <v-icon size="24px">iconoir:user</v-icon>
          </template>
          {{ t("account_details") }}
        </v-btn>

        <v-btn
          v-bind="activeRoute.isAccountSettings ? activeBtnProps : inActiveBtnProps"
          height="40px"
          rounded
          :to="{ name: '/account-settings/settings' }"
        >

          <template #prepend>
            <v-icon size="22px">ri:settings-line</v-icon>
          </template>

          {{ t("account_settings") }}
        </v-btn>
        <v-btn
          v-bind="activeRoute.isAccountPayment ? activeBtnProps : inActiveBtnProps"
          height="40px"
          rounded
          :to="{ name: '/account-settings/payment-methods' }"
        >

          <template #prepend>
            <v-icon size="22px">tabler-credit-card</v-icon>
          </template>

          {{ t("payment_method") }}
        </v-btn>
      </div>

      <div class="d-flex align-center">
        <v-btn color="primary" height="40px" rounded variant="outlined">
          <img alt="user" class="me-1" :src="password" width="16">

          {{ t("change_password_title") }}
        </v-btn>

        <v-btn
          class="ms-2"
          color="primary"
          height="40px"
          icon-color="white"
          :loading="updateLoading"
          rounded
          @click="submit"
        >
          <img alt="user" class="me-1" :src="editPen" width="16">

          {{ t("edit_account") }}
        </v-btn>

      </div>
    </div>

    <div class="main">

      <div>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" ref="accountComponent" />
          </transition>
        </router-view>
      </div>
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
</style>
<style>
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
