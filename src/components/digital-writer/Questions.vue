<script setup>
// No need to import defineProps in <script setup>
  import { useI18n } from 'vue-i18n'
  import Question from './Question.vue'
  import DigitalWriterService from '@/services/digital-writer-service'
  import { useRequest } from 'vue-request'

  // Define props directly in script setup
  const props = defineProps(['activeItem'])
  const emit = defineEmits(['showAnswers', 'getConversationsAfterStart'])
  const { t } = useI18n()

  const sharedQuestion = {
    id: 6,
    type: 'select',
    key: 'dialect',
    question: t('preferred_dialect'),
    items: [
      { id: 1, text: t('saudi_dialect') },
      { id: 2, text: t('ordinary_language') },
      { id: 3, text: t('white_language') },
    ],
  }
  const questions = ref([
    [
      {
        id: 1,
        type: 'text',
        key: 'product_or_service',
        question: t('what_is_the_product_or_service_provided'),
        placeholder: t('p1'),
      },
      {
        id: 2,
        type: 'text',
        key: 'problem_solved',
        question: t('what_problem_does_the_product_or_service_solve'),
        placeholder: t('p2'),
      },
      {
        id: 3,
        type: 'text',
        key: 'target_audience',
        question: t('who_is_the_target_audience'),
        placeholder: t('p3'),
      },
      {
        id: 4,
        type: 'text',
        key: 'promotional_offer',
        question: t('what_is_a_special_promotion'),
        placeholder: t('p4'),
      },
      {
        id: 5,
        type: 'text',
        key: 'specific_message',
        question: t('is_there_a_specific_message_you_want_to_convey_to_the_audience'),
        placeholder: t('p5'),
      },
      sharedQuestion,
    ],
    [
      {
        id: 1,
        type: 'text',
        key: 'technical_specifications',
        question: t('what_are_the_technical_specifications_or_basic_details_of_the_product'),
        placeholder: t('p1'),
      },
      {
        id: 2,
        type: 'text',
        key: 'key_benefits',
        question: t('what_are_the_main_benefits_the_user_will_get'),
        placeholder: t('p2'),
      },
      {
        id: 3,
        type: 'text',
        key: 'product_differentiation',
        question: t('how_is_the_product_different_from_competitors'),
        placeholder: t('p6'),
      },
      {
        id: 4,
        type: 'text',
        key: 'ideal_audience',
        question: t('who_is_the_ideal_audience_to_benefit_from_this_product'),
        placeholder: t('p3'),
      },
      {
        id: 5,
        type: 'text',
        key: 'specific_message',
        question: t('is_there_a_specific_message_you_want_to_convey_to_the_audience'),
        placeholder: t('p5'),
      },
      sharedQuestion,
    ],
    [
      {
        id: 1,
        type: 'text',
        key: 'product_or_service',
        question: t('what_is_the_product_or_service_provided'),
        placeholder: t('p1'),
      },
      {
        id: 2,
        type: 'text',
        key: 'core_message',
        question: t('what_is_the_main_story_or_message_you_want_to_communicate'),
        placeholder: t('p5'),
      },
      {
        id: 3,
        type: 'text',
        key: 'target_market',
        question: t('who_is_the_target_audience'),
        placeholder: t('p3'),
      },
      {
        id: 4,
        type: 'text',
        key: 'ad_duration_in_seconds',
        question: t('what_is_the_duration_of_the_ad_in_seconds'),
        placeholder: t('p7'),
      },
      {
        id: 5,
        type: 'text',
        key: 'desired_emotion',
        question: t('What_feeling_or_emotion_should_the_video_generate'),
        placeholder: t('p8'),
      },
      {
        id: 6,
        type: 'select',
        key: 'preferred_ad_style',
        question: t('what_is_the_preferred_advertising_method'),
        items: [
          { id: 1, text: t('social_media') },
          { id: 2, text: t('blogs') },
          { id: 3, text: t('personal_promotion') },
          { id: 4, text: t('other') },
        ],
      },
      sharedQuestion,
    ],
    [
      {
        id: 1,
        type: 'text',
        key: 'design_purpose',
        question: t('what_is_the_purpose_of_the_design_ad_social_media_post_profile'),
        placeholder: t('p9'),
      },
      {
        id: 2,
        type: 'text',
        key: 'service_provided',
        question: t('what_is_the_product_or_service_provided'),
        placeholder: t('p1'),
      },
      {
        id: 3,
        type: 'text',
        key: 'target_customers',
        question: t('who_is_the_target_audience'),
        placeholder: t('p3'),
      },
      {
        id: 4,
        type: 'text',
        key: 'promotional_feature',
        question: t('what_is_a_promotion_discount_free_benefit'),
        placeholder: t('p4'),
      },
      {
        id: 5,
        type: 'text',
        key: 'focused_message',
        question: t('is_there_a_particular_message_you_want_to_focus_on'),
        placeholder: t('p5'),
      },
      sharedQuestion,
    ],
    [
      {
        id: 1,
        type: 'text',
        key: 'landing_page_goal',
        question: t('what_is_the_purpose_of_a_landing_page'),
        placeholder: t('p10'),
      },
      {
        id: 2,
        type: 'text',
        key: 'landing_product_or_service',
        question: t('what_is_the_product_or_service_provided'),
        placeholder: t('p11'),
      },
      {
        id: 3,
        type: 'text',
        key: 'benefits',
        question: t('what_are_the_benefits_of_the_product_or_service'),
        placeholder: t('p12'),
      },
      {
        id: 4,
        type: 'text',
        key: 'landing_target_audience',
        question: t('who_is_the_target_audience'),
        placeholder: t('p3'),
      },

      {
        id: 5,
        type: 'text',
        key: 'value_proposition',
        question: t('what_is_the_offer_or_value_provided_to_the_audience'),
        placeholder: t('p4'),
      },

      {
        id: 6,
        type: 'text',
        key: 'expected_action',
        question: t('what_action_is_required_of_the_visitor'),
        placeholder: t('p13'),
      },
      {
        id: 7,
        type: 'text',
        key: 'differentiation',
        question: t('what_distinguishes_your_product_or_service_from_competitors'),
        placeholder: t('p5'),
      },
      sharedQuestion,

    ],
  ]) // Reactive state for the active item

  const serviceTypes = ref([
    'AdContent',
    'ProductDescription',
    'AdScenario',
    'DesignContent',
    'LandingPage',
  ])

  // Update the corresponding question object when input changes
  const updateQuestion = ({ id, value }) => {
    const activeQuestions = questions.value[props.activeItem]
    const question = activeQuestions.find(q => q.id === id)
    if (question) {
      question.value = value
    }
  }

  // Log questions array for testing
  const logQuestions = () => {
    const service_type = serviceTypes.value[props.activeItem]
    const questionArrIndex = props.activeItem

    // Create an empty object to hold the result
    const requestData = {}

    // Loop over the array and assign key-value pairs
    questions.value[questionArrIndex].forEach(item => {
      requestData[item?.key] = item?.value
    })

    create({ service_type, ...requestData })
  }

  const { run: create, loading: startLoading } = useRequest(
    data => DigitalWriterService.run(data),
    {
      manual: true,
      onSuccess: res => {
        const { error, data, messages, code } = res.data
        if (error) {
        // show(messages[0], "error")
        }

        if (data) {
          emit('showAnswers', data)
          emit('getConversationsAfterStart')
        }
      },
    },
  )

  const isAllQuestionsAnswered = computed(() => {
    const activeQuestions = questions.value[props.activeItem]
    return activeQuestions.every(
      obj => obj.hasOwnProperty('value') && (!!obj.value || obj.value == 0)
    )
  })

