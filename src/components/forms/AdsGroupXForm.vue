<script setup>
  import { requiredValidator } from '@/utilities/validators'
  import AdsGroupsService from '@/services/ads-groups-service'
  import TargetingService from '@/services/targeting-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { computed, reactive, ref, watch } from 'vue'
  import { useRequest } from 'vue-request'
  import { useI18n } from 'vue-i18n'
  // import { useRouter } from 'vue-router'

  const { t } = useI18n()

  const props = defineProps({
    adGroup: {
      type: Object,
      default: null,
    },
    campaignId: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: false,
      default: 'X',
    },
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  })

  // const router = useRouter()
  const refVForm = ref(null)

  // Gender, Operating Systems, and Language Options
  const genders = ref([
    { id: '', name: t('both_genders') },
    { id: 'Male', name: t('male') },
    { id: 'Female', name: t('female') },
  ])
  const operatingSystems = ref([
    { id: '', name: t('all_devices') },
    { id: 'iOS', name: 'iOS' },
    { id: 'Android', name: 'Android' },
  ])
  const languages = ref([
    { code: '', name: t('both_languages') },
    { code: 'ar', name: t('arabic') },
    { code: 'en', name: t('english') },
  ])
  // Snackbar handler
  const { show } = useSnackbarStore()

  // Form setup
  const form = ref({
    id: null,
    campaign_id: props.campaignId,
    name: null,
    gender: null,
    language_code: null,
    operating_system: null,
    country_id: null,
    city_id: null,
    age_group: null,
  })

  const isEditMode = ref(false)

  if (props.adGroup) {
    form.value = { ...props.adGroup }
    isEditMode.value = true
  }

  // Handle submission
  const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
      if (!isValid) {
        const el = document.querySelector('.v-input--error:first-of-type')

        if (el) { el.scrollIntoView() }

        return
      }

      const data = {}
      for (const key in form.value) {
        data[key] = form.value[key]
        data.country_id = formModel.value.country_id
        if (key === 'gender' && form.value[key] === '') {
          data[key] = null
        }
        if (key === 'language_code' && form.value[key] === '') {
          data[key] = null
        }

        if (key === 'operating_system' && form.value[key] === '') {
          data[key] = null
        }
      }

      if (isEditMode.value) {
        data.id = adGroup.value.id
        runUpdate({ ...data })

        return
      }
      runCreate({ ...data })
    })
  }

  // API requests for creation and updating
  const { run: runCreate, loading: creationLoading } = useRequest(
    data => AdsGroupsService.create(props.platform, data),
    {
      manual: true,
      onSuccess: res => {
        const { error, messages } = res.data

        if (error) {
          show(messages[0], 'error')

          return
        }

        show(t('created_message'), 'success')
        console.log('success')
      // router.push({ name: 'campaigns' })
      },
    }
  )

  const { run: runUpdate, loading: updateLoading } = useRequest(
    data => AdsGroupsService.update(props.platform, data),
    {
      manual: true,
      onSuccess: () => {
        show(t('updated_message'), 'success')
      // router.push({ name: 'campaigns' })
      },
    }
  )

  // X-specific form logic
  const formModel = toRef(props, 'modelValue')
  const countries = ref([])
  const cities = ref([])
  const ageGroups = ref([
    {
      id: 'Age13To24',
      name: '13 - 24',
    },
    {
      id: 'Age13To34',
      name: '13 - 34',
    },
    {
      id: 'Age13To49',
      name: '13 - 49',
    },
    {
      id: 'Age13To54',
      name: '13 - 54',
    },
    {
      id: 'AgeOver13',
      name: 'Over 13',
    },
    {
      id: 'Age18To34',
      name: '18 - 34',
    },
    {
      id: 'Age18To49',
      name: '18 - 49',
    },
    {
      id: 'Age18To54',
      name: '18 - 54',
    },
    {
      id: 'AgeOver18',
      name: 'Over 18',
    },
    {
      id: 'Age21To34',
      name: '55 - 100',
    },
    {
      id: 'Age21To49',
      name: '21 - 49',
    },
    {
      id: 'Age21To54',
      name: '21 - 54',
    },
    {
      id: 'AgeOver21',
      name: 'Over 21',
    },
    {
      id: 'Age25To49',
      name: '25 - 49',
    },
    {
      id: 'Age25To54',
      name: '25 - 54',
    },
    {
      id: 'AgeOver25',
      name: 'Over 25',
    },
    {
      id: 'Age35To49',
      name: '55 - 100',
    },
    {
      id: 'Age35To54',
      name: '35 - 54',
    },
    {
      id: 'AgeOver35',
      name: 'Over 35',
    },
    {
      id: 'AgeOver50',
      name: 'Over 50',
    },
  ])

  const { run: fetchCountries, loading: countriesLoading } = useRequest(
    // twitter service not available yet
    () => TargetingService.getTikTokCountries(),
    {
      onSuccess: res => {
        const { error, data, messages } = res.data

        if (error) {
          show(messages[0], 'error')
        }

        countries.value = data ?? []
      },
    },
  )

  const { run: fetchCities, loading: citiesLoading } = useRequest(
    // twitter service not available yet
    () => TargetingService.getTikTokCountryProvinces({
      countryId: formModel.value.country_id,
    }),
    {
      onSuccess: res => {
        const { error, data, messages } = res.data

        if (error) {
          show(messages[0], 'error')
        }

        cities.value = data ?? []
      },
      manual: true,
    },
  )

  // Transform the arrays for AppChipSelect
  const processedOperatingSystems = computed(() =>
    operatingSystems.value.map(os => ({
      id: os.id,
      title: os.name,
    }))
  )

  const processedLanguages = computed(() =>
    languages.value.map(lang => ({
      id: lang.code,
      title: lang.name,
    }))
  )

  const processedGenders = computed(() =>
    genders.value.map(gender => ({
      id: gender.id,
      title: gender.name,
    }))
  )

  watch(formModel, () => {
    emit('update:modelValue', formModel.value)
    form.value.country_id = formModel.value.country_id
  }, { deep: true })

  const loading = computed(() => creationLoading.value || updateLoading.value)
  const isLoading = computed(() => countriesLoading.value || citiesLoading.value)

  const rules = reactive({
    name: [requiredValidator],
    country_id: [requiredValidator],
    city_id: [],
    age_group: [],
  })
