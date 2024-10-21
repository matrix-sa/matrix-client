<script setup>
  import ksaFlag from '@images/icons/countries/ksa_flag.svg'

  const props = defineProps({
    cities: Object,
  })

  const currency = inject('currency')
</script>

<template>
  <VCard :subtitle="$t('last-month')" :title="$t('sales-by-city')">
    <VCardText>
      <VList v-if="props.cities !== null" class="card-list">
        <VListItem v-for="city in cities" :key="city.total_this_duration">
          <template #prepend>
            <VAvatar color="secondary" :image="ksaFlag" size="34" variant="tonal" />
          </template>

          <VListItemTitle class="font-weight-medium">
            {{ city.total_this_duration }}
            <sub>{{ currency }}</sub>
          </VListItemTitle>
          <VListItemSubtitle>
            {{ city.city }}
          </VListItemSubtitle>

          <template #append>
            <div
              class="d-flex align-center font-weight-medium"
              :class="city.rate?.toString()?.includes('-')
                ? 'text-error'
                : 'text-success'"
            >
              <VIcon
                class="me-1"
                :icon="city.rate?.toString()?.includes('-') ? 'tabler-chevron-down' : 'tabler-chevron-up'"
                size="20"
              />
              <span>{{ city.rate }}%</span>
            </div>
          </template>
        </VListItem>
      </VList>

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 19px;
}
</style>
