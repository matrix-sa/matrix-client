<script setup>
import { useRequest } from 'vue-request'
import CampaignsRulesService from '@/services/campaign-rule-service'
import { useSnackbarStore } from '@/stores/useSnackBarStore'
import { useI18n } from 'vue-i18n'
import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'

const { show } = useSnackbarStore()
const { t, locale } = useI18n()
const { update } = useBreadcrumbsStore()
const { user } = storeToRefs(useAuthStore())

const openControlRuleDialog = ref(false)
const ruleToEdit = ref(null)
const rules = ref([])
const { run: fetchRules, loading: loadingRules } = useRequest(
  CampaignsRulesService.getAll,
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
  CampaignsRulesService.changeStatus,
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

const loading = computed(() => loadingRules.value || loadingChangeStatus.value)

const handleEditRule = rule => {
  openControlRuleDialog.value = true
  ruleToEdit.value = rule
}

const handleStatusChange = rule => {
  changeStatus({
    id: rule.id,
    status: rule.status === 'Active' ? 'Inactive' : 'Active',
  })
}

watch(
  locale,
  () => {
    update([
      {
        title: t('campaign_rules'),
        active: false,
        to: '/rules/',
      },
      {
        title: t('control_rules'),
        active: true,
        disabled: true,
        to: '/rules/campaigns/',
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
    <div v-for="(rule, index) in rules" :key="rule.id" class="rule-card">
      <div class="row">
        <p class="order">{{ index + 1 }}</p>
        <p>
          {{ t("rule") }}
        </p>
        <v-icon class="check-icon" :color="rule.status === 'Active' ? 'primary' : 'surface-variant'"
          icon="fluent:checkbox-checked-20-filled" />
      </div>
      <v-divider class="divider" />
      <div class="data-row">
        <p>{{ t("roas_condition") }}</p>
        <v-chip class="font-weight-bold" color="primary" label>
          {{ t(rule.roas_condition) }}
        </v-chip>
      </div>
      <div class="data-row">
        <p>{{ t("roas_rules") }}</p>
        <v-chip class="font-weight-bold" color="primary" label>
          {{ rule.roas_comparing_value }}
        </v-chip>
      </div>
      <div class="data-row">
        <p>{{ t("rule_increase_by") }}</p>
        <v-chip class="font-weight-bold" color="primary" label>
          {{ rule.increment_value }}
          {{ rule.increment_type === "Percentage" ? "%" : t(user.currency) }}
        </v-chip>
      </div>
      <div class="data-row">
        <v-btn class="rule-btn" color="primary" flat :text="t('edit')" @click="handleEditRule(rule)" />
        <v-btn class="rule-btn" :color="rule.status === 'Active' ? 'error' : 'warning'" flat
          :text="rule.status === 'Active' ? t('deactivate') : t('activate')" @click="handleStatusChange(rule)" />
      </div>
    </div>

    <v-dialog v-model="openControlRuleDialog" max-width="500">
      <CampaignRuleModal v-model:is-dialog-visible="openControlRuleDialog" :rule="ruleToEdit" />
    </v-dialog>
  </div>
</template>

<style lang="scss"></style>
