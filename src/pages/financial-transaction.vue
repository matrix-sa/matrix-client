<script setup>
  import { useI18n } from 'vue-i18n'

  import TablesIcon from '@/assets/table.svg'
  import WalletIcon from '@/assets/wallet.svg'
  import MoneyBagIcon from '@/assets/money-bag.svg'
  import PremiumIcon from '@/assets/premium.svg'

  import TablesActiveIcon from '@/assets/table-active.svg'
  import WalletActiveIcon from '@/assets/wallet-active.svg'
  import MoneyBagActiveIcon from '@/assets/money-bag-active.svg'
  import PremiumActiveIcon from '@/assets/premium-active.svg'

  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()

  // Used
  const activeBtnProps = ref({
    color: 'warning',
    flat: true,
  })

  // Used
  const inActiveBtnProps = ref({
    color: 'surface-variant',
    flat: true,
    variant: 'outlined',
  })

  // Used
  const loading = computed(() => false)

  const isTableTab = computed(() =>
    route.name.toLowerCase().includes('operations-table')
  )

  const isActiveSubscribtionsTab = computed(() =>
    route.name.toLowerCase().includes('active-subscribtions')
  )

  const isActiveServiceStockTab = computed(() =>
    route.name.toLowerCase().includes('services-stock')
  )

  const isActiveWalletTab = computed(() =>
    route.name.toLowerCase().includes('wallet')
  )

  const usedTableIcon = computed(() =>
    isTableTab.value ? TablesActiveIcon : TablesIcon
  )

  const usedActiveSubscribtionsIcon = computed(() =>
    isActiveSubscribtionsTab.value
      ? PremiumActiveIcon
      : PremiumIcon
  )

  const usedServicesStockIcon = computed(() =>
    isActiveServiceStockTab.value
      ? MoneyBagActiveIcon
      : MoneyBagIcon
  )

  const usedWalletIcon = computed(() =>
    isActiveWalletTab.value
      ? WalletActiveIcon
      : WalletIcon
  )

  watch(
    () => route.name,
    current => {
      if (current == '/financial-transaction') {
        router.push({ name: '/financial-transaction/operations-table/' })
      }
    },
    { immediate: true }
  )
</script>

<template>
  <div>
    <v-overlay v-model="loading" class="align-center justify-center" persistent>
      <v-progress-circular color="primary" indeterminate size="50" :width="7" />
    </v-overlay>
    <div>
      <div class="buttons-container">
        <v-btn
          v-bind="isTableTab ? activeBtnProps : inActiveBtnProps"
          height="40px"
          rounded
          :to="{ name: '/financial-transaction/operations-table/' }"
        >
          {{ t("operations_table") }}
          <template #prepend>
            <v-icon>
              <img alt="Custom Icon" :src="usedTableIcon">
            </v-icon>
          </template>
        </v-btn>
        <v-btn
          v-bind="isActiveSubscribtionsTab ? activeBtnProps : inActiveBtnProps"
          height="40px"
          rounded
          :to="{ name: '/financial-transaction/active-subscribtions/' }"
        >
          {{ t("active_subscriptions") }}
          <template #prepend>
            <v-icon>
              <img :src="usedActiveSubscribtionsIcon">
            </v-icon>
          </template>
        </v-btn>

        <v-btn
          v-bind="isActiveServiceStockTab ? activeBtnProps : inActiveBtnProps"
          height="40px"
          rounded
          :to="{ name: '/financial-transaction/services-stock/' }"
        >
          {{ t("services_balance") }}
          <template #prepend>
            <v-icon>
              <img :src="usedServicesStockIcon">
            </v-icon>
          </template>
        </v-btn>

        <v-btn
          v-bind="isActiveWalletTab ? activeBtnProps : inActiveBtnProps"
          height="40px"
          rounded
          :to="{ name: '/financial-transaction/wallet/' }"
        >
          {{ t("wallet") }}
          <template #prepend>
            <v-icon>
              <img :src="usedWalletIcon">
            </v-icon>
          </template>
        </v-btn>

      </div>

      <div>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.link-ad-title {
  font-weight: 400;
}

.buttons-container {
  display: grid;
  grid-template-columns: repeat(4, auto) 1fr;
  justify-content: start;
  gap: 12px;
  margin-top: 20px;

  button {
    font-weight: 500;
    font-family: "Tajawal";
  }

  button:last-child {
    background-color: red;
  }

  .store-btn {
    justify-self: end;
  }
}

.margin-start-auto {
  margin-inline-start: auto;
}

.instructions {
  background-color: rgb(var(--v-theme-background));
  font-size: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-block: 1rem;
}
</style>
<style>
/* TODO Doha: Remove animation if you want */
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(2em);
  opacity: 0;
}

/* for rules cards */
.rules-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  gap: 20px;

  .rule-card {
    background-color: rgb(var(--v-theme-background));
    border-radius: 1rem;
    padding: 1rem;

    .v-chip {
      justify-content: center;
      width: 4rem;
      border-radius: 0.25rem;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 8px;

      .order {
        width: 20px;
        height: 20px;
        background-color: rgb(var(--v-theme-warning));
        color: white;
        text-align: center;
        clip-path: circle(50%);
        line-height: 20px;
      }

      .check-icon {
        margin-inline-start: auto;
      }
    }

    .divider {
      margin-block: 0.5rem;
    }

    .data-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-block-end: 0.75rem;

      .rule-btn {
        width: 45%;
        border-radius: 12px;
      }
    }
  }
}
</style>
