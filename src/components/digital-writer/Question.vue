<script setup>
// No need to import defineProps in <script setup>

// Define props directly in script setup
  const props = defineProps(['q'])

  const emit = defineEmits(['update:questionValue'])

  const updateValue = value => {
    emit('update:questionValue', { id: props.q.id, value })
  }

</script>

<template>
  <div class="question-wrapper d-flex flex-column">
    <div class="question d-flex">
      <span class="q-num">{{ q.id }}</span>
      <p class="q-text">{{ q.question }}</p>
    </div>

    <div class="question-solution d-flex">

      <input
        v-if="q.type == 'text'"
        v-model="q.value"
        :placeholder="q.placeholder"
        type="text"
        @input="updateValue($event.target.value)"
      >

      <VBtn-toggle v-if="q.type == 'select'" v-model="q.value" class="select">
        <VBtn v-for="i in q.items" :key="i.id">
          {{ i.text }}
        </VBtn>
      </VBtn-toggle>

    </div>
  </div>
</template>

<style scoped lang="scss">
.question-wrapper {
  gap: 12px;
}

.question {
  gap: 8px;
  background-color: #FB813E1A;
  padding: 16px;
  border-radius: 50px;
}

.q-num {
  background-color: rgb(var(--v-theme-warning));
  display: block;
  color: #FFF;
  width: 24px;
  height: 24px;
  border-radius: 50px;
  text-align: center;
  font-size: 16px;
  font-weight: 700
}

.q-text {
  font-size: 16px;
  font-weight: 700;
  color: rgb(var(--v-dark-1));
}

input {
  background-color: #EFECF6;
  flex: 1;
  border-radius: 12px;
  padding: 16px;
  outline: 0
}

.select {
  gap: 12px;

  button {
    background-color: #EFECF6;
    border-radius: 12px !important;
    border: 1px solid #D5D5D5 !important;
    font-size: 16px;
    color: rgb(var(--v-theme-on-background));
  }
}
</style>
