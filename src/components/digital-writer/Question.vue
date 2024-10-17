<script setup>
// No need to import defineProps in <script setup>

// Define props directly in script setup
const props = defineProps(['q'])

</script>

<template>
  <div class="question-wrapper d-flex flex-column">
    <div class="question d-flex">
      <span class="q-num">{{ q.id }}</span>
      <p class="q-text">{{ q.question }}</p>
    </div>

    <div class="question-solution d-flex">

      <input type="text" :placeholder="q.placeholder" v-if="q.type == 'text'" />

      <v-btn-toggle v-if="q.type == 'select'" class="select">
        <v-btn v-for="i in q.items" :key="i.id">
          {{ i.text }}
        </v-btn>
      </v-btn-toggle>

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
