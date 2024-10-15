<script setup>
import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
import { storeToRefs } from 'pinia'

import { useI18n } from 'vue-i18n'


const { t } = useI18n()

const breadcrumbsStore = useBreadcrumbsStore()
const { items } = storeToRefs(breadcrumbsStore)
const prependColor = computed(() => items.value.length === 1 ? 'primary' : '')
</script>

<template>
  <div class="app-bar-wrapper">
    <div class="app-bar">
      <div>
        <v-breadcrumbs active-color="surface-variant" class="app-bar-breadcrumbs" color="surface-variant"
          :items="items">
          <template #divider>
            <v-icon icon="mdi:dot" />
          </template>
          <template #prepend>
            <v-icon :color="prependColor" icon="mdi:dot" size="30" />
          </template>
        </v-breadcrumbs>
      </div>


      <div class="d-flex align-center ga-3">

        <LanguageSwitch base-color="black" bg-color="background" class="lagnuage-select" color="primary" flat
          hide-details rounded single-line variant="solo" width="150" />

        <VBtn base-color="black" class="notification-btn" stacked variant="plain">
          <VIcon icon="tabler-sun-filled" size="26" />

        </VBtn>

        <VBtn base-color="black" class="notification-btn" stacked variant="plain">
          <v-badge color="primary" dot>
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.1872 12.0349L16.0572 10.1549C15.8072 9.74492 15.5872 8.95492 15.5872 8.47492V6.6049C15.5872 2.9749 12.6372 0.0249023 9.01724 0.0249023C5.38727 0.0349023 2.43727 2.9749 2.43727 6.6049V8.46492C2.43727 8.94492 2.21727 9.73492 1.97727 10.1449L0.847273 12.0249C0.417273 12.7549 0.317273 13.5849 0.587273 14.3049C0.857273 15.0349 1.46727 15.6149 2.26727 15.8749C3.34727 16.2349 4.43727 16.4949 5.54727 16.6849C5.65727 16.7049 5.76727 16.7149 5.87727 16.7349C6.01727 16.7549 6.16727 16.7749 6.31727 16.7949C6.57727 16.8349 6.83727 16.8649 7.10724 16.8849C7.73724 16.9449 8.37724 16.9749 9.01724 16.9749C9.64724 16.9749 10.2772 16.9449 10.8972 16.8849C11.1272 16.8649 11.3572 16.8449 11.5772 16.8149C11.7572 16.7949 11.9372 16.7749 12.1172 16.7449C12.2272 16.7349 12.3372 16.7149 12.4472 16.6949C13.5672 16.5149 14.6772 16.2349 15.7572 15.8749C16.5272 15.6149 17.1172 15.0349 17.3972 14.2949C17.6772 13.5449 17.5972 12.7249 17.1872 12.0349ZM9.74724 7.97492C9.74724 8.39492 9.40724 8.73492 8.98724 8.73492C8.56724 8.73492 8.22724 8.39492 8.22724 7.97492V4.8749C8.22724 4.4549 8.56724 4.1149 8.98724 4.1149C9.40724 4.1149 9.74724 4.4549 9.74724 4.8749V7.97492Z"
                fill="#1F1625" />
              <path
                d="M11.8249 17.985C11.4049 19.145 10.2949 19.975 8.99494 19.975C8.20494 19.975 7.42494 19.655 6.87493 19.085C6.55493 18.785 6.31493 18.385 6.17493 17.975C6.30493 17.995 6.43493 18.005 6.57493 18.025C6.80493 18.055 7.04494 18.085 7.28494 18.105C7.85494 18.155 8.43494 18.185 9.01494 18.185C9.58494 18.185 10.1549 18.155 10.7149 18.105C10.9249 18.085 11.1349 18.075 11.3349 18.045C11.4949 18.025 11.6549 18.005 11.8249 17.985Z"
                fill="#1F1625" />
            </svg>

          </v-badge>
        </VBtn>

        <div class="search-wrapper">
          <VTextField class="search-input" variant="plain" density="compact" :label="t('search_here')" hide-details
            single-line>
            <template #prepend-inner>

              <svg class="custom-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.8044 14.8852L13.0545 12.1967L12.9901 12.0986C12.8702 11.9793 12.7064 11.9121 12.5353 11.9121C12.3643 11.9121 12.2004 11.9793 12.0806 12.0986C9.74359 14.2427 6.14252 14.3592 3.6656 12.371C1.18869 10.3827 0.604535 6.90669 2.30055 4.24814C3.99656 1.58958 7.44646 0.573478 10.3623 1.87371C13.2781 3.17394 14.755 6.38703 13.8136 9.38208C13.7458 9.59844 13.8012 9.83374 13.959 9.99933C14.1167 10.1649 14.3529 10.2356 14.5784 10.1849C14.804 10.1341 14.9847 9.96952 15.0525 9.75315C16.1779 6.19892 14.4782 2.37404 11.0529 0.752846C7.62759 -0.868351 3.50467 0.200659 1.35124 3.26833C-0.802184 6.33601 -0.339857 10.4817 2.43914 13.0236C5.21815 15.5655 9.47983 15.7407 12.4673 13.4359L14.9021 15.8164C15.1536 16.0612 15.5601 16.0612 15.8116 15.8164C16.0628 15.5682 16.0628 15.1685 15.8116 14.9202L15.8044 14.8852Z"
                  fill="#1F1625" />
              </svg>


            </template>
          </VTextField>
        </div>
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
  background-color: #FFF;
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
  height: 56px;
  min-width: 56px !important;
  position: relative;
}

.language-select {
  border-radius: 12px !important;
  opacity: 1 !important;
}
</style>

<style lang="scss">
.app-bar {
  .v-field {
    /*     padding-inline: 1em !important;
    padding-block: 0.5em !important; */
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
    content: '';
    appearance: none;
    color: rgb(var(--v-theme-primary)) !important;

    & svg:nth-child(2) {
      display: none
    }
  }
}

.app-bar-breadcrumbs {
  .v-breadcrumbs-divider:last-of-type {
    color: rgb(var(--v-theme-primary)) !important;
  }

  // selecting the last divider
  .v-breadcrumbs-divider:has(+li:last-child) svg {
    color: rgb(var(--v-theme-primary)) !important;
  }

  .v-breadcrumbs-item--disabled {
    color: black !important;
    opacity: 1 !important;
  }
}

.v-breadcrumbs__prepend {
  width: 20px;

  svg {
    width: 20px !important;
  }
}

.v-badge--dot .v-badge__badge {
  top: -100%;
  left: -115%;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  right: unset !important
}

.search-wrapper {
  min-width: 200px;
  background-color: #F8F7FA;
  border-radius: 12px;
  height: 56px;
  display: flex;
  align-items: center;

  .v-input {
    height: 100%;

    .v-field {
      align-items: center;
      padding: 0 16px;

      .v-field__prepend-inner {

        height: 100%;

        align-items: center
      }
    }
  }

  input {
    margin: 0 !important;
    padding: 0 !important;
    margin-right: 10px !important;
    padding-top: 8px !important;
  }
}
</style>
