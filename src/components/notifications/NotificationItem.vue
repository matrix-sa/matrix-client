<script setup>
  import moment from 'moment'

  const props = defineProps({
    notification: {
      type: Object,
      default: null,
    },
  })

  const { id, title, message, created_at } = props.notification

  const handleDate = date => {
    if (!date) return t('no_date')

    return moment(date).format('D.M.YYYY HH:MM')
  }
</script>
<template>
  <div class="d-flex align-center justify-space-between mt-4">
    <div class="msg-and-body d-flex align-center ga-4">
      <div class="dimmed" />

      <div>
        <div class="title">{{ title }}</div>
        <div class="msg">{{ message }}</div>
      </div>
    </div>

    <div class="d-flex flex-column">
      <span class="date">{{ handleDate(created_at) }}</span>
      <VIcon class="align-self-end arrow" icon="tabler-arrow-left" />

    </div>
  </div>
</template>

<style scoped lang="scss">
.msg-and-body {
  .dimmed {
    width: 40px;
    height: 40px;
    background-color: #EEE;
    border-radius: 100%
  }

  .title {
    color: rgb(var(--v-dark-1));
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px
  }

  .msg {
    font-size: 14px;
    line-height: 16.8px;
    margin-top: 4px;
  }

}

.date {
  color: #706D79;
}

.arrow {
  color: #D4D1DE;
  margin-top: 4px;
}
</style>
