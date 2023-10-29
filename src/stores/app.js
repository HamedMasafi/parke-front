import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoggedIn: false
  }),

  getters: {
    isLoggedIn (state) {
      return state.isLoggedIn
    }
  },
})
