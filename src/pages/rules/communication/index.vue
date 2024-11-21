<script setup>
  import { computed, ref, watch } from 'vue'
  import { useRequest } from 'vue-request'
  import CommunicationRuleService from '@/services/connection-rule-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import mailIcon from '@/assets/mail.svg'
  import whatsappIcon from '@/assets/whatsapp.svg'
  import smsIcon from '@/assets/sms.svg'
  import { useRulesModalsStore } from '@/stores/rulesModalsStore'

  const { show } = useSnackbarStore()
  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()
  const rulesModalsStore = useRulesModalsStore()

  const openCommunicationRuleDialog = ref(false)
  const openDeleteDialog = ref(false)
  const openStatusChangeDialog = ref(false)
  const ruleToEdit = ref(null)
  const ruleToDelete = ref(null)
  const ruleToChangeStatus = ref(null)
  const rules = ref([])

  const { run: fetchRules, loading: loadingRules } = useRequest(
    CommunicationRuleService.getAll,
    {
      onSuccess: response => {
        const { data, error, messages } = response.data
        if (error) {
          show(messages, 'error')
          return
        }
        rules.value = data
      },
    }
  )

  const { run: changeStatus, loading: loadingChangeStatus } = useRequest(
    CommunicationRuleService.changeStatus,
    {
      manual: true,
      onSuccess: response => {
        const { error, messages } = response.data
        if (error) {
          show(messages[0], 'error')
          return
        }
        show(t('status_changed_successfully'), 'success')
        fetchRules()
      },
    }
  )

  const { run: deleteRule, loading: loadingDeleteRule } = useRequest(
    CommunicationRuleService.deleteRule,
    {
      manual: true,
      onSuccess: response => {
        const { error, messages } = response.data
        if (error) {
          show(messages[0], 'error')
          return
        }
        show(t('rule_deleted_successfully'), 'success')
        fetchRules()
      },
    }
  )

  const loading = computed(() => loadingRules.value || loadingChangeStatus.value || loadingDeleteRule.value)

  const handleEditRule = rule => {
    openCommunicationRuleDialog.value = true
    ruleToEdit.value = rule
  }

  const handleStatusChange = rule => {
    ruleToChangeStatus.value = rule
    openStatusChangeDialog.value = true
  }

  const handleDeleteRule = rule => {
    ruleToDelete.value = rule
    openDeleteDialog.value = true
  }

  const deleteConfirmed = confirmed => {
    if (!confirmed) return
    deleteRule({ id: ruleToDelete.value.id })
    openDeleteDialog.value = false
  }

  const statusChangeConfirmed = confirmed => {
    if (!confirmed) return
    changeStatus({
      id: ruleToChangeStatus.value.id,
      status: ruleToChangeStatus.value.status === 'Active' ? 'Inactive' : 'Active',
    })
    openStatusChangeDialog.value = false
  }

  rulesModalsStore.$onAction(
    ({
      name,
    }) => {
      if (name !== 'modalSaved') return
      fetchRules()
    }
  )

  watch(
    locale,
    () => {
      update([
        {
          title: t('campaign_rules'),
          active: false,
          to: '/rules',
        },
        {
          title: t('communication_rules'),
          active: true,
          disabled: true,
          to: '/rules/communication/',
        },
      ])
    },
    { immediate: true }
  )
</script>

<template>
  <div class="rules-container">
    <v-overlay v-model="loading" class="align-center justify-center" persistent>
      <v-progress-circular color="primary" indeterminate size="50" :width="7" />
    </v-overlay>
    <div v-if="rules.length === 0 && !loading" class="no-rules">
      <EmptyContent :title="t('no_rules_found')" />
    </div>
    <div v-for="(rule, index) in rules" v-else :key="rule.id" class="rule-card">
      <div class="row">
        <p class="order">{{ index + 1 }}</p>
        <p>{{ rule.name }}</p>
        <v-tooltip :text="t('delete')">
          <template #activator="{ props: toolTipProps }">
            <v-btn
              class="check-icon"
              v-bind="toolTipProps"
              @click="handleDeleteRule(rule)"
            >
              <v-icon class="delete-icon" color="error" icon="tabler-x" />
            </v-btn>
          </template>
        </v-tooltip>
      </div>
      <v-divider class="divider" />
      <div class="data-row">
        <p>
          {{ t("in_case_indicator") }}
          <span class="text-primary">{{ rule.indicator }}</span>
        </p>
        <v-chip class="font-weight-bold" color="primary" label>
          {{ t(`communication_rule_card_${rule.comparison_type}`) }}
        </v-chip>
      </div>
      <div class="data-row">
        <p>{{ t("communication_rule_card_value") }}</p>
        <v-chip class="font-weight-bold" color="primary" label>
          {{ rule.target_value }}
        </v-chip>
      </div>
      <div class="data-row">
        <p>{{ t("in_last") }}</p>
        <v-chip class="font-weight-bold" color="primary" label>
          {{ rule.days_ago }}
        </v-chip>
      </div>
      <div class="data-row">
        <p>{{ t("notify_me_on") }}</p>
        <div class="channels-icons-container">
          <img v-if="rule.channels.includes('Email')" :src="mailIcon">
          <img v-if="rule.channels.includes('SMS')" :src="smsIcon">
          <img v-if="rule.channels.includes('WhatsApp')" :src="whatsappIcon">
        </div>
      </div>
      <div class="data-row">
        <v-btn
          class="rule-btn"
          color="primary"
          flat
          :text="t('edit')"
          @click="handleEditRule(rule)"
        />
        <v-btn
          class="rule-btn"
          :color="rule.status === 'Active' ? 'error' : 'warning'"
          flat
          :text="rule.status === 'Active' ? t('deactivate') : t('activate')"
          @click="handleStatusChange(rule)"
        />
      </div>
    </div>

    <v-dialog v-model="openCommunicationRuleDialog" max-width="500">
      <ConnectionRuleModal
        v-model:is-dialog-visible="openCommunicationRuleDialog"
        :rule="ruleToEdit"
        @saved="fetchRules"
      />
    </v-dialog>
    <!-- Delete Dialog -->
    <ConfirmDialog
      v-model:is-dialog-visible="openDeleteDialog"
      :confirmation-question="t('dialog_question')"
      @confirm="deleteConfirmed"
    />

    <!-- Status Change Dialog -->
    <ConfirmDialog
      v-model:is-dialog-visible="openStatusChangeDialog"
      :confirmation-question="t('dialog_question')"
      @confirm="statusChangeConfirmed"
    />
  </div>
</template>

<style lang="scss" scoped>
.channels-icons-container {
  display: flex;
  gap: 0.5rem;
  img {
    width: 24px;
  }
}
.v-btn--variant-elevated {
background-color: transparent;
box-shadow: none;
}
.no-rules {
  grid-column: 2;
  margin-top: 20px;
}
</style>
