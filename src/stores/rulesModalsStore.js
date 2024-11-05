import { defineStore } from 'pinia'

export const useRulesModalsStore = defineStore('rules-modals-store', {
  state: () => ({ modalData: {} }),
  actions: {
    modalSaved (data) {
      this.modalData = data
    },
  },
})
