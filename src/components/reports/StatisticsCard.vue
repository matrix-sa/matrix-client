<script setup>
  import { NumberFormat } from '@/composable/useFormat'
  import i18n from '@/i18n'

  const { t } = i18n.global

  const props = defineProps({
    value1: {
      required: true,
    },
    value2: {
      required: true,
    },
    title: {
      required: true,
    },
    subtitle: {
      required: false,

    },
  })

</script>
<template>

  <div class="d-flex flex-column card-wrapper justify-space-between h-100">
    <div class="d-flex justify-space-between align-center">
      <div class="d-flex flex-column">
        <span class="title">{{ title }}</span>

        <span class="subtitle">{{ subtitle }}</span>
      </div>
      <span class="icon-main">
        <VIcon icon="tabler:dots-vertical" />
      </span>
    </div>

    <div class="d-flex mt-4">
      <v-row>
        <v-col class="px-1" cols="6">
          <div class="inner-card">
            <span>{{ t('for_this_month') }}</span>
            <p>{{ value1 ? value1 : 0 }}</p>
          </div>
        </v-col>
        <v-col class="px-1" cols="6">
          <div class="inner-card">
            <span>{{ t('total-sum') }}</span>
            <p>{{ value2 ? NumberFormat(value2) : 0 }}</p>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-wrapper {
  gap: 16px;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;

  .title {
    color: rgb(var(--v-dark-1));
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;
  }

  .subtitle {
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    color: rgb(var(--v-surface-variant));
    margin-top: 4px;
  }

  .inner-card {
    text-align: center;

    background-color: rgb(var(--v-theme-secondary));
    padding: 24px 0;
    border-radius: 20px;

    span {
      font-size: 12px;
    }

    p {
      color: rgb(var(--v-dark-1));
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      margin-top: 12px;
    }
  }

}
</style>
