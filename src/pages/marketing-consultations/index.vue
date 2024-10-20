<script setup>
import MarketingConsultationQuestionsList from "@/components/MarketingConsultationQuestionsList.vue"
import { useI18n } from 'vue-i18n'


import MarketingConsultationsService from "@/services/marketing-consultations-service"
import { useConsultationsStore } from '@/stores/useConsultationsStore'
import { useRequest } from "vue-request"
import { useRouter } from "vue-router"
// import { VDataTableServer } from "vuetify/labs/VDataTable"

const consultationsStore = useConsultationsStore()
const router = useRouter()
const consulations = ref([])
const isDialogVisible = ref(false)


const { t } = useI18n()


const headers = [
  /*   {
      title: t("marketing-consultation.id"),
      key: "id",
    }, */
  {
    title: t("marketing-consultation.arabic_title"),
    key: "arabic_title",
  },
  // {
  //   title: t("marketing-consultation.english_title"),
  //   key: "english_title",
  // },
  {
    title: t("marketing-consultation.status"),
    key: "status",
  },
  {
    title: t("marketing-consultation.scheduling_url"),
    key: "scheduling_url",
  },
  {
    title: t("marketing-consultation.price"),
    key: "price",
  },
  // {
  //   title: t("marketing-consultation.currency"),
  //   key: "currency",
  // },
  {
    title: t("marketing-consultation.position"),
    key: "position",
  },
  {
    title: t("marketing-consultation.is_active"),
    key: "is_active",
  },
  {
    title: t("actions"),
    key: "actions",
  },
]

const {
  run: fetchMarketingConsulations,
  loading: marketingConsulationsLoading,
} = useRequest(params => MarketingConsultationsService.getAll(params), {
  onSuccess: res => {
    const { data, error, message } = res.data

    consulations.value = data
  },
})

const resolveStatusVariant = status => {
  const statusVariants = {
    created: 'success',
    deleted: 'secondary',
  }

  return statusVariants[status?.toLowerCase()]
}

const getStatus = status => {
  const loweredStatus = status?.toLowerCase()

  return t(`marketing-consultation.statuses.${loweredStatus}`)
}

const handleCreate = item => {
  consultationsStore.setConsultationToAnswer(item)
  router.push({ name: 'marketing-consultations-orders-create' })
}
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle class="font-weight-medium py-6">
            {{ $t("consultationsLog") }}
          </VCardTitle>
          <VCardText>
            <VDivider />
            <VDataTable :loading="marketingConsulationsLoading" :items="consulations"
              :items-length="consulations.length" :headers="headers" class="text-no-wrap no-pagination"
              items-per-page="-1">
              <!-- Status -->
              <template #item.status="{ item }">
                <VChip :color="resolveStatusVariant(item.status)" size="small" label class="text-capitalize">
                  {{ getStatus(item.status) }}
                </VChip>
              </template>

              <!-- Is Active -->
              <template #item.is_active="{ item }">
                {{ item.is_active ? $t('yes') : $t('no') }}
              </template>

              <!-- Currency -->
              <template #item.price="{ item }">
                {{ item.price }}
                <sub>
                  {{ $t(item.currency) }}
                </sub>
              </template>

              <template #bottom />

              <!-- Actions -->
              <template #item.actions="{ item }">
                <VTooltip :text="$t('marketing-consultation-order.create')">
                  <template #activator="{ props }">
                    <VBtn class="mx-1" icon="material-symbols:add" size="x-small" color="success" v-bind="props"
                      @click="handleCreate(item)" />
                  </template>
                </VTooltip>

                <VDialog v-model="isDialogVisible" width="90vh" max-height="70vh">
                  <!-- Activator -->
                  <template #activator="{ props: activatorProps }">
                    <VTooltip :text="$t('marketing-consultation.show-questions')">
                      <template #activator="{ props }">
                        <VBtn class="mx-1" icon="carbon:view" size="x-small" color="primary"
                          v-bind="{ ...props, ...activatorProps }" />
                      </template>
                    </VTooltip>
                  </template>

                  <!-- Dialog close btn -->
                  <!-- <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" /> -->

                  <!-- Dialog Content -->
                  <VCard :title="$t('marketing-consultation.view-questions-modal.title')">
                    <VCardText>
                      <MarketingConsultationQuestionsList :questions="item.questions" />
                    </VCardText>
                  </VCard>
                </VDialog>

                <!-- Hide Pagination Controls -->
              </template>
            </VDataTable>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>

<style scoped>
.headline {
  font-size: 1.5rem;
}
</style>

<style>
.no-pagination .v-table__wrapper {
  min-block-size: 65px !important;
}
</style>
