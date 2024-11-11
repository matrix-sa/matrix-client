<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})


const { data } = toRefs(props)
</script>
<template>
  <div>
    <div class="d-flex gap-7">
      <span class="icon-main">
        <VIcon color="#FFF" icon="uil:info" />
      </span>
      <span class="title">{{ t('company_info') }}</span>
    </div>

    <v-divider class="divider" />

    <v-container class="mt-4 px-0">
      <v-row>
        <v-col cols="4">

          <AppTextInput v-model="data.company_name" prependIcon="humbleicons:building" :label="t('company_name')"
            :placeholder="t('company_name')" />

        </v-col>
        <v-col cols="4">

          <AppTextInput v-model="data.company_headquarters" prependIcon="heroicons:map-pin-16-solid"
            :label="t('company_address')" :placeholder="t('company_address')" />
        </v-col>
        <v-col cols="4">
          <AppTextInput v-model="data.company_field" prependIcon="basil:bag-solid" :label="t('company_field')"
            :placeholder="t('company_field')" />
        </v-col>

        <v-col cols="4">

          <AppTextInput v-model="data.company_website" appendText="' '" prependIcon="ph:globe-bold"
            :label="t('company_website')" :placeholder="t('company_website')">
            <template #appendEl>
              <a href="#">
                <VIcon color="primary" icon="bx:link-external" size="20" />
              </a>
            </template>
          </AppTextInput>


        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.icon-main {
  background-color: rgb(var(--v-theme-primary)) !important;
  display: block;
  border-radius: 7px;

}

.gap-7 {
  gap: 7px;

}

.title {
  font-weight: 500;
  color: rgb(var(--v-dark-1));
}

.divider {
  margin-block: 1em;
}
</style>
