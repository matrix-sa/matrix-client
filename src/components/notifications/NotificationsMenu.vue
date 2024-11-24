<script setup>

  import NotificationsService from '@/services/notifications-service'
  import { usePagination } from 'vue-request'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useI18n } from 'vue-i18n'

  const notifications = ref(null)
  const totalCount = ref(0)
  const pageSize = ref()
  const { show } = useSnackbarStore()
  const { t } = useI18n()
  const router = useRouter()
  const options = ref({
    page: 1,
    itemsPerPage: 4,
    sortBy: [],
    groupBy: [],
    search: undefined,
  })

  const getQuery = params => {
    const query = new URLSearchParams()

    query.append('PageSize', options.value.itemsPerPage)
    query.append('Page', options.value.page)

    return query
  }

  const { run, loading: loadingNotifications } = usePagination(
    params => NotificationsService.get(getQuery(params)),
    {
      manual: true,
      onSuccess: res => {
        const { data, error, messages } = res.data
        if (error) {
          show(messages[0], 'error')
          return
        }
        notifications.value = data.items
        options.value.page = data.current_page
        pageSize.value = data.page_size
        totalCount.value = data.total_count
      },
      onError: err => {
        console.error(err)
      },
    }
  )

  const redirectionToNotifications = () => {
    router.push({ name: '/notifications/' })
  }
  run()
</script>
<template>
  <v-list v-if="loadingNotifications || notifications?.length===0" class="list">
    <v-list-item
      v-if="loadingNotifications"
      class="d-flex justify-center align-center"
      style="height: 250px;"
    ><v-progress-circular
      color="primary"
      indeterminate
      size="20"
      :width="2"
    /></v-list-item>
    <v-list-item v-else> <EmptyContent :title="t('no_notifications')" /></v-list-item>
  </v-list>

  <v-list v-else class="list">

    <v-list-item>
      <div class="list-header">
        <span class="gray">{{ t('you_have') }}</span> <span class="notify_num">{{ notifications?.length }}</span> <span
          class="gray"
        >{{
          t('new_notifications') }}</span>
      </div>
    </v-list-item>

    <v-divider class="mb-0" />

    <v-list-item v-for="notification in notifications" :key="notification.id">
      <NotificationItem :is-menu="true" :notification="notification" />
    </v-list-item>

    <v-divider class="mb-0 mt-3" />

    <div class="d-flex justify-center pt-3 pb-2">
      <v-btn
        class="show-all-btn"
        height="40px"
        rounded
        width="184px"
        @click="redirectionToNotifications"
      >
        {{ t("show_all") }}
      </v-btn>
    </div>
  </v-list>
</template>

<style scoped lang="scss">
.v-list {
  border-radius: 16px !important;
  box-shadow: 0px 8px 18px 0px #0000001A;
  min-width: 400px
}

.v-list-item {
  padding: 16px
}

.v-list-item:hover {
  background-color: #F9F9F9;
}

.notify_num {
  color: #FFF;
  background-color: rgb(var(--v-theme-warning)) !important;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  padding: 10px
}

.list-header {
  display: flex !important;
  align-items: center;
  gap: 5px;
}

.v-list {
  min-height: 360px !important;
}

.show-all-btn {
  background-color: #FB813E1A;
  color: rgb(var(--v-theme-warning)) !important;
  box-shadow: none !important
}

.gray {
  color: rgb(var(--v-theme-surface-variant)) !important;

}
</style>
