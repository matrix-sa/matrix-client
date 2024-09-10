import i18n from '@/i18n'

const { t } = i18n.global

// 👉 Required Validator
export const requiredValidator = value => {
  return !!value || t('validation.required')
}
