import { defineStore } from 'pinia'
import {Role} from "boot/role";
import {api} from "boot/axios";
import {jwtDecode} from "jwt-decode";

export const useAuthStore = defineStore('auth', {
  persist: true,

  state: () => ({
    isLoggedIn: false,
    token: '',
    role: Role.None,
    userInfo: {}
  }),

  actions: {
    login (username, password) {
      api
        .post("user/auth/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          if (response.data.success === true) {
            this.isLoggedIn = true;
            this.token = response.data.data
            try {
              let jwt = jwtDecode(response.data.data)
              this.role = jwt.role
              console.log(jwt)
            } catch (ex) {
              console.log(ex)
            }


            route.push({name: 'Home'})
          } else {
            // $q.notify({
            //   message: response.data.message,
            //   color: 'purple'
            // })
            $q.notify(response.data.message);
          }
        })
        .catch((reason) => {
          isLoading.value = false;
        });
    }
  }
})
