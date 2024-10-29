<script>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import DigitalWriterService from '@/services/digital-writer-service'
  import { useRequest } from 'vue-request'

  export default {
    setup (props, { emit }) {
      const { t } = useI18n() // use useI18n inside setup

      const options = ref({
        page: 1,
        itemsPerPage: 10,
      })

      // Reactive data
      const items = ref([
        { title: t('advertising_texts'), value: 0 },
        { title: t('description_of_products'), value: 1 },
        { title: t('advertising_scenarios'), value: 2 },
        { title: t('content_designs'), value: 3 },
        { title: t('landing_pages'), value: 4 },
      ])

      const activeItem = ref(0)
      const conversations = ref(0)
      const totalPage = ref()

      const setActive = itemValue => {
        activeItem.value = itemValue
        emit('updateActiveTab', itemValue)
      }

      const handleChangeHistoryTab = id => {
        setActive(id)
        fetchConversationById(id)
      }

      const { run, loading: loadingConversations } = useRequest(
        params => DigitalWriterService.getConversations(params),
        {
          onSuccess: res => {
            const { data } = res.data
            options.value.page = data.current_page
            totalPage.value = data.page_size
            conversations.value = data?.items
          },
        }
      )

      const { run: fetchConversationById, loading: loadConversation } = useRequest(
        () => DigitalWriterService.getConversationById({ id: activeItem.value }),
        {
          onSuccess: res => {
            emit('updateMessagesHistory', res.data.data)
          },
        }
      )

      const isLoading = computed(() => loadConversation.value)

      run()
      return {
        items,
        activeItem,
        setActive,
        conversations,
        handleChangeHistoryTab,
        t,
        isLoading,
      }
    },
  }
</script>

<template>
  <div class="writer-sidebar pa-4">
    <v-overlay v-model="isLoading" class="align-center justify-center" persistent>
      <v-progress-circular color="primary" indeterminate size="50" :width="7" />
    </v-overlay>
    <v-card class="mx-auto" max-width="300">
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :class="{ 'v-list-item--active': item.value === activeItem }"
          @click="setActive(item.value)"
        >
          <div>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </div>
        </v-list-item>

        <div>
          <hr class="separator">

          <div class="d-flex align-center sep-container">
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C16.4184 4 20 7.5816 20 12C20 16.4184 16.4184 20 12 20C10.6384 20 9.356 19.66 8.2336 19.06L4 20L4.9408 15.768C4.3408 14.6448 4 13.3624 4 12C4 7.5816 7.5816 4 12 4ZM12.8 8H11.2V13.6H16V12H12.8V8Z"
                fill="#1F1625"
              />
            </svg>
            {{ t('previous_conversations') }}
          </div>
        </div>

        <v-list-item
          v-for="(item, index) in conversations"
          :key="index"
          :class="{ 'v-list-item--active': item.id === activeItem }"
          @click="handleChangeHistoryTab(item.id)"
        >
          <div>
            <v-list-item-title>{{ item?.title }}</v-list-item-title>
          </div>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
$borderColor: rgba(31, 22, 37, 0.1);

.writer-sidebar {
  border-radius: 16px;
  border: 2px solid rgba(31, 22, 37, 0.1);
  max-height: 780px;
  overflow-y: scroll;
  height: 620px;
  min-height: 100%;

  &::-webkit-scrollbar {
    width: 1px;
    /* Set scrollbar width to 1px */
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c0c0c0;
    border-radius: 8px;

    &:hover {
      background-color: #a0a0a0;
    }
  }

  scrollbar-width: thin;
  /* Keep thin */
  scrollbar-color: #c0c0c0 #f0f0f0;
}

.writer-sidebar::-webkit-scrollbar {
  width: 0;
}

.writer-sidebar::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 10px;
}

.writer-sidebar::-webkit-scrollbar-thumb:hover {
  background-color: transparent
}

.writer-sidebar::-webkit-scrollbar-track {
  background-color: rgba(31, 22, 37, 0.05);
  border-radius: 10px;
}

.v-list {
  background-color: transparent;
  box-shadow: none !important;
  gap: 8px !important;
  display: flex;
  flex-direction: column;

  .v-list-item--active {
    background-color: rgb(var(--v-theme-primary)) !important;
    color: white;
  }

  .v-list-item {
    background-color: rgb(var(--v-theme-background));
    border-radius: 8px !important;
  }

  .v-list-item-title {
    font-size: 14px;
    color: rgb(var(--v-theme-theme-on-background));
    font-weight: 500
  }
}

.v-card {
  box-shadow: none;
}

.sep-container {
  gap: 4px;
  margin-bottom: 4px;
  font-weight: 500
}

.separator {
  margin: 8px 0;
  border-color: #1F16251A
}
</style>
