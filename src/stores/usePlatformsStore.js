import i18n from '@/i18n'
import SocialPlatformsService from '@/services/social-platforms-service'
import { defineStore } from 'pinia'
import metaImage from '@/assets/meta-logo.svg'
import tiktokImage from '@/assets/tiktok-logo.svg'
import xImage from '@/assets/x-logo.svg'
import snapchatImage from '@/assets/snapchat-logo.svg'
import googleImage from '@/assets/google-logo.svg'

const { t } = i18n.global

export const usePlatformsStore = defineStore('platforms', {
  state: () => ({
    platforms: [
      {
        code: 'meta',
        title: t('platforms.meta.title'),
        subtitle: t('platforms.meta.subtitle'),
        image: metaImage,
        btnText: t('platforms.connect_btn_text'),
        status: 'UnlinkedAccount',
      },
      {
        code: 'tiktok',
        title: t('platforms.tiktok.title'),
        subtitle: t('platforms.tiktok.subtitle'),
        image: tiktokImage,
        btnText: t('platforms.connect_btn_text'),
        status: 'UnlinkedAccount',
      },
      {
        code: 'twitter',
        title: t('platforms.x.title'),
        subtitle: t('platforms.x.subtitle'),
        image: xImage,
        btnText: t('platforms.connect_btn_text'),
        status: 'UnlinkedAccount',
      },
      {
        code: 'snapchat',
        title: t('platforms.snapchat.title'),
        subtitle: t('platforms.snapchat.subtitle'),
        image: snapchatImage,
        btnText: t('platforms.connect_btn_text'),
        status: 'UnlinkedAccount',
      },
      {
        code: 'googleads',
        title: t('platforms.google.title'),
        subtitle: t('platforms.google.subtitle'),
        image: googleImage,
        btnText: t('platforms.connect_btn_text'),
        status: 'UnlinkedAccount',
      },
    ],
  }),
  actions: {
    async checkAuth (platform) {
      this.platforms.find(item => item.code === platform).loading = true
      const socialService = SocialPlatformsService(platform)
      const { data } = await socialService.checkAuthentication()
      this.platforms.find(item => item.code === platform).status = data.code
    },

    async getAdAccounts (platform) {
      const socialService = SocialPlatformsService(platform)
      const { data } = await socialService.getAdAccounts()
      return data?.data
    },

    async getFacebookPages () {
      this.isLoading = true

      const socialService = SocialPlatformsService('meta')

      const { data } = await socialService.getFacebookPages()

      this.isLoading = false

      return data?.data
    },

    async getFundingInstruments (platform, adAccountID) {
      this.isLoading = true

      const socialService = SocialPlatformsService(platform)

      const { data } = await socialService.getFundingInstruments(adAccountID)

      this.isLoading = false

      return data?.data
    },

    async getPixels (platform, adAccountID) {
      const socialService = SocialPlatformsService(platform)

      const { data } = await socialService.getPixels(adAccountID)

      return data?.data
    },

    async storeAdAccount (platform, payload) {
      this.isLoading = true

      const socialService = SocialPlatformsService(platform)

      this.isLoading = false

      return socialService.storeAdAccount(payload)
    },

    async getActivePlatforms () {
      const promises = []
      const allPlatformsCodes = this.platforms.map(p => p.code)
      for (const key in allPlatformsCodes) {
        promises.push(this.checkAuth(allPlatformsCodes[key]))
      }
      await Promise.all(promises)

      return this.platforms.filter(p => p.status === 'Success')
    },

    async startAuthentication (platform) {
      this.platforms.find(item => item.code === platform).loading = true
      this.isLoading = true

      const socialService = SocialPlatformsService(platform)

      const { data } = await socialService.startAuthentication()

      this.platforms.find(item => item.code === platform).loading = false
      this.isLoading = false

      return data
    },

    async getPublicProfiles (adAccountId) {
      this.isLoading = true

      const socialService = SocialPlatformsService('snapchat')

      const result = await socialService.getPublicProfiles(adAccountId)

      this.isLoading = false

      return result
    },
  },
})
