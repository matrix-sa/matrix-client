<script setup>
  import { isEmpty } from '@/utilities/validators-helpers'
  import { requiredValidator } from '@/utilities/validators'

  import platforms from '@/constants/platforms'
  import platformMediaConfig from '@/constants/platformsMediaConfig'
  import BlobService from '@/services/blob-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import calculateAspectRatio from 'calculate-aspect-ratio'
  import { computed, ref } from 'vue'
  import { useRequest } from 'vue-request'

  const props = defineProps({
    platform: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Object,
      required: true,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const { run: getMediaBlob, loading: getMediaBlobLoading } = useRequest(
    BlobService.getBlob,
    {
      manual: true,
      onSuccess: blobFile => {
        theModel.value.media_file = [blobFile]
      },
    },
  )

  const url = props.modelValue.ad_media?.url ?? props.modelValue.ad_video?.url
  if (url) {
    getMediaBlob(url)
  }

  const rules = reactive({
    media_type: [requiredValidator],
    media_file: [],
  })

  const { show } = useSnackbarStore()

  const mediaConfig = platformMediaConfig[props.platform.toUpperCase()] || {}

  const {
    acceptedImageTypes,
    acceptedVideoTypes,
    maxImageSize,
    maxVideoSize,
    maxVideoDuration,
    minVideoDuration,
    acceptedVideoAspectRatio,
    acceptedImageAspectRatio,
    acceptedImageWidth,
    acceptedImageHeight,
    minImageWidth,
    minImageHeight,
  } = mediaConfig

  const theModel = toRef(props, 'modelValue')

  const mediaUrl = ref('')

  const isTiktok = computed(
    () => props.platform.toUpperCase() == platforms.TIKTOK.toUpperCase(),
  )

  if (isTiktok.value) {
    theModel.value.media_type = 'Video'
  }
  watch(
    () => theModel.value.media_file,
    () => {
      const file = theModel.value.media_file[0]

      if (isEmpty(file)) {
        mediaUrl.value = ''

        return
      }
      if (
        (theModel.value.media_type == 'Image' && file.size > maxImageSize) ||
        (theModel.value.media_type == 'Video' && file.size > maxVideoSize)
      ) {
        mediaUrl.value = ''

        show(
          `file size should not exceed ${theModel.value.media_type == 'Image'
            ? maxImageSize / 1048576
            : maxVideoSize / 1048576
          }`,
          'error',
        )

        theModel.value.media_file = ''
        mediaUrl.value = ''

        return
      }

      const reader = new FileReader()

      if (theModel.value.media_type == 'Image') {
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          const image = new Image()
          image.src = e.target.result
          image.onload = function () {
            if (!isEmpty(minImageWidth)) {
              if (this.width < minImageWidth) {
                show(`min width should be ${minImageWidth}px`, 'error')
                mediaUrl.value = ''
                theModel.value.media_file = ''

                return
              }
            }

            if (!isEmpty(minImageHeight)) {
              if (this.height < minImageHeight) {
                show(`min height should be ${minImageHeight}px`, 'error')
                mediaUrl.value = ''
                theModel.value.media_file = ''

                return
              }
            }

            if (!isEmpty(acceptedImageHeight)) {
              if (this.height != acceptedImageHeight) {
                show(`height should be ${acceptedImageHeight}px`, 'error')
                mediaUrl.value = ''
                theModel.value.media_file = ''

                return
              }
            }

            if (!isEmpty(acceptedImageWidth)) {
              if (this.width != acceptedImageWidth) {
                show(`width should be ${acceptedImageWidth}px`, 'error')
                mediaUrl.value = ''
                theModel.value.media_file = ''

                return
              }
            }

            mediaUrl.value = e.target.result
          }
        }
      }
      if (theModel.value.media_type == 'Video') {
        const url = URL.createObjectURL(file)
        const $video = document.createElement('video')

        $video.src = url

        $video.addEventListener('loadedmetadata', function () {
          const width = this.videoWidth
          const height = this.videoHeight

          const aspectRatio = calculateAspectRatio(width, height)

          if (!isEmpty(acceptedVideoAspectRatio)) {
            if (!acceptedVideoAspectRatio.includes(aspectRatio)) {
              show(
                `Aspect ratio should be ${acceptedVideoAspectRatio.join(' or ')}`,
                'error',
              )
              mediaUrl.value = ''
              theModel.value.media_file = ''

              return
            }
          }
          mediaUrl.value = url
        })
      }
    },
  )
</script>

<template>
  <VRow>
    <VCol cols="12" md="12">
      <Transition name="fade">
        <div>
          <div v-if="theModel.media_type == 'Video'">
            <h5 class="text-h5 mb-5">
              {{ $t("video_upload_title") }} 🚀
            </h5>

            <p class="text-xs">
              {{ $t("video_upload_tips") }}
            </p>
            <VFileInput
              v-if="theModel.media_type"
              id="media_el"
              v-model="theModel.media_file"
              :accept="acceptedVideoTypes"
              color="primary"
              :label="$t('upload_media_file')"
              prepend-icon=""
              :rules="rules.media_video"
              show-size
              variant="outlined"
            />
          </div>
          <div v-if="theModel.media_type == 'Image'">
            <h5 class="text-h5 mb-5">
              {{ $t("image_upload_title") }} 🚀
            </h5>

            <p class="text-xs">
              {{ $t("image_upload_tips") }}
            </p>
            <VFileInput
              v-if="theModel.media_type"
              id="media_el"
              v-model="theModel.media_file"
              :accept="acceptedImageTypes"
              color="primary"
              :label="$t('upload_media_file')"
              prepend-icon=""
              :rules="rules.media_image"
              show-size
              variant="outlined"
            />
          </div>
        </div>
      </Transition>
    </VCol>

    <VCol cols="12" md="12">
      <div v-if="mediaUrl" class="border rounded pa-4 pb-2 d-flex items-center justify-center align-center h-100">
        <VImg v-if="theModel.media_type == 'Image'" :src="mediaUrl" style="width: 100%; height: auto;" />
        <video v-if="theModel.media_type == 'Video'" controls style="width: 100%; height: auto;">
          <source :src="mediaUrl" type="video/mp4">
        </video>
      </div>
    </VCol>
  </VRow>
</template>

<style scoped>
.text-xs {
  margin-bottom: 10px
}
</style>
