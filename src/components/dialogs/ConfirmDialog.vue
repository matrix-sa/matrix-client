<script setup>
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    confirmationQuestion: {
      type: String,
      required: true,
    },
    isDialogVisible: {
      type: Boolean,
      required: true,
    },
    confirmTitle: {
      type: String,
      required: false,
    },
    confirmMsg: {
      type: String,
      required: false,
    },
    cancelTitle: {
      type: String,
      required: false,
    },
    cancelMsg: {
      type: String,
      required: false,
    },
    confirmBtn: {
      type: String,
    },
    cancelBtn: {
      type: String,
    },
  })

  const emit = defineEmits(['update:isDialogVisible', 'confirm'])

  const unsubscribed = ref(false)
  const cancelled = ref(false)
  const { t } = useI18n()

  const updateModelValue = val => {
    emit('update:isDialogVisible', val)
  }

  const onConfirmation = () => {
    emit('confirm', true)
    updateModelValue(false)
    unsubscribed.value = true
  }

  const onCancel = () => {
    emit('confirm', false)
    emit('update:isDialogVisible', false)
    cancelled.value = true
  }
</script>

<template>
  <!-- 👉 Confirm Dialog -->
  <VDialog
    max-width="500"
    :model-value="props.isDialogVisible"
    @update:model-value="updateModelValue"
  >
    <VCard class="text-center px-10 py-6">
      <VCardText>
        <VBtn
          class="my-4"
          color="warning"
          icon
          style="block-size: 88px; inline-size: 88px; pointer-events: none"
          variant="outlined"
        >
          <span class="text-h2">!</span>
        </VBtn>

        <h6 class="text-subtitle-1 font-weight-medium">
          {{ props.confirmationQuestion }}
        </h6>
      </VCardText>

      <VCardText class="d-flex align-center justify-center gap-2">
        <VBtn color="primary" variant="elevated" @click="onConfirmation">
          {{ confirmBtn ?? t("confirm_btn") }}
        </VBtn>

        <VBtn color="secondary" variant="elevated" @click="onCancel">
          {{ cancelBtn ?? t("cancel_btn") }}
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>

  <!-- Unsubscribed -->
  <VDialog v-if="props.confirmTitle" v-model="unsubscribed" max-width="500">
    <VCard>
      <VCardText class="text-center px-10 py-6">
        <VBtn
          class="my-4"
          color="success"
          icon
          style="block-size: 88px; inline-size: 88px; pointer-events: none"
          variant="outlined"
        >
          <span class="text-3xl">
            <VIcon icon="tabler-check" />
          </span>
        </VBtn>

        <h1 class="text-h4 mb-4">
          {{ props.confirmTitle }}
        </h1>

        <p>{{ props.confirmMsg }}</p>
      </VCardText>
    </VCard>
  </VDialog>

  <!-- Cancelled -->
  <VDialog v-if="props.cancelTitle" v-model="cancelled" max-width="500">
    <VCard>
      <VCardText class="text-center px-10 py-6">
        <VBtn
          class="my-4"
          color="error"
          icon
          style="block-size: 88px; inline-size: 88px; pointer-events: none"
          variant="outlined"
        >
          <span class="text-5xl font-weight-light">X</span>
        </VBtn>

        <h1 class="text-h4 mb-4">
          {{ props.cancelTitle }}
        </h1>

        <p>{{ props.cancelMsg }}</p>

        <VBtn color="success" @click="cancelled = false"> Ok </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