</script>

<template>
  <div class="writer-content pa-4 d-flex flex-column">
    <div class="questions-container d-flex flex-column">
      <div v-for="q in questions[activeItem]" :key="q.id">
        <Question :q="q" @update:question-value="updateQuestion" />
      </div>
    </div>
    <div class="btn-container d-flex justify-end">
      <VBtn
        class="d-flex align-center"
        color="#FB813E"
        :disabled="startLoading || !isAllQuestionsAnswered"
        :loading="startLoading"
        @click="logQuestions"
      >
        <svg
          class="icon"
          fill="none"
          height="21"
          viewBox="0 0 20 21"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M15.7383 20.4076C14.9512 20.1079 14.2801 19.7199 13.7515 19.3561C12.5921 19.8276 11.3253 20.087 10 20.087C4.47715 20.087 0 15.5904 0 10.0435C0 4.49664 4.47715 0 10 0C15.5228 0 20 4.49664 20 10.0435C20 12.1242 19.3691 14.0594 18.289 15.6634C18.2205 16.9897 18.914 18.1881 19.6338 19.2485C20.2643 20.1772 20.1061 20.9256 18.9305 20.9925C18.4036 21.0225 17.2639 20.9886 15.7383 20.4076ZM5.45455 7.30438C4.95247 7.30438 4.54545 7.71316 4.54545 8.21743C4.54545 8.7217 4.95247 9.13047 5.45455 9.13047H14.5455C15.0475 9.13047 15.4545 8.7217 15.4545 8.21743C15.4545 7.71316 15.0475 7.30438 14.5455 7.30438H5.45455ZM5.45455 10.9566C4.95247 10.9566 4.54545 11.3653 4.54545 11.8696C4.54545 12.3739 4.95247 12.7827 5.45455 12.7827H14.5455C15.0475 12.7827 15.4545 12.3739 15.4545 11.8696C15.4545 11.3653 15.0475 10.9566 14.5455 10.9566H5.45455Z"
            fill="white"
            fill-rule="evenodd"
          />
        </svg>
        <span class="mr-2">{{ t('start_the_conversation') }}</span>
      </VBtn>
    </div>

  </div>
</template>

<style scoped lang="scss">
.writer-content {
  background-color: rgb(var(--v-theme-background));
  border-radius: 16px;
  gap: 24px;
}

.questions-container {
  gap: 16px;
}

.btn-container {
  button {
    border-radius: 50px;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: bold;
    height: 40px;
    box-shadow: none;

  }
}
</style>
