<script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import KhuzamaLogo from '@/assets/Khuzama2.svg'
  import { useRequest } from 'vue-request'
  import StoresService from '@/services/stores-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'

  const { t } = useI18n()
  const { show } = useSnackbarStore()

  const showDialog = ref(false)
  const inputValue = ref('')

  const emit = defineEmits(['submit', 'close'])

  const { run: khuzamaLogin, loading: loadingKhuzamaLogin } = useRequest(
    StoresService.khuzamaLogin,
    {
      manual: true,
      onSuccess: async response => {
        const { messages, error } = response.data

        if (error) {
          show(messages[0], 'error')
        }

        show(t('connected_successfully'), 'success')
        emit('submit')
        showDialog.value = false
        inputValue.value = ''
      },
      onError: error => {
        show(error, 'error')
      },
    }
  )

  const handleSubmit = () => {
    khuzamaLogin(inputValue.value)
  }

  const handleClose = () => {
    emit('close')
    showDialog.value = false
    inputValue.value = ''
  }
</script>

<template>
  <v-dialog v-model="showDialog" max-width="400px">
    <v-card class="px-6 rounded-xl" min-width="40vw" rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center px-0">
        <div class="d-flex align-center">
          <img alt="Khuzama logo" class="mx-2" :src="KhuzamaLogo" width="40px">
          <span class="text-h5 text-medium-emphasis">
            {{ t("store_connect") }}
            <span class="text-warning">( {{ t("Khuzama") }} )</span>
          </span>
        </div>
        <v-btn icon="mdi-close" variant="text" @click.stop="handleClose" />
      </v-card-title>

      <v-divider class="mb-4" />

      <AppTextInput
        v-model="inputValue"
        autofocus
        class="w-auto mx-4 my-4"
        :label="t('paste_code')"
        :placeholder="t('paste_code')"
      />

      <v-divider class="mt-2" />

      <v-card-actions class="my-2 d-flex justify-end">
        <v-btn class="text-none" rounded="xl" @click.stop="handleClose">{{ t('back') }}</v-btn>
        <v-btn
          append-icon="mdi-check"
          class="bg-success  text-none"
          :loading="loadingKhuzamaLogin"
          rounded="xl"
          @click="handleSubmit"
        >
          {{ t('save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
