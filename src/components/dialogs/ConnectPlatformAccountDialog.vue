<script setup>
  import { requiredValidator } from '@/utilities/validators'
  import { useI18n } from 'vue-i18n'
  import { usePlatformsStore } from '@/stores/usePlatformsStore'
  import { useRequest } from 'vue-request'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'

  const props = defineProps({
    platform: {
      type: Object,
      required: true,
    },
  })

  const emit = defineEmits(['saved', 'update:isDialogVisible'])

  const form = ref({
    ad_account_id: null,
    pixel_id: null,
    public_profile_id: null,
    funding_instrument_id: null,
    facebook_page_id: null,
  })

  const platformsStore = usePlatformsStore()
  const { t } = useI18n()
  const { show } = useSnackbarStore()

  const adAccounts = ref([])

  const pixels = ref([])
  const shouldShowPixel = computed(
    () => props.platform.code.toLowerCase() !== 'googleads'
  )

  const publicProfiles = ref([])
  const shouldShowProfiles = computed(
    () => props.platform.code.toLowerCase() === 'snapchat'
  )

  const fundingInstruments = ref([])
  const shouldShowFundingInstruments = computed(
    () => props.platform.code.toLowerCase() === 'twitter'
  )
  const facebookPages = ref([])
  const shouldShowFacebookPages = computed(
    () => props.platform.code.toLowerCase() === 'meta'
  )

  const { loading: loadingAdAccounts } = useRequest(
    () => platformsStore.getAdAccounts(props.platform.code),
    {
      onSuccess: res => {
        adAccounts.value = res
      },
    }
  )

  const { run: fetchPixels, loading: loadingPixels } = useRequest(
    () => platformsStore.getPixels(props.platform.code, form.value.ad_account_id),
    {
      manual: true,
      onSuccess: res => {
        pixels.value = res
      },
    }
  )

  const { run: fetchPublicProfiles, loading: loadingProfiles } = useRequest(
    () => platformsStore.getPublicProfiles(form.value.ad_account_id),
    {
      manual: true,
      onSuccess: res => {
        const { data, error, messages } = res.data
        if (error) {
          show(messages[0], 'error')
        } else {
          publicProfiles.value = data
        }
      },
    }
  )

  const { run: fetchFundingInstruments, loading: loadingFundingInstruments } =
    useRequest(
      () =>
        platformsStore.getFundingInstruments(
          props.platform.code,
          form.value.ad_account_id
        ),
      {
        manual: true,
        onSuccess: res => {
          fundingInstruments.value = res
        },
      }
    )

  const { run: fetchFacebookPages, loading: loadingFacebookPages } = useRequest(
    () => platformsStore.getFacebookPages(props.platform.code),
    {
      manual: true,
      onSuccess: res => {
        facebookPages.value = res
      },
    }
  )

  const { run: runCheckAuth, loading: loadingCheckingPlatform } = useRequest(
    platformsStore.checkAuth,
    {
      manual: true,
    }
  )

  const { run: submitAdAccount, loading: loadingSubmittingAdAccount } =
    useRequest(
      data => platformsStore.storeAdAccount(props.platform.code, data),
      {
        manual: true,
        onSuccess: res => {
          const { error, messages } = res.data

          if (error) {
            show(messages[0], 'error')

            return
          } else {
            runCheckAuth(props.platform.code)
            show(t('connected_successfully'), 'success')
          }

          emit('update:isDialogVisible', false)
          emit('saved', true)
        },
      }
    )

  const handleClose = () => {
    emit('update:isDialogVisible', false)
  }

  const handleAdAccountIdChange = () => {
    switch (props.platform.code) {
      case 'meta':
        fetchPixels()
        break
      case 'snapchat':
        fetchPixels()
        break
      case 'tiktok':
        fetchPixels()
        break
      case 'twitter':
        fetchFundingInstruments()
        break
    }

    form.value.pixel_id = null
    form.value.public_profile_id = null
    form.value.funding_instrument_id = null
  }

  const handlePixelChange = () => {
    switch (props.platform.code) {
      case 'snapchat':
        fetchPublicProfiles()
        break
      case 'meta':
        fetchFacebookPages()
        break
      default:
        break
    }

    form.value.public_profile_id = null
  }

  const isFormValid = computed(() => {
    const requirements = {
      snapchat: () =>
        form.value.ad_account_id &&
        form.value.pixel_id &&
        form.value.public_profile_id,
      meta: () =>
        form.value.ad_account_id &&
        form.value.pixel_id &&
        form.value.facebook_page_id,
      twitter: () =>
        form.value.ad_account_id &&
        form.value.pixel_id &&
        form.value.funding_instrument_id,
      googleads: () => form.value.ad_account_id,
      default: () => form.value.ad_account_id && form.value.pixel_id,
    }

    return !!(requirements[props.platform.code] || requirements.default)()
  })
