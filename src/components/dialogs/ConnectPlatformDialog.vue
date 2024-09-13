<script setup>
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    platform: {
      type: Object,
      required: true,
    },
  })

  const emits = defineEmits(['connectionEnded'])

  const { t } = useI18n()
</script>
<template>
  <v-card max-width="600" rounded="lg">
    <v-card-title class="d-flex justify-space-between align-center">
      <div class="text-h5 text-medium-emphasis ps-2">
        <div class="d-flex align-center ga-2">
          <v-img aspect-ratio="1/1" :src="props.platform.image" width="40" />
          <p>
            <span> {{ t('account_connect') }} </span>
            <span class="text-primary"> ({{ props.platform.title }}) </span>
          </p>
        </div>

      </div>

      <v-btn
        icon="mdi-close"
        variant="text"
        @click="isActive.value = false"
      />
    </v-card-title>

    <v-divider class="mb-4" />

    <v-card-text>
      <div class="text-medium-emphasis mb-4">
        Invite collaborators to your network and grow your connections.
      </div>

      <div class="mb-2">Message (optional)</div>

      <v-textarea
        class="mb-2"
        :counter="300"
        persistent-counter
        rows="2"
        variant="outlined"
      />

      <div class="text-overline mb-2">💎 PREMIUM</div>

      <div class="text-medium-emphasis mb-1">
        Share with unlimited people and get more insights about your network. Try Premium Free for 30 days.
      </div>

      <v-btn
        class="text-none font-weight-bold ms-n4"
        color="primary"
        text="Retry Premium Free"
        variant="text"
      />
    </v-card-text>

    <v-divider class="mt-2" />

    <v-card-actions class="my-2 d-flex justify-end">
      <v-btn
        class="text-none"
        rounded="xl"
        text="Cancel"
        @click="isActive.value = false"
      />

      <v-btn
        class="text-none"
        color="primary"
        rounded="xl"
        text="Send"
        variant="flat"
        @click="isActive.value = false"
      />
    </v-card-actions>
  </v-card>
</template>
