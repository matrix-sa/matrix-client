<script setup>
  import emailSvg from '@images/svg/email-marketing.svg'
  import { localeTitle } from '@/composable/utils'
  import MarketingConsultationsService from '@/services/marketing-consultations-service'
  import { useConsultationsStore } from '@/stores/useConsultationsStore'
  import { useRequest } from 'vue-request'

  const consultationsStore = useConsultationsStore()

  const consultations = ref([])
  const {
    run: fetchMarketingConsultations,
    loading: marketingConsultationsLoading,
  } = useRequest(params => MarketingConsultationsService.getAll(params), {
    onSuccess: res => {
      const { data, error, message } = res.data
      consultations.value = data
    },
  })

  const selected = ref(null)
</script>

<template>
  <VCard>
    <VCardTitle class="font-weight-medium text-surface-variant pa-6">
      {{ $t("newConsultOrder") }}
    </VCardTitle>

    <VDivider class="mx-6" />

    <VCardText>
      <VRow>
        <VCol cols="12" lg="4">
          <section
            class="d-flex flex-column align-center justify-center ga-10 text-center px-6"
          >
            <VImg height="138" :src="emailSvg" width="194" />
            <h5 class="text-body-1">{{ $t("fillInfoToOrderConsult") }}</h5>
          </section>
          <!-- <VDivider vertical /> -->
        </VCol>

        <VCol cols="12" lg="8">
          <h5 class="text-body-2 mb-3">{{ $t("selectConsultType") }}</h5>
          <VRow>
            <VCol
              v-for="consult in consultations"
              :key="consult.id"
              cols="6"
              sm="3"
            >
              <button
                class="w-100 d-flex flex-column justify-center align-center ga-4 bg-background rounded-lg pa-4 text-center h-100"
                :class="
                  selected?.id === consult.id
                    ? 'border-md border-primary border-opacity-100'
                    : 'border-sm border'
                "
                @click="selected = consult"
              >
                <VImg height="48" :src="consult.icon_url" width="48" />
                <span
                  :class="
                    selected?.id === consult.id
                      ? 'text-primary font-weight-bold'
                      : 'text-black font-weight-medium'
                  "
                >
                  {{ consult[localeTitle] }}
                </span>
              </button>
            </VCol>
            <template v-if="selected">
              <VCol cols="12">
                <form v-for="(question, i) in selected?.questions" :key="i">
                  <ApptextField
                    v-if="question.type === 'Text'"
                    bordered
                    :label="question[localeTitle]"
                    :placeholder="$t('writeYourAnswer')"
                  />

                  <!-- v-model="" -->
                  <AppChipSelect
                    v-if="question.type === 'SingleChoice'"
                    :items="
                      question.choices?.map((item) => {
                        return {
                          id: item.id,
                          title: item[localeTitle],
                        };
                      })
                    "
                    :label="question[localeTitle]"
                  />
                </form>
              </VCol>
            </template>
          </VRow>
        </VCol>
        <VCol cols="12">
          <VCardActions class="justify-end">
            <VBtn :text="$t('back')" />
            <VBtn class="px-4" color="primary" rounded variant="flat">
              {{ $t("sendOrder") }}
              <VIcon class="ms-2" icon="tabler-arrow-left" />
            </VBtn>
          </VCardActions>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style scoped>
:deep(.v-radio-group > .v-input__control > .v-label) {
  font-size: 14px;
}

:deep(.app-chip-select .v-label),
:deep(.app-text-field .v-label) {
  opacity: 1;
  color: #1f1625 !important;
}
</style>