</script>

<template>
  <VForm ref="refVForm" @submit.prevent="onSubmit">
    <VRow>
      <!-- Common fields -->
      <VCol cols="12">
        <AppTextInput v-model="form.name" autofocus :label="$t('ad_group_name')" :rules="rules.name" />
      </VCol>
      <VCol cols="12">
        <AppChipSelect v-model="form.language_code" hide-no-data :items="processedLanguages" :label="$t('language')" />
      </VCol>
      <VCol cols="12">
        <AppChipSelect v-model="form.gender" hide-no-data :items="processedGenders" :label="$t('gender')" />
      </VCol>
      <VCol cols="12">
        <AppChipSelect
          v-model="form.operating_system"
          :items="processedOperatingSystems"
          :label="$t('operating_system')"
        />
      </VCol>

      <!-- X-specific fields -->
      <VCol cols="12">
        <AppAutocomplete
          :id="`country-${form.id}`"
          v-model="formModel.country_id"
          hide-no-data
          :item-title="item => item.name"
          :item-value="item => item.id"
          :items="countries"
          :label="$t('country')"
          :rules="rules.country_id"
          @update:model-value="fetchCities"
        />
      </VCol>
      <VCol cols="12">
        <AppAutocomplete
          :id="`province-${form.id}`"
          v-model="form.city_id"
          hide-no-data
          :item-title="item => item.name"
          :item-value="item => item.id"
          :items="cities"
          :label="$t('province')"
          :rules="rules.city_id"
        />
      </VCol>
      <VCol cols="12">
        <AppSelect
          v-model="form.age_group"
          hide-no-data
          :item-title="item => item.name"
          :item-value="item => item.id"
          :items="ageGroups"
          :label="$t('age_group')"
        />
      </VCol>

      <!-- Loading overlay -->
      <VOverlay v-model="isLoading" class="align-center justify-center" persistent>
        <VProgressCircular indeterminate />
      </VOverlay>

      <!-- Submit button -->
      <VCol class="mx-10" cols="2">
        <VBtn
          block
          color="primary"
          :disabled="loading"
          :loading="loading"
          type="submit"
        >
          {{ t('save') }}
          <template #loader>
            <span class="custom-loader">
              <VIcon icon="tabler-refresh" />
            </span>
          </template>
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>

<style lang="scss">
.fade-enter-active {
  transition: opacity 1s ease;
}

.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
