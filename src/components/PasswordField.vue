<template>
  <q-input v-model="password" outlined :type="isPwd ? 'password' : 'text'">
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </q-input>
</template>

<script setup>
import {ref} from "vue";

let isPwd = ref(true);
</script>

