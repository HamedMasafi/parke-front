<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header elevated>
      <q-toolbar>


        <q-toolbar-title>
          پارکه
        </q-toolbar-title>

        <div v-if="appStore.isLoggedIn">
        </div>
        <div v-else>

          <q-btn dense flat icon="login" :to="{name: 'Login'}">ورود</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>

import {useAppStore} from "stores/app";
const appStore = useAppStore()

</script>
