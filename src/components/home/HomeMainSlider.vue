<script setup>
  import { VIcon } from 'vuetify/components/VIcon'

  import { computed } from 'vue'

  const props = defineProps({
    generalStoreInfo: Object,
  })

  const websiteAnalytics = computed(() => {
    return [
      {
        name: 'store-performance',
        data: [
          {
            number: props.generalStoreInfo?.donaload_speed,
            text: 'download-speed',
          },
          {
            number: props.generalStoreInfo?.average_staying_duration,
            text: 'average-staying-duration',
          },
          {
            number: props.generalStoreInfo?.bounce_rate,
            text: 'bounce-rate',
          },
        ],
      },
      {
        name: 'payments-performance',
        data: [
          {
            number: props.generalStoreInfo?.total_transactions,
            text: 'total-transactions',
          },
          {
            number: props.generalStoreInfo?.successful_transactions,
            text: 'successful-transactions',
          },
          {
            number: props.generalStoreInfo?.failed_transactions,
            text: 'failed-transactions',
          },
          {
            number: '23k',
            number: props.generalStoreInfo?.transactions_success_rate,
            text: 'transactions-success-rate',
          },
        ],
      },
    ]
  })
</script>

<template>
  <VCard class="bg-gradient-primary" color="primary">
    <!-- cycle -->
    <VCarousel
      v-if="props.generalStoreInfo !== null"
      class="carousel-delimiter-top-end web-analytics-carousel"
      :continuous="false"
      :delimiter-icon="() => h(VIcon, { icon: 'fa-circle', size: '8' })"
      height="auto"
      hide-delimiter-background
      :show-arrows="false"
    >
      <VCarouselItem v-for="item in websiteAnalytics" :key="item.name">
        <VCardText>
          <HomeCardHeading size="large" :subtitle="$t('last-24-hours')" :title="$t(item.name)" white />
          <VRow>
            <VCol
              class="pt-16 pb-10"
              cols="12"
              order="2"
              order-sm="1"
              sm="9"
            >
              <VRow>
                <VCol
                  v-for="d in item.data"
                  :key="d.number"
                  class="text-no-wrap pb-2"
                  cols="12"
                  sm="6"
                >
                  <VChip
                    class="font-weight-medium justify-center text-white rounded me-2"
                    color="#5C2EC6"
                    size="default"
                    variant="flat"
                  >
                    {{ d.number }}
                  </VChip>
                  <span>{{ $t(d.text) }}</span>
                </VCol>
              </VRow>
            </VCol>

            <VCol
              class="position-relative text-center"
              cols="12"
              order="1"
              order-sm="2"
              sm="3"
            >
            </VCol>
          </VRow>
        </VCardText>
      </VCarouselItem>
    </VCarousel>

    <HomeEmptyState v-else />
  </VCard>
</template>

<style scoped>
:deep(.carousel-delimiter-top-end .v-carousel__controls) {
  inset-block-start: 1rem;
  padding-inline: 1.3rem;
  justify-content: end;
}

:deep(.carousel-delimiter-top-end .v-carousel__controls .v-btn) {
  width: 8px;
  height: 8px;
}

:deep(.carousel-delimiter-top-end .v-carousel__controls .v-btn .v-icon) {
  width: 8px;
  height: 8px;
}
</style>

<style scoped lang="scss">
.card-website-analytics-img {
  block-size: 150px;
  opacity: 0.35;
}

.v-chip {
  width: 88px;
  height: 26px;
  font-size: 16px;
}

@media screen and (min-width: 600px) {
  .card-website-analytics-img {
    position: absolute;
    margin: auto;
    inset-block-end: 40px;
    inset-block-start: -1rem;
    inset-inline-end: 1rem;
  }
}

.web-analytics-carousel {
  .v-carousel__controls {
    .v-btn {
      &::after {
        content: unset;
      }

      &:not(.v-btn--active) {
        opacity: 0.4;

      }
    }

  }
}

.bg-gradient-primary {
  background: linear-gradient(to left, #6130D3, #784AE3)
}
</style>
