import { defineStore } from 'pinia'

export const useConsultationsStore = defineStore('consultations', {
  state: () => ({
    consultationToAnswer: {},
  }),
  actions: {
    setConsultationToAnswer (consultation) {
      this.consultationToAnswer = consultation
    },
  },
})
