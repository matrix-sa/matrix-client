<script setup>
  import { requiredValidator } from '@/utilities/validators'
  import AdsGroupsService from '@/services/ads-groups-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { computed, reactive, ref, watch } from 'vue'
  import { useRequest } from 'vue-request'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const { t, locale } = useI18n()

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
      default: 'tiktok',
    },
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  })

  const router = useRouter()
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
    province_id: null,
    age_group: null,
  })
  const locations = ref([])

  const isEditMode = ref(false)
  // "language_code": null,
  // "gender": null,
  //       "operating_system": null,

  if (props.adGroup) {
    form.value = { ...props.adGroup }

    const {
      gender,
      language_code: languageCode,
      operating_system: operatingSystem,
    } = props.adGroup

    form.value.gender = gender || ''
    form.value.language_code = languageCode || ''
    form.value.operating_system = operatingSystem || ''

    isEditMode.value = true
    locations.value = props.adGroup.locations.map(location => ({
      id: location.id,
      name: locale.value === 'ar' ? location.name_ar : location.name_en,
    }))
  }

  // Handle submission
  const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
      if (!isValid) {
        const el = document.querySelector('.v-input--error:first-of-type')

        if (el) {
          el.scrollIntoView()
        }

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
      data.provinces_ids = locations.value.map(location => location.id)

      if (isEditMode.value) {
        // data.id = adGroup.value.id
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
        router.push({ name: '/campaigns/' })
      },
    }
  )

  const { run: runUpdate, loading: updateLoading } = useRequest(
    data => AdsGroupsService.update(props.platform, data),
    {
      manual: true,
      onSuccess: res => {
        const { error, messages } = res.data

        if (error) {
          show(messages[0], 'error')
          return
        }
        show(t('updated_message'), 'success')
        router.push({ name: '/campaigns/' })
      },
    }
  )

  // TikTok-specific form logic
  const formModel = toRef(props, 'modelValue')
  const ageGroups = ref([
    { id: 'Age13To17', name: '13 - 17' },
    { id: 'Age18To24', name: '18 - 24' },
    { id: 'Age25To34', name: '25 - 34' },
    { id: 'Age35To44', name: '35 - 44' },
    { id: 'Age45To54', name: '45 - 54' },
    { id: 'Age55To100', name: '55 - 100' },
  ])

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

  watch(
    formModel,
    () => {
      emit('update:modelValue', formModel.value)
      form.value.country_id = formModel.value.country_id
    },
    { deep: true }
  )

  const loading = computed(() => creationLoading.value || updateLoading.value)
  const rules = reactive({
    name: [requiredValidator],
    country_id: [requiredValidator],
    province_id: [],
    age_group: [],
  })
</script>

<template>
  <VForm ref="refVForm" @submit.prevent="onSubmit">
    <VRow>
      <!-- Common fields -->
      <VCol cols="12">
        <AppTextInput
          v-model="form.name"
          autofocus
          :label="$t('ad_group_name')"
          :rules="rules.name"
        />
      </VCol>
      <VCol cols="12">
        <AppChipSelect
          v-model="form.language_code"
          hide-no-data
          :items="processedLanguages"
          :label="$t('language')"
        />
      </VCol>
      <VCol cols="12">
        <AppChipSelect
          v-model="form.gender"
          hide-no-data
          :items="processedGenders"
          :label="$t('gender')"
        />
      </VCol>
      <VCol cols="12">
        <AppChipSelect
          v-model="form.operating_system"
          :items="processedOperatingSystems"
          :label="$t('operating_system')"
        />
      </VCol>

      <!-- TikTok-specific fields -->
      <VCol cols="12">
        <LocationControl
          :locations="locations"
          platform="tiktok"
          @update:locations="locations = $event"
        />
      </VCol>

      <VCol cols="12">
        <AppSelect
          v-model="form.age_group"
          hide-no-data
          :item-title="(item) => item.name"
          :item-value="(item) => item.id"
          :items="ageGroups"
          :label="$t('age_group')"
        />
      </VCol>

      <!-- Submit button -->
      <VCol class="mx-10" cols="2">
        <VBtn
          block
          color="primary"
          :disabled="loading"
          :loading="loading"
          type="submit"
        >
          {{ t("save") }}
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
