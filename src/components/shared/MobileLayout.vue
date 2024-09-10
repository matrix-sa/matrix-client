<script setup>
  import { useI18n } from 'vue-i18n'
  import { useAuthStore } from '@/stores/useAuthStore'
  import { storeToRefs } from 'pinia'
  import { RouterLink } from 'vue-router'

  const { t, locale } = useI18n()
  const route = useRoute()
  const authStore = useAuthStore()

  const { user } = storeToRefs(authStore)
  const drawer = ref(false)
  const group = ref(null)
  const items1 = ref([])
  const items2 = ref([])

  const isActive = to => route.name === to

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
            active: isActive('/link-ad-accounts/'),
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

  // Watch the 'group' variable and close the drawer when it changes
  watch(group, () => {
    drawer.value = false
  })
</script>
<template>
  <v-card style="flex-grow: 1">
    <v-layout style="height: 100%">
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
        <v-spacer />
        <LanguageSwitch
          class="lagnuage-select"
          flat
          hide-details
          prepend-inner-icon="mdi:language"
          single-line
          variant="plain"
          width="50px"
        />
        <v-btn>
          <v-icon>mdi:bell</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" temporary>
        <v-img
          aspect-ratio="1/1"
          src="@/assets/logo.svg"
          style="margin: auto"
          width="70%"
        />
        <v-divider />
        <v-list :items="items1" />
        <v-divider />
        <v-list :items="items2" />
      </v-navigation-drawer>

      <v-main style="height: 100%">
        <v-card-text>
          <router-view />
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>
