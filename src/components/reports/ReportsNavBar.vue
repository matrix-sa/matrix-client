<script setup>
  import { ref } from 'vue'
  import i18n from '@/i18n'

  const { t } = i18n.global

  const value = ref(0)
</script>

<template>
  <div class="d-flex flex-row">
    <v-layout class="overflow-visible" style="height: 60px;">
      <v-bottom-navigation v-model="value" :elevation="0" rounded>
        <div>
          <v-btn
            class="nav-item"
          >
            <span class="mdi mdi-file-chart" />
            <span class="mx-2">{{ t('show_all_reports') }}</span>

          </v-btn>
          <v-btn
            class="nav-item"
          >
            <span class="mdi mdi-chart-timeline-variant" />
            <p class="mx-2">{{ t('marketing_performance') }}</p>
          </v-btn>
          <v-btn
            class="nav-item"
          >
            <span class="mdi mdi-chart-bar" />
            <p class="mx-2">{{ t('sales_performance') }} </p>

          </v-btn>
        </div>
      </v-bottom-navigation>
    </v-layout>
    <DatePicker class="w-25 picker_container" />
  </div>

</template>

<style lang="scss">
.overflow-visible{
    display: flex !important;
    flex-direction: row !important;
}
.v-bottom-navigation__content{
justify-content: space-between !important;
background-color: rgb(var(--v-theme-secondary));
}
.v-btn--stacked.v-btn--size-default {
    height: 40px ;
    font-size: 16px ;
    font-weight: 500 ;
    line-height: 19.2px ;
}

.nav-item {
  padding-inline-start: 1.25em;
  padding-block: 0.5em;
  padding-block: 1.5em;
  border-radius: 1em;
  cursor: pointer;
  padding: 12px;
  margin-left: 1em;
  border-radius: 50px;
  text-decoration: none;
  color: #706D79;
  border-width: 1px;
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
.v-btn__content{
    display: flex !important;
    justify-content: center !important;
    align-items: center;
    flex-direction: row !important;
}

.v-btn--selected {
  background-color: rgb(var(--v-theme-warning)) !important;
  color: rgb(var(--v-theme-on-kbd)) !important;
}
.picker_container{
    height: 20px !important;
}

</style>
