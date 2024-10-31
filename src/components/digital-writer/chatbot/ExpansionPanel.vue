<script setup>
  import expIcon from '@/assets/digital-writer/exp-icon.svg'
  import arrowUp from '@/assets/digital-writer/arrow-up.svg'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  defineProps({
    messages: {
      type: Array,
      default: [],
    },
  })

  const isExpanded = ref(false)

  const { t } = useI18n()

</script>
<template>
  <v-expansion-panels class="exp-container">
    <v-expansion-panel v-model="isExpanded">
      <v-expansion-panel-title>
        <div class="exp-title d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <img alt="upload image" class="mr-2" :src="expIcon">
            <span>{{ t('my_answers_title') }}</span>
          </div>
          <img alt="arrow icon" height="20" :src="isExpanded ? arrowUp : arrowUp" width="20">
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <ul class="q-and-a d-flex flex-column">
          <li v-for="(q, index) in messages" key="q.id">
            <div class="d-flex q-wrapper">
              <span class="q-num">
                {{ index + 1 }}
              </span>
              <div class="d-flex flex-column text-wrapper">
                <h6>{{ q.question }}</h6>
                <p>{{ q.answer }}</p>
              </div>
            </div>
          </li>
        </ul>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

</template>

<style lang="scss">
.exp-container {

  .v-expansion-panel-title {
    background-color: transparent !important;
    box-shadow: none !important
  }

  .v-expansion-panel-text__wrapper {
    padding-top: 0 !important
  }

  .exp-title {

    &>div {
      gap: 8px;
    }

    width: 100%;

    span {
      font-weight: 500;
      line-height: 16.8px;
    }
  }

  .v-expansion-panel {
    background-color: #EFECF6 !important;
    border: 1px solid #CFCFCF !important;
    border-radius: 12px
  }

  .v-expansion-panel__shadow {
    box-shadow: none !important
  }

  .v-expansion-panel-title__icon {
    display: none;
  }

  .q-and-a {
    list-style: none;
    border-top: 1px solid #1F16251A;
    padding-top: 16px;
    gap: 8px;

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

    .q-wrapper {
      gap: 8px;

      .text-wrapper {
        gap: 8px;

      }
    }

    h6 {
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
    }

    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      text-align: right;
    }
  }

}
</style>
