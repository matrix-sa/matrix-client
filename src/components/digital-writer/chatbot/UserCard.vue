<script setup>
  import { useI18n } from 'vue-i18n'
  import userImg from '@/assets/digital-writer/user.svg'
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from '@/stores/useAuthStore'

  defineProps({
    message: {
      type: String,
      default: '',
    },
  })

  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
</script>

<template>
  <div class="title-container d-flex">
    <div class="d-flex flex-column wrapper">
      <div class="d-flex user-wrapper align-center">
        <img alt="user" :src="userImg">
        <span> {{ user.name }}</span>
      </div>

      <div class="d-flex text-wrapper align-center">
        <span>{{ message }} </span>

      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.title-container {
  background-color: rgb(var(--v-theme-primary));
  padding: 16px;
  gap: 16px;
  border-radius: 12px;

  .wrapper {
    gap: 16px;
    flex: 1;

    .user-wrapper {
      gap: 10px;

      span {
        color: #FFF
      }
    }

    .text-wrapper {

      padding: 16px;
      gap: 8px;
      border-radius: 8px;
      background-color: #FFFFFF1A;
      width: 100%;

      span {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: #FFF
      }
    }
  }

}
</style>
