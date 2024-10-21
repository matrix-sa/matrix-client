<script setup>
  const props = defineProps({
    stats: Object,
  })

  const content = computed(() => {
    const arr = []
    for (const item in props.stats) {
      arr.push({
        name: item,
        active: props.stats[item].active,
        inactive: props.stats[item].in_active,
        all: props.stats[item].total,
      })
    }

    return arr
  })
</script>

<template>
  <VCard :title="$t('ads-statistics')">
    <VDivider />

    <VTable>
      <thead>
        <tr>
          <th />
          <th>
            {{ $t('active') }}
          </th>
          <th>
            {{ $t('inactive') }}
          </th>
          <th>
            {{ $t('all') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="props.stats !== null">
          <tr
            v-for="item in content"
            :key="item.name"
          >
            <td class="text-start">
              {{ $t('number_of') }}
              {{ item.name ==='platforms'? $t('thePlatforms') : $t(item.name) }}
            </td>
            <td class="text-primary">
              {{ item.active }}
            </td>
            <td class="text-primary">
              {{ item.inactive }}
            </td>
            <td class="text-warning">
              {{ item.all }}
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="4">
            <HomeEmptyState />
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>

<style scoped>
th{
  white-space: nowrap;
}

.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > tbody > tr > th,
.v-table > .v-table__wrapper > table > thead > tr > th,
.v-table > .v-table__wrapper > table > tfoot > tr > th {
  text-align: center;
}

.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
.v-table > .v-table__wrapper > table > tbody > tr > td {
  border: none;
}
</style>
