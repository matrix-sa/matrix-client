<script setup>
import { useRequest } from 'vue-request'
import AppTextarea from '@/components/core/AppTextarea.vue'
import { convertToCamelCase } from '@/utilities/validators-helpers'
import {
  requiredValidator,
  urlAdvancedValidator,
} from '@/utilities/validators'

import i18n from '@/i18n'
import AdsService from '@/services/ads-service'
import { useSnackbarStore } from '@/stores/useSnackBarStore'
import { reactive, ref } from 'vue'
import MediaFileUpload from '@/components/core/MediaFileUpload.vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  ad: {
    type: Object,
    default: null,
  },
  adGroupId: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
})

const isEditMode = ref(false)

const mediaFile = ref(null)
const devices = ref(['Unspecified', 'Unknown', 'Mobile', 'Tablet', 'Desktop', 'Other', 'ConnectedTv'])
const { t } = i18n.global

const router = useRouter()

const googleOrder = {
  name: 1,
  Headline: 2,
  ad_description: 3,
  targetUrl: 4,
  device: 5,
  mediaType: 6,
  media: 7,
  headline: 8,
}

const mediaTypes = ref([
  /* {
id: "Video",
name: t("video"),
}, */
  {
    id: 'Image',
    name: t('image'),
  },
])

const { show } = useSnackbarStore()

const refVForm = ref('')

const ad = ref(props.ad)

const { run: create, loading: createLoading } = useRequest(
  data => AdsService.launch(props.platform, data),
  {
    manual: true,
    onSuccess: res => {
      const { error, data, messages, code } = res.data

      if (error) {
        show(messages[0], 'error')

        if (data) {
          router.push({
            name: 'ads-platform-id',
            params: { id: data.id, platform: data.ad_platform },
          })
        }
        return
      }

      show(t('created_message'), 'success')
      router.push({ name: 'campaigns' })
    },
  },
)

const form = ref({
  /* id: null, */
  ad_group_id: props.adGroupId,
  name: null,
  Headline: null,
  target_url: null,
  media_file: null,
  description: null,
})

const allowedImgSizes = ref([
  { width: 200, height: 200 },
  { width: 240, height: 400 },
  { width: 250, height: 250 },
  { width: 250, height: 360 },
  { width: 300, height: 250 },
  { width: 336, height: 280 },
  { width: 580, height: 400 },
  { width: 120, height: 600 },
  { width: 160, height: 600 },
  { width: 300, height: 600 },
  { width: 300, height: 1050 },
  { width: 468, height: 60 },
  { width: 728, height: 90 },
  { width: 930, height: 180 },
  { width: 970, height: 90 },
  { width: 970, height: 250 },
  { width: 980, height: 120 },
  { width: 300, height: 50 },
  { width: 320, height: 50 },
  { width: 320, height: 100 },
])

const acceptedExts = ref(['gif', 'jpg', 'png'])

if (props.ad) {
  form.value = ad.value
  isEditMode.value = true
}

const validateMedia = media => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = window.URL.createObjectURL(media)

    const fileExtension = media.name.split('.').pop().toLowerCase()
    const isValidExtension = acceptedExts.value.includes(fileExtension)

    if (!isValidExtension) {
      reject(false) // Invalid extension, reject promise
      return
    }

    img.onload = () => {
      const imgWidth = img.width
      const imgHeight = img.height

      const isValid = allowedImgSizes.value.some(
        dim => dim.width === imgWidth && dim.height === imgHeight
      )

      if (isValid) {
        resolve(true) // Dimensions are valid, resolve promise
      } else {
        resolve(false) // Dimensions are invalid, resolve promise
      }
    }

    img.onerror = () => {
      reject(false) // Error loading image, reject promise
    }
  })
}

const onSubmit = async () => {
  const { valid: isValidForm } = await refVForm.value?.validate()
  if (!isValidForm) {
    const el = document.querySelector('.v-input--error:first-of-type')
    if (el) el.scrollIntoView()
    return
  }
  const data = {}
  for (const key in form.value) {
    if (key.trim().toLowerCase() != 'media_file') {
      data[convertToCamelCase(key)] = form.value[key]
    }
  }

  data.AdGroupId = props.adGroupId
  data.MediaFile = form.value.media_file

  if (data.MediaFile) {
    try {
      // Validate media file
      const isMediaValid = await validateMedia(data.MediaFile)
      // If media is valid, proceed with update or create
      if (isMediaValid) {
        create({ ...data })
      }
    } catch (error) {
      console.error('Media validation failed:', error)
    }
  } else {
    show(t('media_img_empty'), 'error')
  }
}

const rules = reactive({
  name: [requiredValidator],
  ad_Headline: [requiredValidator],
  target_url: [requiredValidator, urlAdvancedValidator],
  ad_group_id: [requiredValidator],
  media_file: [requiredValidator],
  media_type: [requiredValidator],
  device: [requiredValidator],
  ad_description: [requiredValidator],
})

const loading = computed(() => createLoading.value /* || updateLoading.value */)

const getOrderStyle = order => ({ order })

</script>

<template>
  <VForm ref="refVForm" @submit.prevent="onSubmit">

    <VRow>
      <VCol cols="12" :style="getOrderStyle(googleOrder.name)">
        <AppTextInput v-model="form.name" autofocus :label="$t('ad_name')" :rules="rules.name" />
      </VCol>
      <VCol cols="12" :style="getOrderStyle(googleOrder.Headline)">
        <AppTextInput v-model="form.Headline" :label="$t('Headline')" :rules="rules.ad_Headline" />
      </VCol>
      <VCol cols="12" :style="getOrderStyle(googleOrder.ad_description)">
        <AppTextarea v-model="form.description" :label="$t('ad_description')" :readonly="isEditMode"
          :rules="rules.ad_description" />
      </VCol>
      <VCol cols="12" :style="getOrderStyle(googleOrder.targetUrl)">
        <AppTextInput v-model="form.target_url" :label="$t('target_url')" :readonly="isEditMode"
          :rules="rules.target_url" />
      </VCol>

      <VCol cols="12" :style="getOrderStyle(googleOrder.device)">
        <AppSelect v-model="form.device" hide-no-data :item-title="(item) => t(item)" :item-value="(item) => item"
          :items="devices" :label="$t('device')" :rules="rules.device" />
      </VCol>
      <VCol cols="12" :style="getOrderStyle(googleOrder.mediaType)">
        <AppSelect v-model="form.media_type" hide-no-data :item-title="(item) => item.name"
          :item-value="(item) => item.id" :items="mediaTypes" :label="$t('media_type')" :rules="rules.media_type" />
      </VCol>
      <VCol cols="12" :style="getOrderStyle(googleOrder.media)">
        <MediaFileUpload v-model="form" :platform="props.platform" />
      </VCol>

      <VCol cols="12" :style="getOrderStyle(1000)">
        <VBtn block color="primary" :disabled="loading" :loading="loading" type="submit">
          {{ isEditMode ? $t("update") : $t("create") }}
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
