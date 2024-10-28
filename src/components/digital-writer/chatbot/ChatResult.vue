<script setup>
  defineProps({
    messagesHistory: {
      type: Object,
      default: {},
    },
  })
</script>

<template>
  <div class="chat-container pa-4 d-flex flex-column g-6">
    <ChatHeader />
    <div class="chat-inner  d-flex flex-column g-6">
      <ExpansionPanel :messages="messagesHistory?.request_questions" />
    </div>

    <div v-for="message in messagesHistory.messages" :key="message.id">
      <MatrixDigitalWriter v-if="message.role == 'Asistant'" :message="message.content" />
      <UserCard v-if="message.role == 'User'" :message="message.content" />
    </div>

    <Form />
  </div>
</template>

<style scoped>
.chat-container {
  background-color: rgb(var(--v-theme-background));
  border-radius: 16px;
  gap: 24px;
}
</style>
