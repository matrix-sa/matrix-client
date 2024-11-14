<script setup>
  import { useI18n } from 'vue-i18n'
  import { useAuthStore } from '@/stores/useAuthStore'
  import { storeToRefs } from 'pinia'

  const { t, locale } = useI18n()
  const route = useRoute()
  const authStore = useAuthStore()

  const { user } = storeToRefs(authStore)
  const drawer = ref(false)
  const group = ref(null)
  const items1 = ref([])
  const items2 = ref([])

  const isActive = to => route.name === to

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
          title: t('account_connect'),
          props: {
            prependIcon: 'tabler-link',
            active: isActive('/link-ad-accounts', true),
            to: { name: '/link-ad-accounts' },
            disabled: false,
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
            active: isActive('/rules'),
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
          title: t('reports'),
          props: {
            prependIcon: 'tabler-report',
            active: isActive('/reports/'),
            to: { name: '/reports/', params: { tab: 'campaigns' } },
            disabled: userShouldLink.value,
          },
        },
      ]

      items2.value = [
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
          title: t('marketing-consultation.name'),
          props: {
            prependIcon: 'ic:baseline-recommend',
            active: isActive('/marketing-consultations/'),
            to: { name: '/marketing-consultations/' },
            disabled: userShouldLink.value,
          },
        },
        {
          title: t('marketing-consultation-order.name'),
          props: {
            prependIcon: 'lets-icons:order',
            active: isActive('/marketing-consultations-orders/'),
            to: { name: '/marketing-consultations-orders/' },
            disabled: userShouldLink.value,
          },
        },
        {
          title: t('dashboard'),
          props: {
            prependIcon: 'tabler-dashboard',
            active: isActive('/'),
            to: { name: '/' },
            disabled: userShouldLink.value,
          },
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
        <v-img aspect-ratio="1/1" src="@/assets/logo.svg" style="margin: auto" width="70%" />
        <v-divider />
        <h4 class="text-black">{{ t("username") }}</h4>
        <h5>{{ user.name }}</h5>
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
