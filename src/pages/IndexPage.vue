<template>
  <q-page>
    <p>Parke</p>


    <p>
      به پارکه خوش آمدید. سایت در دست ساخت می‌باشد
    </p>

    <router-link :to="{name: 'AdminClassRoomList'}">لیست</router-link>
    <div v-if="!appStore.isLoggedIn">
      ثبت نام در سایت
    </div>
  </q-page>
</template>

<script setup>
import {useAppStore} from "stores/app";

const appStore = useAppStore()

</script>
