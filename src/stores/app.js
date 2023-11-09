import {defineStore} from "pinia";
import {ref} from "vue";
import {Role} from "boot/role";

export const useAppStore = defineStore("app", {
  state: () => ({
    isLoading: false
  })
});
