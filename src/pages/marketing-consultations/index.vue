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
    title: t("marketing-consultation.scheduling_url"),
    key: "scheduling_url",
  },
  {
    title: t("marketing-consultation.status"),
    key: "status",
  },
  {
    title: t("marketing-consultation.arabic_title"),
    key: "arabic_title",
  },
  {
    title: t("marketing-consultation.english_title"),
    key: "english_title",
  },
  {
    title: t("marketing-consultation.price"),
    key: "price",
  },
  {
    title: t("marketing-consultation.currency"),
    key: "currency",
  },
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
  consultationsStore.setConsultationToAnswer(item.raw)
  router.push({ name: 'marketing-consultations-orders-create' })
}
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardTitle>
            {{ $t("marketing-consultation.table_title") }}
          </VCardTitle>
          <VDivider />
          <VCardText>
            <VDataTable :loading="marketingConsulationsLoading" :items="consulations"
              :items-length="consulations.length" :headers="headers" class="text-no-wrap no-pagination"
              items-per-page="-1">
              <!-- Status -->
              <template #item.status="{ item }">
                <VChip :color="resolveStatusVariant(item.raw?.status)" size="small" label class="text-capitalize">
                  {{ getStatus(item.raw?.status) }}
                </VChip>
              </template>

              <!-- Is Active -->
              <template #item.is_active="{ item }">
                {{ item.raw?.is_active ? $t('yes') : $t('no') }}
              </template>

              <!-- Currency -->
              <template #item.currency="{ item }">
                <!-- {{ $t(item.raw?.currency) }} -->
                {{ item.raw?.currency }}
              </template>

              <template #bottom />

              <!-- Actions -->
              <template #item.actions="{ item }">
                <VTooltip :text="$t('marketing-consultation-order.create')">
                  <template #activator="{ props }">
                    <!-- <IconBtn size="large" color="success" v-bind="props" @click="handleCreate(item)">
                      <VIcon icon="material-symbols:add" />
                    </IconBtn> -->
                    <button size="large" color="success" v-bind="props" @click="handleCreate(item)">
                      <VIcon icon="material-symbols:add" />
                    </button>
                  </template>
                </VTooltip>

                <VDialog v-model="isDialogVisible" width="90vh" max-height="70vh">
                  <!-- Activator -->
                  <template #activator="{ props: activatorProps }">
                    <VTooltip :text="$t('marketing-consultation.show-questions')">
                      <template #activator="{ props }">
                        <!-- <IconBtn size="large" color="primary" v-bind="{ ...props, ...activatorProps }">
                          <VIcon icon="carbon:view" />
                        </IconBtn> -->
                        <button size="large" color="primary" v-bind="{ ...props, ...activatorProps }">
                          <VIcon icon="carbon:view" />
                        </button>
                      </template>
                    </VTooltip>
                  </template>

                  <!-- Dialog close btn -->
                  <!-- <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" /> -->

                  <!-- Dialog Content -->
                  <VCard :title="$t('marketing-consultation.view-questions-modal.title')">
                    <VCardText>
                      <MarketingConsultationQuestionsList :questions="item.raw?.questions" />
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
