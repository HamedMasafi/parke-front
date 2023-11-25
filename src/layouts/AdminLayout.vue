<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn label="پارکه" icon="fa fa-home" flat :to="{name: 'AdminIndex'}" />
        </q-toolbar-title>

        <q-btn icon="fa fa-ellipsis-v" flat round>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>خروج</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <loading-progress v-show="appStore.isLoading" />
  </q-layout>
</template>

<script setup>

import {useAppStore} from "stores/app";
import LoadingProgress from "components/LoadingProgress.vue";
import {useAuthStore} from "stores/auth";
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";

const appStore = useAppStore();
const authStore = useAuthStore();
const $q = useQuasar()
const router = useRouter();

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
