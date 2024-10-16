<script setup>
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    platform: {
      type: Object,
      required: true,
    },
  })

  const emit = defineEmits(['connectionEnded', 'update:isDialogVisible'])

  const handleClose = () => {
    emit('update:isDialogVisible', false)
  }
  const { t } = useI18n()
</script>
<template>
  <v-card class="connect-platform px-6 rounded-xl" max-width="600" rounded="lg">
    <v-card-title class="d-flex justify-space-between align-center px-0">
      <div class="text-h5 text-medium-emphasis">
        <div class="d-flex align-center ga-2">
          <v-img aspect-ratio="1/1" :src="props.platform.image" width="40" />
          <p>
            <span class="dark-1"> {{ t("account_connect") }} </span>
            <span class="text-warning"> ({{ props.platform.title }}) </span>
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

    <v-divider class="mt-2" />

    <v-card-actions class="my-2 d-flex justify-end">
      <v-btn
        class="text-none"
        rounded="xl"
        text="Cancel"
        @click="handleClose"
      />

      <v-btn
        class="text-none"
        color="primary"
        rounded="xl"
        text="Send"
        variant="flat"
        @click="handleClose"
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
}
</style>
