<script setup>
import emailSvg from "@images/svg/email-marketing.svg";
import { localeTitle } from "@/composable/utils";
import MarketingConsultationsService from "@/services/marketing-consultations-service";
import { useConsultationsStore } from "@/stores/useConsultationsStore";
import { useRequest } from "vue-request";
import { locale } from "core-js";

const consultationsStore = useConsultationsStore();

const consultations = ref([]);
const {
  run: fetchMarketingConsultations,
  loading: marketingConsultationsLoading,
} = useRequest((params) => MarketingConsultationsService.getAll(params), {
  onSuccess: (res) => {
    const { data, error, message } = res.data;
    consultations.value = data;
  },
});

const selected = ref(null);
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
            <VImg :src="emailSvg" height="138" width="194" />
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
                <VImg :src="consult.icon_url" height="48" width="48" />
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
                    :label="question[localeTitle]"
                    :placeholder="$t('writeYourAnswer')"
                  />
                  <VRadioGroup
                    v-if="question.type === 'SingleChoice'"
                    :label="question[localeTitle]"
                  >
                    <VRadio
                      v-for="(choice, choiceIndex) of question.choices"
                      :key="choiceIndex"
                      color="primary"
                      :label="choice[localeTitle]"
                      :value="choice[localeTitle]"
                    />
                  </VRadioGroup>
                </form>
              </VCol>
            </template>
          </VRow>
        </VCol>
        <VCol cols="12">
          <VCardActions class="justify-end">
            <VBtn :text="$t('back')" />
            <VBtn rounded color="primary" variant="flat" class="px-4">
              {{ $t("sendOrder") }}
              <VIcon icon="tabler-arrow-left" class="ms-2" />
            </VBtn>
          </VCardActions>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
