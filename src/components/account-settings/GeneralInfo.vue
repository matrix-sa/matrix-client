<script setup>
import { useI18n } from 'vue-i18n'
import ksaFlag from '@images/icons/countries/ksa_flag.svg'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const { t } = useI18n()

const { data } = toRefs(props)
</script>
<template>
  <div>
    <div class="d-flex gap-7">

      <span class="icon-main">
        <VIcon color="#FFF" icon="uil:info" />
      </span>
      <span class="title">{{ t('general_info') }}</span>
    </div>

    <v-divider class="divider" />

    <v-container class="mt-4 px-0">

      <v-row>
        <v-col cols="4">
          <AppTextInput v-model="data.name" prependIcon="subway:id-card-1" :label="t('username')"
            :placeholder="t('name')" />
        </v-col>
        <v-col cols="4">

          <AppTextInput v-model="data.mobile_number" appendText="' '" prependIcon="solar:phone-bold"
            :label="t('phone_number')" :placeholder="t('phone_number')">
            <template #appendEl>
              <span class="me-2 phone_key">+966</span>
              <img :src="ksaFlag" width="20">
            </template>
          </AppTextInput>

        </v-col>
        <v-col cols="4">
          <AppTextInput v-model="data.email" type="email" prependIcon="mdi:email" :label="t('Email')"
            :placeholder="t('Email')" />
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

.phone_key {
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: rgb(var(--v-theme-surface-variant));
}
</style>
