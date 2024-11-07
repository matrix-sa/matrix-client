<script setup>
  import { requiredValidator } from '@/utilities/validators'
  import i18n from '@/i18n'
  import AdsGroupsService from '@/services/ads-groups-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { reactive, ref } from 'vue'
  import { useRequest } from 'vue-request'
  import AppTextInput from '@/components/core/AppTextInput.vue'

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
      required: true,
    },
    id: {
      type: String,
      default: null,
    },
  })

  const { t } = i18n.global

  const router = useRouter()

  const genders = ref([
    {
      id: 'Both',
      value: 0,
      name: t('both_genders'),
    },
    {
      id: 'Male',
      value: 1,
      name: t('male'),
    },
    {
      id: 'Female',
      value: 2,
      name: t('female'),
    },
  ])

  const optimizedTargeting = ref([
    {
      id: 'yes',
      name: t('yes'),
      value: 1,
    },
    {
      id: 'no',
      name: t('no'),
      value: 0,
    },

  ])

  const excludedAgeRanges = ref([
    /* { id: 'Unspecified', title: t('Unspecified') }, */
    /* { id: 'Unknown', title: t('Unknown') }, */
    { id: 'AgeRange1824', title: t('AgeRange1824') },
    { id: 'AgeRange2534', title: t('AgeRange2534') },
    { id: 'AgeRange3544', title: t('AgeRange3544') },
    { id: 'AgeRange4554', title: t('AgeRange4554') },
    { id: 'AgeRange5564', title: t('AgeRange5564') },
    { id: 'AgeRange65Up', title: t('AgeRange65Up') },
    { id: 'AgeRangeUndetermined', title: t('AgeRangeUndetermined') },
  ])

  const isEditMode = ref(false)

  const { show } = useSnackbarStore()

  const refVForm = ref('')

  const adGroup = ref(props.adGroup)

  const { run: runCreate, loading: creationLoading } = useRequest(
    data => AdsGroupsService.create(props.platform, data),
    {
      manual: true,
      onSuccess: res => {
        const { error, data, messages, code } = res.data

        if (error) {
          show(messages[0], 'error')

          return
        }

        show(t('created_message'), 'success')

        router.push({ name: 'campaigns' })
      },
    },
  )

  const { run: runUpdate, loading: updateLoading } = useRequest(
    data => AdsGroupsService.update(props.platform, data),
    {
      manual: true,
      onSuccess: res => {
        const { error, data, messages, code } = res.data

        if (error) {
          show(messages[0], 'error')

          return
        }

        show(t('updated_message'), 'success')

        router.push({ name: 'campaigns' })
      },
    },
  )

  const selectedLabels = ref([])

  const form = ref({
    id: null,
    campaign_id: props.campaignId,
    name: null,
    gender: null,
    excluded_age_ranges: [],
    optimized_targeting_enabled: null,
  })

  if (adGroup.value) {
    const { name, gender, optimized_targeting_enabled, labels, excluded_age_ranges } = adGroup.value

    form.value.name = name
    form.value.excluded_age_ranges = excluded_age_ranges
    form.value.optimized_targeting_enabled = +optimized_targeting_enabled
    if (gender == null) form.value.gender = 'Both'
    else form.value.gender = gender
    selectedLabels.value = labels
    isEditMode.value = true
  }

  const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
      if (!isValid) {
        const el = document.querySelector('.v-input--error:first-of-type')

        if (el) { el.scrollIntoView() }

        return
      }

      const formData = form.value

      const data = {
        labels: selectedLabels.value,
        ...formData,
        optimized_targeting_enabled: formData.optimized_targeting_enabled == 1,
        gender: (formData.gender == 0 || formData.gender == 'Both') ? null : formData.gender,
      }

      const { id, ...sendedData } = data

      if (isEditMode.value) {
        const { campaign_id, ...sendedDataForUpdate } = sendedData
        runUpdate({ id: props.id, ...sendedDataForUpdate, gender: formData.gender == 0 || formData.gender == 'Both' ? null : formData.gender })

        return
      }

      runCreate({ ...sendedData })
    })
  }

  const rules = reactive({
    name: [requiredValidator],
    optimized_targeting_enabled: [requiredValidator],
    gender: [requiredValidator],
  })

  const loading = computed(() => creationLoading.value || updateLoading.value)
</script>

<template>
  <VForm ref="refVForm" @submit.prevent="onSubmit">
    <VRow>
      <VCol cols="12">
        <AppTextInput v-model="form.name" autofocus :label="$t('ad_group_name')" :rules="rules.name" />
      </VCol>
      <VCol cols="12">
        <AppSelect
          v-model="form.excluded_age_ranges"
          hide-no-data
          :item-title="item => item.title"
          :item-value="item => item.id"
          :items="excludedAgeRanges"
          :label="$t('excluded_age_ranges')"
          multiple
        />
      </VCol>
      <VCol cols="12">
        <AppSelect
          v-model="form.optimized_targeting_enabled"
          hide-no-data
          :item-title="item => item.name"
          :item-value="item => item.value"
          :items="optimizedTargeting"
          :label="$t('optimized_targeting_enabled')"
          :rules="rules.optimized_targeting_enabled"
        />
      </VCol>

      <VCol cols="12">
        <AppSelect
          v-model="form.gender"
          hide-no-data
          :item-title="item => item.name"
          :item-value="item => item.id"
          :items="genders"
          :label="$t('gender')"
          :rules="rules.gender"
        />
      </VCol>

      <VCol cols="12">
        <VLabel class="mb-1 text-body-2 text-high-emphasis" for="labels">
          {{ t('labels') }}
        </VLabel>

        <VCombobox
          id="labels"
          v-model="selectedLabels"
          chips
          class="custom-chip"
          deletable-chips
          multiple
        >
          <template #selection="data">
            <VChip v-bind="data.attrs" close @click:close="removeLabel(data.item)">
              {{ data.item }}
            </VChip>
          </template>
        </VCombobox>
      </VCol>

      <VCol cols="12">
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

.custom-chip span {
  background-color: #7367f0;
  color: #fff !important;
}
</style>
