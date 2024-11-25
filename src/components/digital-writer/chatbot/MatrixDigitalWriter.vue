<script setup>
  import { useI18n } from 'vue-i18n'
  import matrixBot from '@/assets/digital-writer/Matrux_bot.svg'
  import { marked } from 'marked'
  const props = defineProps({
    message: {
      type: String,
      default: '',
    },
  })

  const { t } = useI18n()

  onMounted(() => {
    document.getElementById('digital-writer-wrapper').innerHTML = marked.parse(
      props.message
    )
  })
</script>

<template>
  <div class="title-container d-flex flex-column">
    <div class="d-flex align-center title-wrapper">
      <img alt="chatbot" :src="matrixBot">
      <span> {{ t("matrix_digital_writer") }}</span>
    </div>
    <div
      id="digital-writer-wrapper"
      class="content-wrapper"
      v-html="message.replace(/\n/g, '<br>')"
    />
  </div>
</template>

<style scoped lang="scss">
.title-container {
  background-color: #efecf6 !important;
  border: 1px solid #cfcfcf !important;
  padding: 16px;
  border-radius: 12px;
  gap: 16px;

  .title-wrapper {
    gap: 8px;

    span {
      color: #000;
    }
  }

  .content-wrapper {
    background-color: #f8f7fa;
    padding: 16px;
    border-radius: 8px;
    color: #1f1625;
  }
}
</style>
<style lang="scss">
#digital-writer-wrapper {
  li {
    list-style-position: inside;
  }
}
</style>
