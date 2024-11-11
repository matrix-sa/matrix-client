<script setup>
  import { useI18n } from 'vue-i18n'
  import userImg from '@/assets/digital-writer/user.svg'
  import { useRequest } from 'vue-request'
  import AccountSettingsService from '@/services/account-settings-service'

  const { t } = useI18n()

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
        console.log(res.data?.data)
        generalInfoData.value = res.data?.data
      },
    }
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
      <img alt="user" class="user-img" :src="userImg">
      <div class="ms-2">
        <h4 class="text-black">{{ t("username") }}</h4>
        <span>user@gmail.com</span>
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
</style>
