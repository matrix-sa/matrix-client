<script setup>
  import { useI18n } from 'vue-i18n'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import windowIcon from '@/assets/images/icons/window.svg'
  import editIcon from '@/assets/images/icons/pen.svg'
  import selectedWindowIcon from '@/assets/images/icons/selected_window.svg'

  const emit = defineEmits(['update:isDialogVisible', 'editModalHandler', 'addModalHandler'])

  const { t } = useI18n()
  const { show } = useSnackbarStore()

  const handleClose = () => {
    emit('update:isDialogVisible', false)
  }

  const handleAddNewDiaplyWindow = () => {
    handleClose()
    emit('addModalHandler')
  }

  const handleEditDisplayWindow = () => {
    handleClose()
    emit('editModalHandler')
  }

</script>
<template>
  <v-card class="display-windows px-6 rounded-xl pb-5 mx-auto" min-width="35vw" rounded="lg">

    <v-card-title class="d-flex  py-4 justify-space-between align-center px-0">

      <div class="py-4 px-1 ga-3 mt-4  align-center justify-space-between w-100 d-flex modal-header">
        <div class=" ga-3 align-center d-flex display-title">
          <img :src="windowIcon">
          <span>{{ $t('ads_library.display_windows') }}</span>
        </div>

        <div>
          <v-btn class="px-3" rounded size="small" @click="handleAddNewDiaplyWindow">
            <div class="d-flex ga-1">
              <v-icon color="#0E7BC5" icon="tabler-circle-plus-filled" />
              <span>{{ $t("ads_library.new_window") }}</span>
            </div>
          </v-btn>
        </div>
      </div>

    </v-card-title>

    <div v-for="n in 4" class="d-flex gr-4 align-center">
      <AppChipSelect
        color="warning"
        :have-discount="true"
        :items="[
          { id: 'bank_card', title: 'مجموعات منتجات رمضان', haveDiscount: false, withIcon: true, iconSrc: selectedWindowIcon },

        ]"
        :label="''"
      />

      <div class="d-flex  ga-2">
        <div class="w-50px">
          <VBtn class="delete-btn">
            <v-icon size="25">mdi-trash-can</v-icon>
          </VBtn>
        </div>
        <div class="w-50px">
          <v-btn class="delete-btn" @click="handleEditDisplayWindow">
            <img :src="editIcon">
          </v-btn>
        </div>
      </div>
    </div>

  </v-card>
</template>

<style lang="scss">
.display-windows {

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

  .w-50px {
    width: 50px;
    display: flex;
    justify-content: flex-end
  }

  .app-chip-select .v-chip.v-chip-selected {
    background-color: #FB813E !important
  }

  .app-chip-select .v-chip {
    height: 50px !important
  }

  .delete-btn {
    background-color: transparent !important;
    box-shadow: none !important;
    border: 1px solid #1F16251A;
    min-width: 40px !important;
    min-height: 48px !important;
    border-radius: 12px
  }

  .app-chip-select .v-chip .v-chip__content {
    margin: 0 !important
  }
}
</style>
