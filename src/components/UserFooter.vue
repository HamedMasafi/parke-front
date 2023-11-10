<template>
  <q-footer class="q-pb-sm" elevated
  >
    <q-tabs align="justify" switch-indicator class="bg-primary text-white shadow-2">
      <q-tab v-for="link in links" :key="link.icon" :icon="link.icon" :label="link.title" :name="link.icon" @click="go(link.to)"/>
    </q-tabs>
  </q-footer>
</template>

<script setup>

import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter()
const links = ref([
  {
    title: 'صفحه اصلی',
    icon: 'fa fa-home',
    to: 'UserActiveClasses'
  },
  {
    title: 'کلاس‌های من',
    icon: 'fa fa-list',
    to: 'UserActiveClasses'
  },
  {
    title: 'پروفایل',
    icon: 'fa fa-user',
    to: ''
  }
]);

function go(to) {
  router.push({name: to})
}
</script>
