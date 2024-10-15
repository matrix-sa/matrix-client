<script setup>
  import { useI18n } from 'vue-i18n'
  import { useAuthStore } from '@/stores/useAuthStore'
  import { storeToRefs } from 'pinia'
  import { RouterLink } from 'vue-router'

  const { t, locale } = useI18n()
  const route = useRoute()
  const authStore = useAuthStore()

  const { user } = storeToRefs(authStore)

  const items1 = ref([])

  const items2 = ref([])

  const isActive = (to, partial) =>
    partial ? route.name.includes(to) : route.name === to

  watch(
    [locale, route],
    () => {
      items1.value = [
        {
          title: t('dashboard'),
          props: {
            prependIcon: 'tabler-dashboard',
            active: isActive('/'),
            to: { name: '/' },
          },
        },
        {
          title: t('account_connect'),
          props: {
            prependIcon: 'tabler-link',
            active: isActive('/link-ad-accounts/', true),
            to: { name: '/link-ad-accounts/' },
          },
        },
        {
          title: t('campaigns'),
          props: {
            prependIcon: 'tabler-speakerphone',
            active: isActive('/campaigns/'),
            to: { name: '/campaigns/' },
          },
        },
        {
          title: t('campaign_rules'),
          props: {
            prependIcon: 'tabler-list',
            active: isActive('/rules/'),
            to: { name: '/rules/' },
          },
        },
        {
          title: t('reports'),
          props: {
            prependIcon: 'tabler-report',
            active: isActive('/reports/'),
            to: { name: '/reports/', params: { tab: 'campaigns' } },
          },
        },
      ]

      items2.value = [
        {
          title: t('digital_writer'),
          icon: 'tabler-message-chatbot',
          to: { name: '/assistant/writer/' },
        },
        {
          title: t('digital_designer'),
          icon: 'tabler-robot',
          to: { name: '/assistant/designer/' },
        },
        {
          title: t('marketing-consultation.name'),
          icon: 'ic:baseline-recommend',
          to: { name: '/marketing-consultations/' },
        },
        {
          title: t('marketing-consultation-order.name'),
          icon: 'lets-icons:order',
          to: { name: '/marketing-consultations-orders/' },
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
      <RouterLink
        v-for="(item, index) in items1"
        :key="index"
        class="nav-item"
        :class="{
          active: item.props.active,
        }"
        :to="item.props.to"
      >
        <p><v-icon :icon="item.props.prependIcon" /></p>
        <p>{{ item.title }}</p>
      </RouterLink>

      <v-divider class="mx-5 my-3" :thickness="2" />

      <RouterLink
        v-for="(item, index) in items2"
        :key="index"
        class="nav-item"
        :class="{
          active: isActive(item.to),
        }"
        :to="item.to"
      >
        <p><v-icon :icon="item.icon" /></p>
        <p>{{ item.title }}</p>
      </RouterLink>

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
    overflow-y: scroll;
    scrollbar-width: none;
  }
}

.nav-item {
  @extend .flex-start;
  @extend .padding-start;
  @extend .padding-block;
  cursor: pointer;
  padding-inline-start: 1em;
  margin-inline: 1em;
  margin-block: 0.25em;
  border-radius: 50px;
  text-decoration: none;
  color: inherit;
  &:hover {
    background-color: rgb(var(--v-theme-secondary));
  }

  &:visited {
    color: inherit;
  }

  p {
    font-weight: 500;
  }
}

.nav-item.active {
  background-color: rgb(var(--v-theme-warning)) !important;
  color: rgb(var(--v-theme-on-kbd)) !important;
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
