<script setup>
  import add from '@images/icons/add.png'

  defineEmits(['close'])
</script>

<template>
  <VCard class="pa-6 rounded-xl">
    <section class="d-flex flex-column align-center justify-center">
      <VAvatar class="mb-6" color="primary" size="128" variant="tonal">
        <figure>
          <VImg aspect-ratio="1/1" height="80" :src="add" width="80" />
        </figure>
      </VAvatar>

      <h4 class="text-h5 font-weight-bold text-center mb-2">
        {{ $t("orderSuccess") }}
      </h4>

      <p class="text-surface-variant text-body-1 text-center mb-4">
        {{ $t("ourTeamWillAnswerSoon") }}
      </p>

      <VBtn color="warning" rounded width="318" @click="$emit('close')">
        {{ $t("done") }}
      </VBtn>
    </section>
  </VCard>
</template>
