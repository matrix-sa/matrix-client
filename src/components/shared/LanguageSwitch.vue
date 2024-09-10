<script setup>
  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()
  const languageOptions = ref([
    {
      title: 'العربي',
      value: 'ar',
    },
    {
      title: 'English',
      value: 'en',
    },
  ])

  const handleUpdate = value => {
    localStorage.setItem('lang', value)
  }
</script>
<template>
  <v-select
    v-model="locale"
    :items="languageOptions"
    v-bind="{...$attrs}"
    @update:model-value="handleUpdate"
  />

  <IconBtn>
    <VIcon
      icon="tabler-language"
      size="26"
    />

    <!-- Menu -->
    <VMenu
      activator="parent"
      offset="14px"
    >
      <!-- List -->
      <VList
        v-model:selected="currentLang"
        min-width="175px"
      >
        <!-- List item -->
        <VListItem
          v-for="lang in props.languages"
          :key="lang.i18nLang"
          :active="lang.i18nLang === locale"
          :value="lang.i18nLang"
          @click="locale = lang.i18nLang; $emit('change', lang.i18nLang)"
        >
          <!-- Language label -->
          <VListItemTitle>{{ t(lang.i18nLang) }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </IconBtn>
</template>
