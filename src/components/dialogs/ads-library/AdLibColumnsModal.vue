<script setup>
  import { useI18n } from 'vue-i18n'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'

  defineProps({
    headers: {
      type: Array,
      required: true,
    },
  })

  const emit = defineEmits(['update:isDialogVisible', 'refetch-transactions', 'emitToggleVisibility'])

  const { t } = useI18n()
  const { show } = useSnackbarStore()

  const toggleColumn = index => {
    emit('emitToggleVisibility', index)
  }
  const handleClose = () => {
    emit('update:isDialogVisible', false)
  }

</script>
<template>
  <v-card class="column-control px-6 rounded-xl" min-width="40vw" rounded="lg">
    <v-card-title class="d-flex pb-1 py-4 justify-space-between align-center px-0">
      <div class="py-4 px-6 ga-2 mt-4  align-center w-100 d-flex filter-title">
        <v-icon icon="bx:hide " />

        <span>{{ $t("ads_library.control") }}</span>
      </div>
    </v-card-title>

    <v-divider />

    <v-card-text>
      <div class="d-flex flex-column ga-3">
        <div v-for="(head, index) in headers" :key="index" class="columns-parent">
          <div v-if="index != 0" class="columns-item d-flex justify-space-between align-center">
            <span>{{ head.title }}</span>
            <v-btn
              class="show-btn"
              :color="head.visible ? '#24C87E' : '#F54A41'"
              width="24"
              @click="toggleColumn(index)"
            >

              <v-icon v-if="head.visible" color="#FFF" icon="mdi:eye-outline " size="20" />
              <v-icon v-else color="#FFF" icon="mdi:eye-off-outline " size="20" />
            </v-btn>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="scss">
.v-col-sm-6 {
  padding: 0 8px;
}

.column-control {

  .filter-title {
    background-color: #f0c4fd;
    border-radius: 12px;

    span {
      font-size: 18px
    }
  }

  .w-50px {
    width: 50px;
    display: flex;
    justify-content: flex-end
  }

  .filter-text {
    font-size: 16px;
    font-weight: 500;
    line-height: 16.8px;

  }

  .v-divider {
    opacity: 1;
  }

  .flex-2,
  .app-select.flex-2 {
    flex: 2 !important
  }

  .app-text-field,
  .app-select {
    flex: 3 !important;
    margin-top: 0 !important
  }

  .delete-btn {
    background-color: transparent !important;
    box-shadow: none !important;
    border: 1px solid #1F16251A;
    min-width: 40px !important;
    min-height: 48px !important;
    border-radius: 12px
  }

  .app-text-field .v-field {
    margin-top: 0 !important
  }

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

.columns-item {
  background-color: #F8F7FA;
  padding: 12px 8px;
  font-size: 16px;
  color: #1F1625;
  font-weight: 500;
  border-radius: 12px;
  user-select: none
}

.show-btn {
  min-width: 40px !important;
  height: 40px !important;
  border-radius: 100%;
  background-color: red;
  display: flex;
  align-items: center;
  color: #FFF
}
</style>
