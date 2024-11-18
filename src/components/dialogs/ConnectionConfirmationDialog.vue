<script setup>
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    isDialogVisible: {
      type: Boolean,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
  })

  const emit = defineEmits(['confirmed', 'update:isDialogVisible'])

  const { t } = useI18n()

  const formSubmit = () => {
    emit('confirmed', props.platform)
  }

  const dialogModelValueUpdate = val => {
    emit('update:isDialogVisible', val)
  }
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 840"
    @update:model-value="dialogModelValueUpdate"
  >
    <VCard class="pa-5 pa-sm-8">
      <!-- 👉 Title -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h5 font-weight-medium mb-3">
          Matrix
        </VCardTitle>
        <p class="mb-0">
          {{ t("access_request") }}
        </p>
      </VCardItem>

      <VCardText class="pt-6">
        <VRow class="gab-4">
          <!-- 👉 Card actions -->
          <VCol class="text-center" cols="12">
            <MetaButton
              v-if="
                props.platform.toUpperCase() === 'META'
              "
              block
              class="mb-3"
              :text="t('login_with_facebook')"
              type="submit"
              variant="elevated"
              @click="formSubmit"
            />
            <VBtn
              v-else
              block
              class="mb-3"
              color="success"
              type="submit"
              @click="formSubmit"
            >
              {{ t("agree") }}
              <template #loader>
                <span class="custom-loader">
                  <VIcon icon="tabler-refresh" />
                </span>
              </template>
            </VBtn>
            <VBtn
              block
              color="secondary"
              variant="flat"
              @click="$emit('update:isDialogVisible', false)"
            >
              {{ t("cancel") }}
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
      <VCardItem class="text-center">
        <p class="">
          {{ t("info_sharing_notice") }}
        </p>
        <p class="mb-0 text-center">
          <a
            class="d-flex align-center justify-center text-primary"
            href="https://matrix.sa/Terms"
          >
            {{ t("privacy_policy_and_terms") }}
          </a>
        </p>
      </VCardItem>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.custom-loader {
  display: flex;
  animation: loader 1s infinite;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
