<script setup>
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'
import UserImg from './UserImg.vue'

const { t, locale } = useI18n()
const route = useRoute()
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

const items1 = ref([])

const isActive = (to, partial) =>
  partial ? route.name?.includes(to) : route.name === to

const userShouldLink = computed(
  () => !user.value.has_linked_website || !user.value.has_linked_ad_account
)

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
          disabled: userShouldLink.value,
        },
      },
      {
        title: t('reports'),
        props: {
          prependIcon: 'tabler-report',
          active: isActive('/reports/'),
          to: { name: '/reports/' },
          disabled: userShouldLink.value,
        },
      },
      {
        title: t('campaigns'),
        props: {
          prependIcon: 'tabler-speakerphone',
          active: isActive('/campaigns/'),
          to: { name: '/campaigns/' },
          disabled: userShouldLink.value,
        },
      },
      {
        title: t('campaign_rules'),
        props: {
          prependIcon: 'tabler-list',
          active: isActive('/rules', true),
          to: { name: '/rules' },
          disabled: userShouldLink.value,
        },
      },
      {
        title: t('tracking.name'),
        props: {
          prependIcon: 'tabler-wand',
          active: isActive('/tracking/'),
          to: { name: '/tracking/' },
          disabled: userShouldLink.value,
        },
      },
      {
        title: t('digital_writer'),
        props: {
          prependIcon: 'tabler-message-chatbot',
          active: isActive('/assistant/writer/'),
          to: { name: '/assistant/writer/' },
          disabled: userShouldLink.value,
        },
      },
      {
        title: t('digital_designer'),
        props: {
          prependIcon: 'tabler-robot',
          active: isActive('/assistant/designer/'),
          to: { name: '/assistant/designer/' },
          disabled: userShouldLink.value,
        },
      },

      {
        title: t('financial_transaction'),
        props: {
          prependIcon: 'tabler-link',
          active: isActive('/financial-transaction/'),
          to: { name: '/financial-transaction/' },
          disabled: userShouldLink.value,
        },
      },
      {
        title: t('marketing-consultation.name'),
        props: {
          prependIcon: 'ic:baseline-recommend',
          active: isActive('/marketing-consultations/') || isActive('/marketing-consultations-orders/'),
          to: { name: '/marketing-consultations/' },
          disabled: userShouldLink.value,
        },
      },
      {
        title: t('account_connect'),
        props: {
          prependIcon: 'tabler-link',
          active: isActive('/link-ad-accounts', true),
          to: { name: '/link-ad-accounts' },
          disabled: false,
        },
      },
      {
        title: t('account_settings'),
        props: {
          prependIcon: 'tabler-link',
          active: isActive('/account-settings', true),
          to: { name: '/account-settings/account-details' },
          disabled: userShouldLink.value,
        },
      }
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
      <v-img aspect-ratio="1/1" :max-height="185" src="@/assets/logo.svg" style="margin: auto" :width="185" />
      <component :is="item.props.disabled ? 'span' : 'router-link'" v-for="(item, index) in items1" :key="index"
        class="nav-item" :class="{
          active: item.props.active,
          disabled: item.props.disabled,
        }" :to="item.props.to">
        <p><v-icon :icon="item.props.prependIcon" /></p>
        <p>{{ item.title }}</p>
      </component>

      <v-divider class="mx-5 my-3" :thickness="2" />

      <div class="d-flex align-center username-container-section">
        <div class="username-container">

          <div>
            <UserImg bg-color="primary" :height="40" :letter="user.name.slice(0, 1)" :width="40" />
          </div>

          <div>
            <h4 class="text-black">{{ user.name }}</h4>
            <h5>{{ user.email }}</h5>
          </div>
        </div>

        <div class="icon">
          <v-icon icon="tabler-menu-3" />
        </div>
      </div>

      <div class="help-center">
        <h3><v-icon icon="tabler-info-circle" /></h3>
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
  gap: 8px;
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
  height: auto;
  padding: 0;
  padding-block: 1.5em;
  padding-inline-start: 1.5em;
}

.vertical-nav-menu-wrapper {
  nav {
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    // height: 100%;
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
  padding: 12px;
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

.nav-item.disabled {
  cursor: not-allowed;
  opacity: 0.5;

  &:hover {
    background-color: transparent;
  }
}

.username-container-section {

  gap: 16px;

  .username-container {
    @extend .flex-start;
    @extend .padding-start;
    align-items: center;
    padding-block: 1em;

    h5 {
      font-size: 10px;
    }

    h4 {
      font-weight: 500;
      font-size: 14px;
    }
  }

  .icon {
    transform: rotate(90deg);
    color: #FB813E;
  }
}

.help-center {
  @extend .flex-start;
  @extend .padding-start;
  background-color: rgb(var(--v-theme-background));
  border-radius: 50px;
  width: 90%;
  margin: auto;
  margin-block-start: 3em;
  bottom: 1.5em;
  padding: 16px;

  h3 {
    font-size: 16px;
    font-weight: 500
  }
}
</style>
