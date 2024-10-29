<script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'

  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  const activeItem = ref(0) // Reactive state for the active item
  const isShowAnswers = ref(false)
  const messagesHistory = ref([])

  const chatResult = ref(null)

  const callScrollChatToTop = () => {
    chatResult?.value?.scrollToBottom() // Call the child method
  }

  // Correct the method name
  const updateActiveTab = (itemValue, isHistory) => {
    activeItem.value = itemValue

    if (isHistory == undefined) {
      isShowAnswers.value = true
    } else {
      isShowAnswers.value = false
    }
  }

  const updateMessagesHistory = data => {
    messagesHistory.value = data
    setTimeout(() => callScrollChatToTop(), 100)
  }

  const pushInFront = data => {
    messagesHistory.value.messages.push(data)
  }

  const showAnswers = data => {
    messagesHistory.value = data
    activeItem.value = 0
    isShowAnswers.value = true
  }

  watch(
    locale,
    () => {
      update([
        {
          title: t('digital_writer'),
          active: false,
          to: '/assistant/writer/',
        },
      ])
    },
    { immediate: true }
  )

</script>

<template>
  <div class="d-flex flex-column writer-wrapper">

    <Header />
    <hr class="separator">
    <div class="writter-section-wrapper d-flex">
      <v-container>
        <v-row class="row" gap="16px">
          <v-col cols="3">
            <!-- Use the corrected event name -->
            <Tabs @update-active-tab="updateActiveTab" @update-messages-history="updateMessagesHistory" />
          </v-col>
          <v-col cols="9">
            <ChatResult
              v-if="isShowAnswers"
              ref="chatResult"
              :active-item="activeItem"
              :messages-history="messagesHistory"
              @push-in-front="pushInFront"
              @update-messages-history="updateMessagesHistory"
            />
            <Questions v-else :active-item="activeItem" @show-answers="showAnswers" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$borderColor: rgba(31, 22, 37, 0.1);

.writer-wrapper {
  gap: 16px;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;

  .separator {
    border-color: $borderColor;
  }
}
</style>
