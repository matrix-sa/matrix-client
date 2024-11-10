<script setup>
import { useI18n } from 'vue-i18n'
import editPen from '@/assets/edit-pen.svg'
import password from '@/assets/Password.svg'

const { t } = useI18n()
const route = useRoute()


const isAccountDetails = computed(() =>
  route.name.includes('account-details')
)

const activeBtnProps = ref({
  color: 'warning',
  flat: true,
})

const inActiveBtnProps = ref({
  color: 'surface-variant',
  flat: true,
  variant: 'outlined',
})

//router.push({ name: '/account-settings/account-details' })
</script>

<template>
  <div>


    <div class="d-flex mb-6 justify-space-between align-center">
      <div class="buttons-container">
        <v-btn v-bind="isAccountDetails ? activeBtnProps : inActiveBtnProps" height="40px" rounded
          :to="{ name: '/account-settings/account-details' }">

          <template #prepend>
            <v-icon size="24px">iconoir:user</v-icon>
          </template>
          {{ t("account_details") }}
        </v-btn>

        <v-btn v-bind="isAccountDetails ? inActiveBtnProps : activeBtnProps" height="40px" rounded
          :to="{ name: '/account-settings/settings' }">

          <template #prepend>
            <v-icon size="22px">ri:settings-line</v-icon>
          </template>

          {{ t("account_settings") }}
        </v-btn>

      </div>

      <div class="d-flex align-center">
        <v-btn color="primary" variant="outlined" height="40px" rounded>
          <img alt="user" :src="password" width="16" class="me-1">

          {{ t("change_password_title") }}
        </v-btn>

        <v-btn color="primary" class="ms-2" height="40px" icon-color="white" rounded>
          <img alt="user" :src="editPen" width="16" class="me-1">

          {{ t("edit_account") }}
        </v-btn>


      </div>
    </div>

    <div class="main">




      <div>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
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
