<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header elevated>
      <q-toolbar>


        <q-toolbar-title>
          پارکه
        </q-toolbar-title>

        <div v-if="!appStore.isLoggedIn">


          <q-btn dense flat round icon="fa-user" @click="toggleLeftDrawer" />
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
