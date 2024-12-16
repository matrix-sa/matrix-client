<script setup>
  import { computed, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import cardBlue from '@/assets/Card1.svg'
  import cardLightPurple from '@/assets/Card2.svg'
  import cardDarkPurple from '@/assets/Card3.svg'
  import CardRed from '@/assets/Card4.svg'

  const { t } = useI18n()

  const props = defineProps({
    showAddCardPopup: Boolean,
  })

  const form = ref({
    name: '',
    theme: '',
  })

  const isFormValid = computed(() => {
    return (
      !!form.value.name &&
      !!form.value.theme
    )
  })

  const showPopup = ref(props.showAddCardPopup)

  watch(
    () => props.showAddCardPopup,
    newVal => {
      showPopup.value = newVal
    }
  )

  const emit = defineEmits(['close', 'save'])

  const handleClose = () => {
    emit('close')
  }

  const handleSave = () => {
    emit('save', form.value)
    form.value = {
      name: '',
      theme: '',
    }
    handleClose()
  }

  const themes = [
    { title: 'blue', label: t('card_colors.blue'), image: cardBlue },
    { title: 'lightPurple', label: t('card_colors.light_purple'), image: cardLightPurple },
    { title: 'darkPurple', label: t('card_colors.dark_purple'), image: cardDarkPurple },
    { title: 'red', label: t('card_colors.red'), image: CardRed },
  ]
</script>

<template>
  <v-dialog
    v-model="showPopup"
    max-width="600px"
    persistent
    @click:outside="handleClose"
  >
    <v-card class="pa-4 rounded-xl">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <v-icon size="22px">tabler-credit-card</v-icon>
          <span class="card-title mx-2">{{t('add_card')}}</span>
        </div>
        <v-btn icon="mdi-close" @click="handleClose" />
      </v-card-title>

      <v-divider />

      <v-container>
        <v-row>
          <v-col cols="12">
            <AppTextInput
              v-model="form.name"
              autofocus
              :label="t('card_name')"
              :placeholder="t('enter_name_card')"
            />
          </v-col>

          <!-- Card Theme selection -->
          <v-col cols="12">
            <v-select
              v-model="form.theme"
              class="mt-4"
              density="comfortable"
              flat:true
              item-value="value"
              :items="themes"
              :label="t('choose_card_theme')"
              rounded="lg"
              variant="solo-filled"
            >
              <template #item="{ props, item }">
                <v-row
                  v-bind="props"
                  :key="item.value"
                  align="center"
                  class="d-flex"
                  no-gutters
                >
                  <v-img class="mx-2" max-width="40" :src="item.raw.image" />
                  <span class="my-2">{{ item.raw.label }}</span>
                </v-row>

              </template>

            </v-select>
          </v-col>

        </v-row>
      </v-container>

      <v-divider class="mt-2 mb-4" />

      <v-card-actions class="d-flex justify-end">
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
          rounded="xl"
          :text="t('save')"
          variant="flat"
          :width="120"
          @click="handleSave"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.card-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
}
</style>
