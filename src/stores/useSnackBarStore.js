import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar-store', {
  state: () => ({ isShown: false, message: '', type: 'info' }),
  actions: {
    show (message, type = 'info') {
      this.isShown = true
      this.message = message
      this.type = type
    },
    hide () {
      this.isShown = false
    },
  },
})
