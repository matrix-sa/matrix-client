<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

</script>
<template>
  <div>
    <div class="d-flex gap-7">

      <span class="icon-main">
        <VIcon icon="uil:info" color="#FFF"></VIcon>
      </span>
      <span class="title">{{ t('company_info') }}</span>
    </div>

    <v-divider class="divider" />


    <v-container class="mt-4 px-0">
      <v-row>
        <v-col cols="4">
          <InfoCard :label="t('company_name')" :icon="'humbleicons:building'" value="مايكروسوفت" />

        </v-col>
        <v-col cols="4">
          <InfoCard :label="t('company_address')" :icon="'heroicons:map-pin-16-solid'" value="الرياض" />

        </v-col>
        <v-col cols="4">
          <InfoCard :label="t('company_field')" :icon="'basil:bag-solid'" value="منتجات استهلاكية" />

        </v-col>

        <v-col cols="4">
          <InfoCard :label="t('company_website')" :icon="'ph:globe-bold'" value="www.microsoft.com">
            <template #appendEl>
              <a href="#">
                <VIcon icon="bx:link-external" size="20" color="primary"></VIcon>
              </a>
            </template>

          </InfoCard>
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