</script>
<template>
  <v-card
    class="connect-platform px-6 rounded-xl"
    min-width="40vw"
    rounded="lg"
  >
    <v-card-title class="d-flex justify-space-between align-center px-0">
      <div class="text-h5 text-medium-emphasis text-tajawal">
        <div class="d-flex align-center ga-2">
          <v-img aspect-ratio="1/1" :src="props.platform.image" width="40" />
          <p>
            <span class="dark-1"> {{ t("account_connect") }} </span>
            <span class="text-warning"> ({{ props.platform.title }}) </span>
          </p>
        </div>
      </div>

      <v-btn
        class="close-btn"
        icon="mdi-close"
        variant="text"
        @click="handleClose"
      />
    </v-card-title>

    <v-divider class="mb-4" />

    <VProgressCircular
      v-if="loadingAdAccounts"
      class="mx-auto"
      color="primary"
      indeterminate
      :size="40"
      :width="3"
    />
    <template v-else>
      <v-form>
        <v-select
          v-model="form.ad_account_id"
          :autofocus="false"
          class="mb-4"
          density="comfortable"
          flat
          height="3em"
          hide-details="auto"
          item-title="name"
          item-value="id"
          :items="adAccounts"
          :label="t('choose_ad_account')"
          rounded="lg"
          :rules="[requiredValidator]"
          variant="solo-filled"
          @update:model-value="handleAdAccountIdChange"
        />
        <template v-if="shouldShowPixel">
          <v-select
            v-if="props.platform.code !== 'twitter'"
            v-model="form.pixel_id"
            class="mb-4"
            density="comfortable"
            :disabled="!!!form.ad_account_id"
            flat
            height="3em"
            hide-details="auto"
            item-title="name"
            item-value="id"
            :items="pixels"
            :label="t('choose_pixel')"
            :loading="loadingPixels"
            rounded="lg"
            :rules="[requiredValidator]"
            variant="solo-filled"
            @update:model-value="handlePixelChange"
          />
          <v-text-field
            v-else
            v-model="form.pixel_id"
            class="mb-4"
            density="comfortable"
            flat
            height="3em"
            hide-details="auto"
            :label="t('choose_pixel')"
            rounded="lg"
            :rules="[requiredValidator]"
            variant="solo-filled"
            @update:model-value="handlePixelChange"
          />
        </template>
        <v-select
          v-if="shouldShowProfiles"
          v-model="form.public_profile_id"
          class="mb-4"
          density="comfortable"
          :disabled="!!(!form.ad_account_id || !form.pixel_id)"
          flat
          height="3em"
          hide-details="auto"
          item-title="name"
          item-value="id"
          :items="publicProfiles"
          :label="t('choose_public_profile')"
          :loading="loadingProfiles"
          rounded="lg"
          :rules="[requiredValidator]"
          variant="solo-filled"
        />
        <v-select
          v-if="shouldShowFundingInstruments"
          v-model="form.funding_instrument_id"
          class="mb-4"
          density="comfortable"
          :disabled="!!(!form.ad_account_id || !form.pixel_id)"
          flat
          height="3em"
          hide-details="auto"
          item-title="name"
          item-value="id"
          :items="fundingInstruments"
          :label="t('funding_instrument')"
          :loading="loadingFundingInstruments"
          rounded="lg"
          :rules="[requiredValidator]"
          variant="solo-filled"
        />
        <v-select
          v-if="shouldShowFacebookPages"
          v-model="form.facebook_page_id"
          class="mb-4"
          density="comfortable"
          :disabled="!!(!form.ad_account_id || !form.pixel_id)"
          flat
          height="3em"
          hide-details="auto"
          item-title="name"
          item-value="id"
          :items="facebookPages"
          :label="t('choose_facebook_page')"
          :loading="loadingFacebookPages"
          rounded="lg"
          :rules="[requiredValidator]"
          variant="solo-filled"
        />
      </v-form>
    </template>
    <v-divider class="mt-2" />

    <v-card-actions class="my-2 d-flex justify-end">
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
        :loading="loadingSubmittingAdAccount || loadingCheckingPlatform"
        rounded="xl"
        :text="t('save')"
        variant="flat"
        :width="120"
        @click="submitAdAccount(form)"
      />
    </v-card-actions>
  </v-card>
</template>

<style lang="scss">
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
}
</style>
