<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <router-link :to="{ name: 'Home' }"> پارکه </router-link>
        </q-toolbar-title>

        <div v-if="appStore.isLoggedIn">

        </div>
        <div v-else>
          <q-btn :to="{ name: 'Login' }" dense flat icon="login">ورود</q-btn>
          <q-btn :to="{name: 'AdminUsersList'}" dense flat icon="people">کاربران</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAppStore } from "stores/app";

const appStore = useAppStore();
</script>
