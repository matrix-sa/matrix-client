<template>
  <div class="chat-container pa-4 d-flex flex-column g-6">
    <ChatHeader />
    <div class="chat-inner  d-flex flex-column g-6">
      <ExpansionPanel />
    </div>

    <MatrixDigitalWriter />
    <UserCard />
    <MatrixDigitalWriter />

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
