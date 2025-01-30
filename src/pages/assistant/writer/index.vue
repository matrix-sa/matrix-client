<script setup>
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useRequest } from 'vue-request'
  import DigitalWriterService from '@/services/digital-writer-service'
  import { useRouter } from 'vue-router'

  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  // Reactive state
  const activeItem = ref(0)
  const isShowAnswers = ref(false)
  const isUserHaveSubscribtion = ref(true)
  const messagesHistory = ref([])
  const chatResult = ref(null)
  const tabsRef = ref({ activeItem: null })
  const conversations = ref([])
  const router = useRouter()

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

  const checkIfUserSubscribe = val => {
    isUserHaveSubscribtion.value = val
  }

  const goCheckout = () => {
    router.push(`/checkout/`)
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
  <div class="main-wrapper">
    <div v-if="!isUserHaveSubscribtion" class="alert-wrapper mb-5">
      <v-alert density="compact" type="warning">
        <template #icon>

          <v-icon class="custom-icon" color="red" size="36">mdi-alert-circle</v-icon>

        </template>
        <div class="d-flex justify-space-between align-center">

          <span>{{ $t('not_subscribe_writer') }}</span>
          <v-btn color="primary" rounded @click="goCheckout">
            {{ $t('Checkout') }}
          </v-btn>
        </div>
      </v-alert>
    </div>
    <div class="d-flex flex-column writer-wrapper position-relative">
      <div v-if="!isUserHaveSubscribtion" class="position-absolute overlay-not-subscribe" />
      <WriterHeader />
      <hr class="separator">
      <div class="writter-section-wrapper d-flex">
        <v-row class="row" gap="16px">
          <v-col cols="3">
            <!-- Use the corrected event name -->
            <Tabs
              ref="tabsRef"
              :conversations="conversations"
              @check-if-user-subscribe="checkIfUserSubscribe"
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
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$borderColor: rgba(31, 22, 37, 0.1);

.main-wrapper {
  .v-alert__prepend {
    margin-top: 5px !important
  }

  .writer-wrapper {
    gap: 16px;
    background-color: #fff;
    padding: 24px;
    border-radius: 16px;

    .separator {
      border-color: $borderColor;
    }

    .overlay-not-subscribe {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 999;
      border-radius: 16px;

      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(13px);
      -webkit-backdrop-filter: blur(13px);
    }
  }
}
</style>
