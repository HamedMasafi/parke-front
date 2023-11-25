<template>
  <div
    :class="isLoading"
    class="fullscreen bg-blue text-center q-pa-md flex flex-center"
  >
    <div class="flex flex-center">
      <q-card>
        <q-card-section>
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <div>
              <div class="text-blue-14">
                <span> ورود به سایت </span>
              </div>
              <q-input v-model="username" label="شماره تلفن" outlined></q-input>
              <password-field v-model="password" class="q-mt-sm" label="کلمه عبور"/>
            </div>
          </transition>
        </q-card-section>
        <q-card-actions class="text-center flex-center">
          <q-btn color="primary" icon="login" label="ورود" @click="login"/>
        </q-card-actions>
        <q-inner-loading
          :showing="isLoading"
          label="در حال ورود..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
      </q-card>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {api} from "boot/axios";
import {useQuasar} from "quasar";
import {useAppStore} from "stores/app";
import {useRouter} from "vue-router";
import PasswordField from "components/PasswordField.vue";
import {jwtDecode} from "jwt-decode";
import {useAuthStore} from "stores/auth";
import {Role} from "boot/role";

const $q = useQuasar();
const appStore = useAppStore();
const authStore = useAuthStore()
const router = useRouter()

let username = ref("");
let password = ref("");
let isLoading = ref(false);

function login() {
  isLoading.value = true;
  api
    .post("user/auth/login", {
      username: username.value,
      password: password.value,
    })
    .then((response) => {
      isLoading.value = false;

      if (response.data.success === true) {
        appStore.isLoggedIn = true;
        authStore.isLoggedIn = true;

        appStore.token = response.data.data

        authStore.token = response.data.data
        try {
          let jwt = jwtDecode(response.data.data)
          appStore.role = jwt.role
          authStore.role = jwt.role
          authStore.userInfo = {
            firstName: jwt.firstName,
            lastName: jwt.lastName
          };
          console.log(jwt)
        } catch (ex) {
          console.log(ex)
        }

        if (authStore.role === Role.User)
          router.push({name: 'UserIndex'})
        else if (authStore.role === Role.Admin || authStore.role === Role.Manager)
          router.push({name: 'AdminIndex'})
        else
          console.log("User role not found", authStore.role)

        //router.push({name: 'UserIndex'})

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
</script>

<style scoped></style>
