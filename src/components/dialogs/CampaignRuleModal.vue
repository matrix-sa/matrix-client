<script setup>
  import { requiredValidator } from '@/utilities/validators'
  import { useI18n } from 'vue-i18n'
  import { useRequest } from 'vue-request'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import ruleIcon from '@/assets/rule-icon.svg'

  const props = defineProps({})

  const emit = defineEmits(['saved', 'update:isDialogVisible'])

  const form = ref({
    ad_account_id: null,
    pixel_id: null,
    public_profile_id: null,
    funding_instrument_id: null,
    facebook_page_id: null,
  })

  const { t } = useI18n()
  const { show } = useSnackbarStore()

  const handleClose = () => {
    emit('update:isDialogVisible', false)
  }
</script>
<template>
  <v-card
    class="connect-platform px-6 rounded-xl"
    min-width="40vw"
    rounded="lg"
  >
    <v-card-title class="d-flex justify-space-between align-center px-0">
      <div class="text-h5 text-medium-emphasis text-tajawal">
        <div class="d-flex align-center ga-2">
          <v-img aspect-ratio="1/1" :src="ruleIcon" width="40" />
          <p>
            <span class="dark-1 font-weight-bold"> {{ t("control_rule") }} </span>
          </p>
        </div>
      </div>

      <v-btn
        class="close-btn"
        icon="mdi-close"
        variant="text"
        @click="handleClose"
      />
    </v-card-title>

    <v-divider class="mb-4" />

    <h2>Content Goes Here</h2>

    <v-divider class="mt-2" />

    <v-card-actions class="my-2 d-flex justify-end">
      <v-btn
        class="text-none"
        rounded="xl"
        :text="t('cancel')"
        @click="handleClose"
      />

      <v-btn
        append-icon="mdi-check"
        class="text-none save-btn"
        color="success"
        :disabled="!isFormValid"
        :loading="loadingSubmittingAdAccount || loadingCheckingPlatform"
        rounded="xl"
        :text="t('save')"
        variant="flat"
        :width="120"
        @click="() => {}"
      />
    </v-card-actions>
  </v-card>
</template>

<style lang="scss">
.connect-platform {
  .dark-1 {
    color: rgb(var(--v-dark-1));
  }

  .close-btn {
    svg {
      color: rgb(var(--v-dark-1));
    }
  }

  .save-btn {
    justify-content: space-around;
  }
  .save-btn:disabled {
    opacity: 0.35 !important;
  }
}
</style>
