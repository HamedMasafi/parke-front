<template>
  <div
    class="fullscreen bg-blue text-center q-pa-md flex flex-center"
    :class="isLoading"
  >
    <q-page class="flex flex-center" padding>
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
              <q-input v-model="username" label="شماره تلفن"></q-input>
              <q-input v-model="password" label="کلمه عبور"></q-input>
            </div>
          </transition>
        </q-card-section>
        <q-card-actions class="text-center flex-center">
          <q-btn color="primary" icon="login" label="ورود" @click="login" />
        </q-card-actions>
        <q-card-actions>
          <router-link :to="{ name: 'Home' }">بازگشت به خانه</router-link>
        </q-card-actions>
        <q-inner-loading
          :showing="isLoading"
          label="در حال ورود..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
      </q-card>
    </q-page>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const $q = useQuasar();

let username = ref("");
let password = ref("");
let isLoading = ref(false);

function login() {
  isLoading.value = true;
  api
    .post("user/login", {
      username: username.value,
      password: password.value,
    })
    .then((response) => {
      isLoading.value = false;

      if (response.data.success === true) {
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
