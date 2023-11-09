<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn label="پارکه" icon="fa fa-home" flat :to="{name: 'UserIndex'}" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer class="q-pb-sm" elevated>
      <q-tabs align="justify" class="bg-primary text-white shadow-2" switch-indicator v-model="tabs">
        <q-tab v-for="link in links" :key="link.icon" :icon="link.icon" :label="link.title" :name="link.to"
               @click="go(link.to)"/>
      </q-tabs>
    </q-footer>

    <loading-progress v-show="appStore.isLoading" />
  </q-layout>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import LoadingProgress from "components/LoadingProgress.vue";
import {useAppStore} from "stores/app";

const appStore = useAppStore();

const route = useRoute();
const tabs = ref(route.name);

const router = useRouter()
const links = ref([
  {
    title: 'صفحه اصلی',
    icon: 'fa fa-home',
    to: 'UserIndex'
  },
  {
    title: 'کلاس‌های من',
    icon: 'fa fa-list',
    to: 'UserActiveClasses'
  },
  {
    title: 'تماس با مدیریت',
    icon: 'fa fa-phone',
    to: 'ContactUs'
  },
  {
    title: 'پروفایل',
    icon: 'fa fa-user',
    to: 'UserProfile'
  }
]);

function go(to) {
  router.push({name: to})
}
</script>
