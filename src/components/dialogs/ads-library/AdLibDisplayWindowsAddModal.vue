<script setup>
  import { useI18n } from 'vue-i18n'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import AppTextInput from '../../core/AppTextInput.vue'
  import windowIcon from '@/assets/images/icons/window.svg'
  const props = defineProps({
    rule: {
      type: Object,
      required: false,
    },
  })

  const emit = defineEmits(['update:isDialogVisible', 'addModalHandler'])

  const { t } = useI18n()
  const { show } = useSnackbarStore()

  const handleClose = () => {
    emit('update:isDialogVisible', false)
  }

</script>
<template>
  <v-card class="edit-display-windows px-6 rounded-xl pb-5 mx-auto" min-width="32vw" rounded="lg">

    <v-card-title class="d-flex  py-4 justify-space-between align-center px-0">

      <div class="py-4 px-1 ga-3 mt-4  align-center justify-space-between w-100 d-flex modal-header">
        <div class=" ga-3 align-center d-flex display-title">
          <img :src="windowIcon">
          <span>{{ $t('ads_library.create_new_window') }}</span>
        </div>

      </div>

    </v-card-title>

    <v-card-item class="pa-0">

      <AppTextInput
        :label="$t('name')"
        :placeholder="$t('ads_library.enter_name_for_display_window')"
        prepend-icon="tabler:layout"
      />
    </v-card-item>

    <div class="d-flex justify-end ga-4" variant="plain" @click="handleClose">
      <v-btn rounded>
        {{ t('cancel') }}
      </v-btn>
      <v-btn class="px-10" color="#24C87E" rounded>
        <p class="text-white">{{ t("save") }}</p>
      </v-btn>
    </div>

  </v-card>
</template>

<style lang="scss">
.edit-display-windows {

  .modal-header {
    button {
      background-color: #0E7BC51A;
      color: #0E7BC5;
    }
  }

  .display-title {
    span {
      font-size: 18px;
      font-weight: 500
    }

    img {
      transform: scale(1.5)
    }
  }

  .app-text-field .v-field {
    border: 1px solid #1F1625
  }

  button {
    box-shadow: none !important
  }
}
</style>
