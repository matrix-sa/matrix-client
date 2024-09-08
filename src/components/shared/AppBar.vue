<script setup>
  const items = ref([
    {
      title: 'ربط الحسابات الإعلانية',
      disabled: false,
      href: 'breadcrumbs_dashboard',
    },
    {
      title: 'إضافة متجر',
      disabled: false,
      active: true,
      href: 'breadcrumbs_link_1',
    },
  ])

  const language = ref('English')
</script>

<template>
  <div class="app-bar-wrapper">
    <div class="app-bar">
      <div>
        <v-breadcrumbs
          active-color="black"
          class="app-bar-breadcrumbs"
          color="surface-variant"
          :items="items"
        >
          <template #divider>
            <v-icon icon="mdi:dot" />
          </template>
          <template #prepend>
            <v-icon icon="mdi:dot" />
          </template>
        </v-breadcrumbs>
      </div>
      <div class="d-flex align-center ga-3">
        <v-select
          base-color="black"
          bg-color="background"
          class="lagnuage-select"
          color="primary"
          flat
          hide-details
          :items="['English', 'العربي']"
          :model-value="language"
          prepend-inner-icon="mdi:language"
          rounded
          single-line
          variant="solo"
          width="150"
        />

        <v-btn
          base-color="black"
          class="notification-btn"
          stacked
          variant="plain"
        >
          <v-badge color="primary" dot>
            <v-icon>mdi:bell</v-icon>
          </v-badge>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-bar-wrapper {
  width: 100%;
  padding-inline: 1.5em;
  padding-block: 1.5em;
}

.app-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: white;
  border-radius: 1.5em;
}

.app-bar {
  &:nth-child(2) {
    * {
      flex-grow: 0;
    }
  }
}

.notification-btn {
  background-color: rgb(var(--v-theme-background)) !important;
  color: black !important;
  border-radius: 12px !important;
  opacity: 1 !important;
}

.language-select {
  border-radius: 12px !important;
  opacity: 1 !important;
}
</style>

<style lang="scss">
.app-bar {
  .v-field {
    padding-inline: 1em !important;
    padding-block: 0.5em !important;
  }

  .v-field--rounded {
    border-radius: 12px !important;
  }

  .v-field__field {
    color: black !important;
  }

  .v-field__prepend-inner {
    color: black !important;
    .v-icon {
      opacity: 1 !important;
    }
  }

  .v-field__append-inner {
    color: rgb(var(--v-theme-primary)) !important;
  }
}

.app-bar-breadcrumbs{
  .v-breadcrumbs-divider:last-of-type{
    color: rgb(var(--v-theme-primary)) !important;
  }

  // selecting the last divider
  .v-breadcrumbs-divider:has(+li:last-child) svg{
    color: rgb(var(--v-theme-primary)) !important;
  }
}
</style>
