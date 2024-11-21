<script setup>
import { ref } from 'vue'
import DigitalWriterService from '@/services/digital-writer-service'
import { useRequest } from 'vue-request'

const emit = defineEmits(['emitPushInFront', 'updateMessagesHistory', 'scrollToBottom'])

// Define props using defineProps
const props = defineProps({
  chatId: {
    type: String || undefined,
    required: false,
  },
  activeItem: {
    required: true,
  },
})

const message = ref('')
const { run: sendMessage, loading } = useRequest(
  data => DigitalWriterService.askQuestion(data),
  {
    manual: true,
    onSuccess: response => {
      fetchConversationById()
    },
  }
)

const { run: fetchConversationById, loading: loadConversation } = useRequest(
  () => DigitalWriterService.getConversationById({ id: props.chatId ? props.chatId : props.activeItem }),
  {
    manual: true,
    onSuccess: res => {
      emit('updateMessagesHistory', res.data.data)
      emit('scrollToBottom')
    },
  }
)

const handleSendMessage = () => {
  const messageVal = {
    message: message.value,
    id: props.chatId,
  }
  emit('emitPushInFront', { id: props.chatId, content: message.value, role: 'User' })
  message.value = ''
  sendMessage(messageVal)
  emit('scrollToBottom')
}
</script>
<template>
  <div class="main-container">
    <VTextField v-model="message" class="text-input chat elevated-input" :placeholder="$t('enter_text_here')" v-bind="{
      'bg-color': '#fff',
      flat: true,
      variant: 'plain',
      rounded: true
    }" @keyup.enter="handleSendMessage" />
    <div class="btn-con">
      <VBtn class="custom-btn" color="orange" :loading="loading" @click="handleSendMessage">
        {{ $t('chat_message_send_btn') }}
        <VIcon class="icon-send" icon="tabler-send-2" />
      </VBtn>
    </div>
  </div>
</template>

<style lang="scss">
.v-text-field input {
  padding-top: 0 !important;
  padding-right: 12px !important;
  border-radius: 200px;
}

.main-container {
  position: relative;
}

.elevated-input .v-field__outline {
  box-shadow: 0px 6px 12px 0px #00000026;
  border-radius: 100px !important;
}

.custom-btn {
  position: absolute;
  top: 50.5%;
  transform: translateY(-80%);
  width: 104px !important;
  height: 40px !important;
  gap: 8px;
  left: 8px;
  border-radius: 200px;
  color: #FFF !important;
  font-size: 16px;
}

.icon-send {
  transform: rotate(180deg);
}
</style>
