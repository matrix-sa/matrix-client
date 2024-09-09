<script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAuthStore } from '@/stores/useAuthStore'
  import { storeToRefs } from 'pinia'

  const { t, locale } = useI18n()
  const route = useRoute()
  const authStore = useAuthStore()

  const { user } = storeToRefs(authStore)

  const items1 = ref([])

  const items2 = ref([])

  const isActive = to => route.name === to

  watch(
    locale,
    () => {
      items1.value = [
        {
          title: t('dashboard'),
          icon: 'tabler-dashboard',
          to: '/',
        },
        {
          title: t('account_connect'),
          icon: 'tabler-link',
          to: 'account-setup',
        },
        {
          title: t('campaigns'),
          icon: 'tabler-speakerphone',
          to: 'campaigns',
        },
        {
          title: t('campaign_rules'),
          icon: 'tabler-list',
          to: 'rules',
        },
        {
          title: t('reports'),
          icon: 'tabler-report',
          to: { name: 'reports-tab', params: { tab: 'campaigns' } },
        },
      ]

      items2.value = [
        {
          title: t('digital_writer'),
          icon: 'tabler-message-chatbot',
          to: 'assistant-writer',
        },
        {
          title: t('digital_designer'),
          icon: 'tabler-robot',
          to: 'assistant-designer',
        },
        {
          title: t('marketing-consultation.name'),
          icon: 'ic:baseline-recommend',
          to: 'marketing-consultations',
        },
        {
          title: t('marketing-consultation-order.name'),
          icon: 'lets-icons:order',
          to: 'marketing-consultations-orders',
        },
      ]
    },
    {
      immediate: true,
    }
  )
</script>

<template>
  <div class="vertical-nav-menu-wrapper">
    <nav>
      <v-img
        aspect-ratio="1/1"
        :max-height="185"
        src="@/assets/logo.svg"
        style="margin: auto"
        :width="185"
      />
      <div
        v-for="(item, index) in items1"
        :key="index"
        class="nav-item"
        :class="{
          active: isActive(item.to),
        }"
      >
        <h3><v-icon :icon="item.icon" /></h3>
        <h3>{{ item.title }}</h3>
      </div>

      <v-divider class="mx-5 my-3" :thickness="2" />

      <div
        v-for="(item, index) in items2"
        :key="index"
        class="nav-item"
        :class="{
          active: isActive(item.to),
        }"
      >
        <h3><v-icon :icon="item.icon" /></h3>
        <h3>{{ item.title }}</h3>
      </div>

      <v-divider class="mx-5 my-3" :thickness="2" />

      <div class="username-container">
        <h4 class="text-black">{{ t("username") }}</h4>
        <h5>{{ user.name }}</h5>
      </div>

      <div class="help-center">
        <h3><v-icon icon="tabler-help" /></h3>
        <h3>{{ t("help-center") }}</h3>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.flex-start {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5px;
}

.padding-start {
  padding-inline-start: 1.25em;
}

.padding-block {
  padding-block: 0.5em;
}

.padding-block-large {
  padding-block: 1.5em;
}

.border-radius {
  border-radius: 1em;
}

.vertical-nav-menu-wrapper {
  width: calc(280px + 1.5em);
  height: 1px;
  min-height: 100vh;
  padding: 0;
  padding-block: 1.5em;
  padding-inline-start: 1.5em;
}

.vertical-nav-menu-wrapper {
  nav {
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border-radius: 1em;
    padding-block-end: 1.5em;
  }
}

.nav-item {
  @extend .flex-start;
  @extend .padding-start;
  @extend .padding-block;
  cursor: pointer;
  padding-inline-start: 1em;
  margin-inline: 1em;
}

.nav-item.active {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-on-kbd)) !important;
  border-radius: 50px;
}

.username-container {
  @extend .flex-start;
  @extend .padding-start;
  flex-direction: column;
  align-items: start;
  padding-block: 1em;
}

.help-center {
  @extend .flex-start;
  @extend .padding-start;
  @extend .padding-block;
  background-color: rgb(var(--v-theme-background));
  border-radius: 50px;
  width: 90%;
  margin: auto;
  margin-block-start: 3em;
  bottom: 1.5em;
}
</style>
