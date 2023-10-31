import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    isLoggedIn: false,
  }),

  getters: {
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    },
  },
});
