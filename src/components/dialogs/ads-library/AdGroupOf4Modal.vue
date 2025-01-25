<script setup>
  const form = ref({
    product: null,
    product_first_to_last: null,
    type: null,
    type_last_to_first: null,
  })
  const products = ref([])
  const types = ref([])
  const firstToLast = ref([])
  const lastToFirst = ref([])
</script>
<template>
  <v-card class="dialog_container px-6 rounded-xl" min-width="40vw" rounded="lg">
    <v-card-title class="d-flex pb-1 py-4 justify-space-between align-center px-0">
      <div class="py-4 px-6 ga-3 mt-4  align-center w-100 d-flex filter-title">
        <v-icon icon="bitcoin-icons:node-0-connections-filled " />
        <span>{{ $t('ads_library.in_groups_via') }}</span>
      </div>
    </v-card-title>
    <v-divider />
    <div class="d-flex  ga-4">
      <AppSelect
        v-model="form.product"
        class="mt-5"
        :items="products"
        :placeholder="$t('ads_library.product')"
      />
      <AppSelect
        v-model="form.product_first_to_last"
        class="mt-5"
        :items="firstToLast"
        :placeholder="$t('ads_library.first_to_last')"
      />
      <div>
        <VBtn class="delete-btn mx-3">
          <v-icon size="25">mdi-dots-horizontal</v-icon>
        </VBtn>
        <VBtn class="delete-btn">
          <v-icon size="25">mdi-trash-can</v-icon>
        </VBtn>
      </div>
    </div>
    <div class="d-flex  ga-4">
      <AppSelect
        v-model="form.type"
        class="mt-5"
        :items="types"
        :placeholder="$t('ads_library.type')"
      />
      <AppSelect
        v-model="form.type_last_to_first"
        class="mt-5"
        :items="lastToFirst"
        :placeholder="$t('ads_library.last_to_first')"
      />
      <div>
        <VBtn class="delete-btn mx-3">
          <v-icon size="25">mdi-dots-horizontal</v-icon>
        </VBtn>
        <VBtn class="delete-btn">
          <v-icon size="25">mdi-trash-can</v-icon>
        </VBtn>
      </div>
    </div>
  </v-card>
</template>
<style lang="scss" scoped>
.dialog_container {
  .filter-title {
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;
    background-color: #C4ECFD !important;
    border-radius: 12px;
  }
  .app-text-field,
  .app-select {
    flex: 3 !important;
    margin-top: 0 !important
  }
  .delete-btn {
    background-color: transparent !important;
    box-shadow: none !important;
    border: 1px solid #1F16251A;
    width: 40px !important;
    height: 48px !important;
    border-radius: 12px
  }
}
</style>
