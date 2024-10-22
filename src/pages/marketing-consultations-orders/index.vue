<script setup>
  import emailSvg from '@images/svg/email-marketing.svg'
  import { localeTitle } from '@/composable/utils'
  import MarketingConsultationsService from '@/services/marketing-consultations-service'
  import MarketingConsultationsOrdersService from '@/services/marketing-consultations-orders-service'
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
  const answers = ref([])

  const setSelected = clicked => {
    clicked.id === selected.value?.id
      ? (selected.value = null)
      : (selected.value = clicked)

    answers.value = selected.value?.questions?.map(question => ({
      question_id: question.id,
    }))
  }

  const router = useRouter()

  const { run: createOrder, loading } = useRequest(
    data => MarketingConsultationsOrdersService.create(data),
    {
      manual: true,
      onSuccess: res => {
        const { data, error, messages } = res.data
        if (error) {
          show(messages[0], 'error')

          return
        }
        router.push({ name: '/marketing-consultations-orders/' })
      },
    }
  )

  const onSubmit = () => {
    createOrder({
      marketing_consultation_id: selected.value?.id,
      answers: answers.value,
    })
  }
</script>

<template>
  <VCard>
    <VCardTitle class="font-weight-medium text-surface-variant pa-6">
      {{ $t("newConsultOrder") }}
    </VCardTitle>

    <VDivider class="mx-6" />

    <VCardText>
      <VForm ref="refVForm" @submit.prevent="onSubmit">
        <VRow>
          <VCol class="align-self-center" cols="12" lg="4">
            <section
              class="d-flex flex-column align-center justify-center ga-10 text-center pa-6"
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
                  type="button"
                  @click="setSelected(consult)"
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
                  <template
                    v-for="(question, i) in selected?.questions"
                    :key="i"
                  >
                    <AppTextField
                      v-if="question.type === 'Text'"
                      v-model="answers[i].answer_text"
                      bordered
                      :label="question[localeTitle]"
                      :placeholder="$t('writeYourAnswer')"
                    />

                    <AppChipSelect
                      v-if="question.type === 'SingleChoice'"
                      v-model="answers[i].selected_choice_id"
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
                  </template>
                </VCol>
              </template>
            </VRow>
          </VCol>
          <VCol cols="12">
            <VCardActions class="justify-end">
              <VBtn
                :text="$t('back')"
                :to="{ name: '/marketing-consultations/' }"
              />
              <VBtn
                class="px-4"
                color="primary"
                :disabled="loading"
                :loading="loading"
                rounded
                type="submit"
                variant="flat"
              >
                {{ $t("sendOrder") }}
                <VIcon class="ms-2" icon="tabler-arrow-left" />
              </VBtn>
            </VCardActions>
          </VCol>
        </VRow>
      </VForm>
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
