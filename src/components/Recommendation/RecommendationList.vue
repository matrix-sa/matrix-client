<script setup>
  import icon from '@/assets/recommendations.svg'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  defineProps({
    recommendations: {
      type: Array,
      required: true,
    },
  })
</script>

<template>
  <v-card class="recommendations-card" elevation="0">
    <v-card-title class="recommendations-title">
      <img height="40" :src="icon">
      {{ t('useful_recommendations').split(' ')[0] }}
      <span>{{ t('useful_recommendations').split(' ')[1] }}</span>

    </v-card-title>
    <v-card-text>
      <v-list class="list">
        <v-list-item v-for="(item) in recommendations" :key="item.id">
          <div>
            <p class="recommendation-text"> <span class="dot" /> {{ t(item.text) }}</p>
          </div>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.recommendations-card {
  border-radius: 24px;
  background-color: #F8F7FA;
  padding: 8px;
}

.recommendations-title {
  font-size: 18px;
  font-weight: 700;
  line-height: 21.6px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000;
  padding-top: 16px;

  span {
    color: #FB813E;
  }
}

.list {
  background-color: #F8F7FA;
}

.v-card-text {
  padding: 0;
}

.dot {
  height: 4px;
  width: 4px;
  background-color: #4E1AC7;
  border-radius: 50%;
  margin: 0 8px;
}

.recommendation-text {
  color: #41324C;
  padding: 0 8px;
  background-color: #B7B0C71A;
  border-radius: 50px;
  margin-bottom: 16px;
  height: 48px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 16.8px;
  font-weight: 400;
}
</style>
