<script setup>
import { useI18n } from 'vue-i18n'
import userImg from '@/assets/digital-writer/user.svg'

const { t } = useI18n()
</script>

<template>
  <div>

    <div class="d-flex align-center">
      <VIcon icon="gridicons:user" size="20" color="#1F1625" />
      <p class="link-ad-title ms-1">{{ t("account") }}</p>
    </div>


    <v-divider class="divider" />

    <div class="d-flex align-center">
      <img alt="user" :src="userImg" class="user-img">
      <div class="ms-2">
        <h4 class="text-black">{{ t("username") }}</h4>
        <span>user@gmail.com</span>
      </div>
    </div>

    <div class="mt-6">
      <GeneralInfo />
    </div>

    <div class="mt-6">
      <CompanyInfo />
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
