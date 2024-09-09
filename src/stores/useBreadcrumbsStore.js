import { defineStore } from 'pinia'

export const useBreadcrumbsStore = defineStore('breadcrumbs-store', {
  state: () => ({ items: [] }),
  actions: {
    update (items) {
      this.items = items
    },
  },
})
