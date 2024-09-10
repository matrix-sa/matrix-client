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
    locale.value = value
  }
</script>
<template>
  <div>
    <v-select
      v-if="!$vuetify.display.mdAndDown"
      v-model="locale"
      :items="languageOptions"
      v-bind="{...$attrs}"
      prepend-inner-icon="mdi:language"
      @update:model-value="handleUpdate"
    />

    <v-btn v-if="$vuetify.display.mdAndDown">
      <VIcon
        icon="tabler-language"
        size="26"
      />

      <VMenu
        activator="parent"
        offset="14px"
      >
        <VList
          min-width="175px"
          :selected="locale"
        >
          <VListItem
            v-for="option in languageOptions"
            :key="option.value"
            :active="option.value === locale"
            :value="option.value"
            @click="handleUpdate(option.value)"
          >
            <VListItemTitle>{{ option.title }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </v-btn>
  </div>
</template>
