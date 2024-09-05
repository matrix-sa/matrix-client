/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Icons
import icons from '@/plugins/icons'

// i18n locale
import en from '@/i18n/locale/en'
import ar from '@/i18n/locale/ar'

// theme
import matrixTheme from '@/plugins/theme'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'matrixTheme',
    themes: {
      matrixTheme,
    },
  },
  locale: {
    locale: 'ar',
    fallback: 'ar',
    messages: { ar, en },
  },
  icons,
})
