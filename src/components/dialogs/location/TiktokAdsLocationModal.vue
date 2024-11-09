<script setup>
  import locationIcon from '@/assets/images/logos/location.svg'
  import TargetingService from '@/services/targeting-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useI18n } from 'vue-i18n'
  import { useRequest } from 'vue-request'

  const emit = defineEmits(['saved', 'update:isDialogVisible'])

  const { show } = useSnackbarStore()
  const { t } = useI18n()

  const countries = ref([])
  const selectedCountry = ref(null)

  const provinces = ref([])
  const selectedProvince = ref(null)

  const { loading: loadingCountries } = useRequest(
    () => TargetingService.getTikTokCountries(),
    {
      onSuccess: res => {
        const { error, data, messages } = res.data

        if (error) {
          show(messages[0], 'error')
        }
        countries.value = data ?? []
      },
    }
  )

  const { run: fetchProvinces, loading: loadingProvinces } = useRequest(
    () => TargetingService.getTikTokCountryProvinces({
      countryId: selectedCountry.value,
    }),
    {
      onSuccess: res => {
        const { error, data, messages } = res.data

        if (error) {
          show(messages[0], 'error')
        }

        provinces.value = data ?? []
      },
      manual: true,
    },
  )

  const submit = () => {
    emit('saved', selectedProvince.value)
    emit('update:isDialogVisible', false)
  }
  const handleClose = () => {
    emit('update:isDialogVisible', false)
  }
  const isValid = computed(() => !!selectedProvince.value)
</script>
<template>
  <v-card class="connect-platform px-6 rounded-xl" min-width="40vw">
    <v-card-title class="d-flex justify-space-between align-center px-0">
      <div class="text-h6 text-medium-emphasis text-tajawal">
        <div class="d-flex align-center ga-2">
          <v-img :src="locationIcon" width="20" />
          <p class="dark-1 font-weight-bold">{{ t("location_modal") }}</p>
        </div>
      </div>
      <v-btn icon="mdi-close" variant="text" @click="handleClose" />
    </v-card-title>

    <v-divider />

    <v-container>
      <v-row>
        <v-col cols="12">
          <AppAutocomplete
            v-model="selectedCountry"
            hide-no-data
            item-title="name"
            item-value="id"
            :items="countries"
            :label="$t('country')"
            :loading="loadingCountries"
            @update:model-value="fetchProvinces"
          />
        </v-col>
        <VCol cols="12">
          <AppAutocomplete
            v-model="selectedProvince"
            hide-no-data
            item-title="name"
            :item-value="item => item"
            :items="provinces"
            :label="$t('province')"
            :loading="loadingProvinces"
          />
        </VCol>
      </v-row>
    </v-container>
    <v-divider class="mt-2" />
    <v-card-actions class="my-2 d-flex justify-end">
      <v-btn rounded="xl" :text="t('cancel')" @click="handleClose" />
      <v-btn
        append-icon="mdi-check"
        color="success"
        :disabled="!isValid"
        rounded="xl"
        :text="t('save')"
        @click="submit"
      />
    </v-card-actions>
  </v-card>
</template>

<style lang="scss">
.v-col-sm-6 {
  padding: 0 8px;
}

.connect-platform {
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

  .camp-rule-text {
    background-color: rgb(var(--v-theme-background));
    border-radius: 12px;

    p {
      color: rgb(var(--v-dark-1));
    }
  }
}

.app-select {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
