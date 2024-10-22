
<template>
  <v-container class="d-flex flex-column align-center justify-center pa-15">
    <v-img
      alt="empty-state"
      src="@images/svg/empty-state.svg"
      height="218"
      width="256"
    ></v-img>
    <span class="mt-4 font-weight-medium">
      {{ $t(message) }}
    </span>
    <v-btn class="mt-4" color="primary" rounded @click="emitAddButtonClicked">
      {{ $t(addButtonText) }}
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "EmptyState",
  props: {
    addButtonText: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
      default:""
     },
  },
  methods: {
    emitAddButtonClicked() {
      this.$emit("addButtonClicked");
    },
  },
};
</script>



