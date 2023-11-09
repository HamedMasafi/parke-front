<template>
  <q-page padding>

    <div class="text-center q-py-lg">
      <q-avatar color="orange" size="100px">
        {{ authStore.userInfo.firstName[0] }}
      </q-avatar>

      <h5>
        {{ authStore.userInfo.firstName }} {{ authStore.userInfo.lastName}}
      </h5>
    </div>
    <q-list bordered separator>

      <template v-for="link in links" :key="link.title">
        <q-item v-ripple clickable :to="{name: link.to}">
          <q-item-section avatar>
            <q-icon color="primary" :name="link.icon"/>
          </q-item-section>

          <q-item-section>{{link.title}}</q-item-section>
        </q-item>
      </template>

      <q-item v-ripple clickable @click="logout">
        <q-item-section avatar>
          <q-icon color="primary" name="fa fa-door-open"/>
        </q-item-section>

        <q-item-section>خروج</q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script setup>
import {ref} from "vue";
import { useQuasar } from 'quasar'
import {useAuthStore} from "stores/auth";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const $q = useQuasar()
const router = useRouter();

const links = ref([
  {
    title: 'ویرایش پروفایل',
    icon: 'fa fa-user',
    to: 'UserProfileEdit'
  },
  {
    title: 'تغییر کلمه عبور',
    icon: 'fa fa-key',
    to: 'UserChangePassword'
  },
])

function logout() {
  $q.dialog({
    title: 'خروج',
    message: 'آیا اطمینان به خروج از سایت دارید؟',
    cancel: true,
    persistent: false
  }).onOk(() => {
    authStore.isLoggedIn = false
    authStore.token = ''
    router.push({name: 'Login'})
  });
}
</script>
