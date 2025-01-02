<script setup>
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'

  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  const route = useRoute()
  const adGroupId = route.params.adGroupId
  const platform = route.query.platform?.toLowerCase()

  const recommendations = ref([
    {
      id: 1,
      text: 'my_answers_title',
    },
    {
      id: 2,
      text: 'my_answers_title',
    },
    {
      id: 3,
      text: 'my_answers_title',
    }, {
      id: 4,
      text: 'my_answers_title',
    },
  ])

  watch(
    locale,
    () => {
      update([
        {
          title: t('ads'),
          active: false,
          to: '/campaigns/',
        },
        {
          title: t('add_ad'),
          active: true,
          disabled: true,
          to: `/ads/none/add`,
        },
      ])
    },
    { immediate: true }
  )
</script>
<template>

  <div>
    <v-container>
      <v-row>
        <v-col class="ps-0 form-container" cols="8">
          <AdFormFieldsTiktok v-if="platform === 'tiktok'" :ad-group-id="adGroupId" :platform="platform" />
          <AdFormFieldsSnapchat v-if="platform === 'snapchat'" :ad-group-id="adGroupId" :platform="platform" />
          <AdFormFieldsX v-if="platform === 'twitter'" :ad-group-id="adGroupId" :platform="platform" />
          <AdsGoogleForm
            v-if="platform === 'googleads'"
            :ad-group-id="route.query.groupId"
            :platform="route.query.platform"
            @show="show"
          />
        </v-col>
        <v-col class="pe-0 pt-0" cols="4">
          <div class="main-container">
            <RecommendationList :recommendations="recommendations" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<style scoped>
.form-container,
.main-container {
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
}
</style>
