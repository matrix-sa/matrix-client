<template>
  <v-container class="d-flex flex-column align-center justify-center pa-15">
    <v-img
      alt="empty-state"
      height="218"
      src="@images/svg/empty-state.svg"
      width="256"
    />
    <span class="mt-4 font-weight-medium">
      {{ $t(message) }}
    </span>
    <v-btn
      class="mt-4"
      color="primary"
      rounded
      @click="emitAddButtonClicked"
    >
      {{ $t(addButtonText) }}
    </v-btn>
  </v-container>
</template>

<script setup>
  import { toRefs } from 'vue'

  const props = defineProps({
    addButtonText: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
      default: '',
    },
  })

  const emits = defineEmits(['addButtonClicked'])

  const { addButtonText, message } = toRefs(props)

  const emitAddButtonClicked = () => {
    emits('addButtonClicked')
  }
</script>
