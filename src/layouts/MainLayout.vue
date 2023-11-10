<template>
  <q-layout  view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-white">
          <router-link :to="{ name: 'UserIndex' }"> پارکه </router-link>
        </q-toolbar-title>

        <div v-if="authStore.isLoggedIn">
          <q-btn icon="fa fa-user" flat>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section>خروج</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div v-else>
          <q-btn :to="{ name: 'Login' }" dense flat icon="login">ورود</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
        <router-view />

<!--      <router-view v-slot="{ Component }">-->
<!--        <transition name="fade" duration="300">-->
<!--          <component :is="Component" />-->
<!--        </transition>-->
<!--      </router-view>-->

    </q-page-container>

    <UserFooter/>
  </q-layout>
</template>

<script setup>
import '../animations/fade.scss';
import {ref} from "vue";
import UserFooter from "components/UserFooter.vue";
import {useAuthStore} from "stores/auth";

let leftDrawerOpen = ref(true)

const authStore = useAuthStore()
function logout() {
  authStore.isLoggedIn = false
  authStore.token = ''
}
function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
