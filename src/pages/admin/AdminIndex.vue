<template>
  <q-page padding>

    <alert-box color="green">
      <q-icon name="fa fa-check"></q-icon>

      ادمین عزیز به پنل پارکه خوش آمدید.
      بخش‌های مختلف مدیریتی از این صفحه قابل دسترسی هستند.
    </alert-box>
    <q-banner :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'" class="q-my-md" >
      <template v-slot:avatar>
        <q-icon name="fa fa-list" color="primary" />
      </template>
      در این بخش می‌توانید کلاس‌ها را مدیرت کنید.
      <template v-slot:action>
        <q-btn flat color="primary" label="ورود" :to="{name: 'AdminClassRoomList'}" />
      </template>
    </q-banner>

    <q-banner :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'" class="q-my-md" >
      <template v-slot:avatar>
        <q-icon name="fa fa-users" color="primary" />
      </template>
      در این بخش می‌توانید کاربران را مدیریت کنید و کاربر جدیدی تعریف کنید
      <template v-slot:action>
        <q-btn flat color="primary" label="ورود" :to="{name: 'AdminUsersList'}" />
      </template>
    </q-banner>

  </q-page>
</template>

<script setup>
import AlertBox from "components/AlertBox.vue";

</script>

