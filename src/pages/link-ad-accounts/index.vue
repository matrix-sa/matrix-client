<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'
  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  watch(
    locale,
    () => {
      update([
        {
          title: t('account_connect'),
          disabled: false,
          active: false,
          to: '/link-ad-accounts/',
        },
        {
          title: t('add_store'),
          disabled: false,
          active: true,
          to: '/link-ad-accounts/',
        },
      ])
    },
    { immediate: true }
  )
</script>

<template>
  <div class="main">
    <p class="link-ad-title">{{ t("link_accounts_title") }}</p>
    <div class="buttons-container">
      <v-btn
        color="primary"
        flat
        height="40px"
        prepend-icon="zondicons:add-solid"
        rounded
      >
        {{ t("add_store") }}
      </v-btn>
      <v-btn
        color="surface-variant"
        flat
        height="40px"
        prepend-icon="bi:link"
        rounded
        variant="outlined"
      >
        {{ t("connect_platform_btn") }}
      </v-btn>
      <v-btn
        class="store-btn"
        color="primary"
        flat
        height="40px"
        rounded
      >
        {{ t("connect_store_btn") }}
      </v-btn>
    </div>
    <v-divider class="divider" />

    <div class="selects-container">
      <v-select
        density="comfortable"
        flat
        height="3em"
        hide-details
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
        :label="t('store_type')"
        prepend-inner-icon="mdi:shopping-outline"
        rounded="lg"
        variant="solo-filled"
      />

      <v-text-field
        density="comfortable"
        flat
        hide-details
        :label="t('store_link')"
        prepend-inner-icon="ph:link-bold"
        rounded="lg"
        variant="solo-filled"
      />
      <v-btn
        block
        class="paste-btn"
        color="info"
        flat
        height="100%"
        prepend-icon="ic:baseline-content-paste"
        rounded
      >
        {{ t("paste") }}
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  padding: 20px;
}

.link-ad-title {
  font-weight: 400;
}

.buttons-container {
  display: grid;
  grid-template-columns: repeat(2, auto) 1fr;
  justify-content: start;
  gap: 12px;
  margin-top: 20px;

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

.selects-container {
  display: grid;
  grid-template-columns: 85fr 150fr 24fr;
  gap: 12px;
  height: 3em;
}
</style>

<style lang="scss">
.main {
  .v-field__overlay {
    display: none;
  }
}
</style>
