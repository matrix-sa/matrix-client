<script setup>
  import NotificationsService from '@/services/notifications-service'
  import { usePagination } from 'vue-request'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import NotificationItem from './NotificationItem.vue'

  const notifications = ref(null)
  const totalCount = ref(0)
  const pageSize = ref()
  const { show } = useSnackbarStore()

  const options = ref({
    page: 1,
    itemsPerPage: 10,
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

  run()

</script>

<template>
  <div>
    <v-overlay v-model="loadingNotifications" class="align-center justify-center" persistent>
      <v-progress-circular color="primary" indeterminate size="50" :width="7" />
    </v-overlay>
    <div class="d-flex flex-column">
      <NotificationItem
        v-for="notification in notifications"
        v-if="notifications"
        :key="notification.id"
        :notification="notification"
      />
    </div>
  </div>
</template>
