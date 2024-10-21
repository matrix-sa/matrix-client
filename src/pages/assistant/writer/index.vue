<script>
  import Header from '@/components/digital-writer/Header.vue'
  import Tabs from '@/components/digital-writer/Tabs.vue'
  import { ref } from 'vue'
  import Questions from '@/components/digital-writer/Questions.vue'
  export default {
    setup () {
      const activeItem = ref(0) // Reactive state for the active item

      // Correct the method name
      const updateActiveTab = itemValue => {
        activeItem.value = itemValue
      }

      return {
        activeItem,
        updateActiveTab, // Use the corrected method name
      }
    },
  }
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
            <Tabs @update-active-tab="updateActiveTab" />
          </v-col>
          <v-col cols="9">
            <Questions :active-item="activeItem" />
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
  background-color: #FFF;
  padding: 24px;
  border-radius: 16px;

  .separator {
    border-color: $borderColor;
  }

}
</style>
