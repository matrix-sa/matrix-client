import { createI18n } from 'vue-i18n'

import en from '@/i18n/locale/en'
import ar from '@/i18n/locale/ar'
import { ar as $var, en as $ven } from 'vuetify/locale'

export default createI18n({
  legacy: false,
  locale: 'ar',
  fallback: 'ar',
  messages: {
    ar: { ...ar, $vuetify: { ...$var } },
    en: { ...en, $vuetify: { ...$ven } },
  },
})
