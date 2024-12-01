<script setup>
  import {
    isVideoFile,
    requiredValidator,
    urlAdvancedValidator,
  } from '@/utilities/validators'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useRequest } from 'vue-request'
  import { useI18n } from 'vue-i18n'
  import { convertToCamelCase } from '@/utilities/validators-helpers'
  import AdsService from '@/services/ads-service'

  const props = defineProps({
    platform: {
      type: String,
      required: true,
    },
    adGroupId: {
      type: String,
      required: true,
    },
  })

  const { t } = useI18n()
  const router = useRouter()
  const { show } = useSnackbarStore()

  const refVForm = ref('')

  const { run: create, loading } = useRequest(
    data => AdsService.launch(props.platform, data),
    {
      manual: true,
      onSuccess: res => {
        const { error, messages } = res.data

        if (error) {
          show(messages[0], 'error')
          return
        }

        show(t('created_message'), 'success')

        router.push({
          name: '/campaigns/',
        })
      },
    }
  )

  const form = ref({
    id: null,
    ad_group_id: props.adGroupId,
    name: null,
    ad_text: null,
    target_url: null,
    media_file: null,
  })

  const rules = reactive({
    name: [requiredValidator],
    ad_text: [requiredValidator],
    target_url: [requiredValidator, urlAdvancedValidator],
    ad_group_id: [requiredValidator],
    media_file: [requiredValidator, isVideoFile],
  })

  const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
      console.log('valid', isValid)
      if (!isValid) {
        return
      }

      const data = {}
      for (const key in form.value) {
        data[convertToCamelCase(key)] = form.value[key]
      }

      data.AdGroupId = props.adGroupId
      create({ ...data })
    })
  }
</script>

<template>
  <VForm ref="refVForm" @submit.prevent="onSubmit">
    <VCol cols="12">
      <AppTextInput
        v-model="form.name"
        autofocus
        :label="$t('ad_name')"
        :rules="rules.name"
      />
    </VCol>
    <VCol cols="12">
      <AppTextInput
        v-model="form.ad_text"
        :label="$t('ad_text')"
        :rules="rules.ad_text"
      />
    </VCol>
    <VCol cols="12">
      <AppTextInput
        v-model="form.target_url"
        :label="$t('target_url')"
        :rules="rules.target_url"
      />
    </VCol>
    <VCol cols="12">
      <AppFileInput
        v-model="form.media_file"
        :label="$t('media_file')"
        :label-hint="$t('tiktok_video')"
        :rules="rules.media_file"
      />
    </VCol>

    <VCol cols="12">
      <VBtn
        block
        color="primary"
        :disabled="loading"
        :loading="loading"
        :text="t('create')"
        type="submit"
      />
    </VCol>
  </VForm>
</template>
