<script setup>
  const emit = defineEmits(['updateMessageHistory', 'pushInFront'])

  const props = defineProps({
    messagesHistory: {
      type: Object,
      default: {},
    },
    activeItem: {
      type: String,
      required: true,
    },
  })

  const writerWrapper = ref(null)

  const emitUpdateMessagesHistory = newMessageHistory => {
    emit('updateMessagesHistory', newMessageHistory)
    setTimeout(() => {
      scrollToBottom()
    }, 10)
  }

  const emitPushInFront = newMessageHistory => {
    emit('pushInFront', newMessageHistory)
    setTimeout(() => {
      scrollToBottom()
    }, 10)
  }

  const scrollToBottom = () => {
    writerWrapper.value.scrollTop = writerWrapper.value.scrollHeight + 1000
  }

  defineExpose({
    scrollToBottom,
  })

  const conditionalStyle = computed(() => ({
    ...((props.messagesHistory?.messages?.length > 0 ||
      !props.messagesHistory?.messages ||
      props.messagesHistory?.messages == 0) && { top: '100%' }),
  }))

</script>

<template>
  <div ref="writerWrapper" class="chat-container pa-4 d-flex flex-column g-6">
    <ChatHeader />
    <div v-if="messagesHistory?.request_questions" class="chat-inner  d-flex flex-column g-6">
      <ExpansionPanel :messages="messagesHistory?.request_questions" />
    </div>

    <div v-for="message in messagesHistory.messages" :key="message.id">
      <MatrixDigitalWriter v-if="message.role == 'Asistant'" :message="message.content" />
      <UserCard v-if="message.role == 'User'" :message="message.content" />
    </div>

    <div class="form-wrapper" :style="conditionalStyle">
      <Form
        :active-item="activeItem"
        :chat-id="messagesHistory?.conversation_id ? messagesHistory?.conversation_id : messagesHistory?.id"
        @emit-push-in-front="emitPushInFront"
        @scroll-to-bottom="scrollToBottom"
        @update-messages-history="emitUpdateMessagesHistory"
      />
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  background-color: rgb(var(--v-theme-background));
  border-radius: 16px;
  gap: 24px;
  position: relative;
  height: calc(95vh);
  min-height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c0c0c0;
    border-radius: 8px;

    &:hover {
      background-color: #a0a0a0;
    }
  }

  scrollbar-width: thin;
  scrollbar-color: #c0c0c0 #f0f0f0;

  .form-wrapper {
    position: sticky;
    transform: translateY(20px);
    width: 100%;
    left: 0;
    padding-top: 12px;
    background-color: rgb(var(--v-theme-background))
  }
}
</style>
