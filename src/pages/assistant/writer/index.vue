<script setup>
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useRequest } from 'vue-request'
  import DigitalWriterService from '@/services/digital-writer-service'

  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  // Reactive state
  const activeItem = ref(0)
  const isShowAnswers = ref(false)
  const messagesHistory = ref([])
  const chatResult = ref(null)
  const tabsRef = ref({ activeItem: null })
  const conversations = ref([])

  // Methods
  const callScrollChatToTop = () => {
    chatResult?.value?.scrollToBottom()
  }

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

  const getConversationsAfterStart = () => {
    // Request to get all conversations
    const { run: getAllConversations } = useRequest(
      () => DigitalWriterService.getConversations(),
      {
        onSuccess: res => {
          const { data } = res.data
          conversations.value = data.items
          tabsRef.value.activeItem = data.items[0]?.id
          activeItem.value = data.items[0]?.id
          if (data.items.length > 0) {
            // Request to fetch the first conversation details
            useRequest(
              () => DigitalWriterService.getConversationById({ id: data.items[0]?.id }),
              {
                onSuccess: msgsRes => {
                  updateMessagesHistory(msgsRes.data.data)
                  isShowAnswers.value = true
                },
              }
            )
          }
        },
      }
    )
  }

  // Watch locale for breadcrumbs update
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

// Trigger conversation loading
// getConversationsAfterStart()
</script>

<template>
  <div class="d-flex flex-column writer-wrapper">

    <WriterHeader />
    <hr class="separator">
    <div class="writter-section-wrapper d-flex">
      <v-container>
        <v-row class="row" gap="16px">
          <v-col cols="3">
            <!-- Use the corrected event name -->
            <Tabs
              ref="tabsRef"
              :conversations="conversations"
              @update-active-tab="updateActiveTab"
              @update-messages-history="updateMessagesHistory"
            />
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
            <Questions
              v-else
              :active-item="activeItem"
              @get-conversations-after-start="getConversationsAfterStart"
              @show-answers="showAnswers"
            />
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
