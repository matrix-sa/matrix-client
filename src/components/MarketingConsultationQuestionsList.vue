<script setup>
import { useI18n } from 'vue-i18n'



const props = defineProps({
  questions: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['questionDeleted'])

const { t } = useI18n()
</script>

<template>
  <VListItem v-for="(question, i) in props.questions" :key="i" color="primary" density="compact" link>
    <div class="d-flex justify-space-between align-center ma-2">
      <div>
        <VListItemTitle>
          <span class="subtitle-1 text-warning">
            {{ $t("marketing-consultation.english_question_title_label") }}:
          </span>
          <span class="body-1 text-secondary" dir="ltr">
            {{ question.english_title }}
          </span>
        </VListItemTitle>
        <VListItemTitle>
          <span class="subtitle-1 text-warning">
            {{ $t("marketing-consultation.arabic_question_title_label") }}:
          </span>
          <span class="body-1 text-secondary" dir="rtl">
            {{ question.arabic_title }}
          </span>
        </VListItemTitle>
        <template v-if="question.type === 'SingleChoice'">
          <VListSubheader>
            {{ $t("marketing-consultation.choices_header") }}
          </VListSubheader>
          <template v-for="(choice, choiceIndex) of question.choices" :key="choiceIndex">
            <VCard class="mb-3" outlined>
              <VCardText>
                <span class="subtitle-1 text-warning">
                  {{
                    $t("marketing-consultation.english_choice_title_label")
                  }}:
                </span>
                <span class="body-1 text-secondary">
                  {{ choice.english_title }}
                </span>
              </VCardText>
              <VCardText>
                <span class="subtitle-1 text-warning">
                  {{ $t("marketing-consultation.arabic_choice_title_label") }}:
                </span>
                <span class="body-1 text-secondary" dir="rtl">
                  {{ choice.arabic_title }}
                </span>
              </VCardText>
            </VCard>
          </template>
        </template>
      </div>
    </div>
  </VListItem>
</template>
