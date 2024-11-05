<script setup>
  import { useI18n } from 'vue-i18n'
  import controlRulesIcon from '@/assets/control_rule_icon.svg'
  import controlRulesIconInActive from '@/assets/control_rule_icon_inactive.svg'
  import communicationRulesIcon from '@/assets/communication_rule_icon.svg'
  import communicationRulesIconInActive from '@/assets/communication_rule_icon_inactive.svg'

  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()

  const openControlRuleDialog = ref(false)
  const openCommunicationRuleDialog = ref(false)

  const activeBtnProps = ref({
    color: 'warning',
    flat: true,
  })

  const inActiveBtnProps = ref({
    color: 'surface-variant',
    flat: true,
    variant: 'outlined',
  })

  const loading = computed(() => false)
  const isCampaignsRulesTab = computed(() =>
    route.name.toLowerCase().includes('campaigns')
  )
  const usedControlIcon = computed(() =>
    isCampaignsRulesTab.value ? controlRulesIcon : controlRulesIconInActive
  )
  const usedCoomunicationIcon = computed(() =>
    isCampaignsRulesTab.value
      ? communicationRulesIconInActive
      : communicationRulesIcon
  )
  const addButtonText = computed(() =>
    isCampaignsRulesTab.value
      ? t('add_control_rule')
      : t('add_communication_rule')
  )
  const instructionsText = computed(() =>
    isCampaignsRulesTab.value
      ? t('control_rules_instructions')
      : t('communication_rules_instructions')
  )

  const addButtonClickHandler = computed(() =>
    isCampaignsRulesTab.value
      ? () => (openControlRuleDialog.value = true)
      : () => (openCommunicationRuleDialog.value = true)
  )

  router.push({ name: '/rules/campaigns/' })
</script>

<template>
  <div>
    <v-overlay v-model="loading" class="align-center justify-center" persistent>
      <v-progress-circular color="primary" indeterminate size="50" :width="7" />
    </v-overlay>
    <div class="main">
      <div class="buttons-container">
        <v-btn
          v-bind="isCampaignsRulesTab ? activeBtnProps : inActiveBtnProps"
          height="40px"
          rounded
          :to="{ name: '/rules/campaigns/' }"
        >
          {{ t("control_rules") }}
          <template #prepend>
            <v-icon>
              <img alt="Custom Icon" :src="usedControlIcon">
            </v-icon>
          </template>
        </v-btn>
        <v-btn
          v-bind="isCampaignsRulesTab ? inActiveBtnProps : activeBtnProps"
          height="40px"
          rounded
          :to="{ name: '/rules/communication/' }"
        >
          {{ t("communication_rules") }}
          <template #prepend>
            <v-icon>
              <img :src="usedCoomunicationIcon">
            </v-icon>
          </template>
        </v-btn>

        <v-btn
          v-bind="activeBtnProps"
          class="margin-start-auto"
          height="40px"
          prepend-icon="gridicons:add"
          rounded
          :text="addButtonText"
          @click="addButtonClickHandler"
        />
      </div>

      <p class="instructions">{{ instructionsText }}</p>

      <div>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>

    <v-dialog v-model="openCommunicationRuleDialog" max-width="500">
      <ConnectionRuleModal v-model:is-dialog-visible="openCommunicationRuleDialog" />
    </v-dialog>

    <v-dialog v-model="openControlRuleDialog" max-width="500">
      <CampaignRuleModal v-model:is-dialog-visible="openControlRuleDialog" />
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.main {
  padding: 20px;
  background-color: white;
  border-radius: 1rem;
}

.link-ad-title {
  font-weight: 400;
}

.buttons-container {
  display: grid;
  grid-template-columns: repeat(2, auto) 1fr;
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
