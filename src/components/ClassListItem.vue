<template>
  <q-card>
    <q-card-section>
      <q-input v-model="name" label="عنوان"></q-input>
      <q-input v-model="date" mask="14##/##/##" label="تاریخ"></q-input>
      <q-input v-model="time" mask="##:##" label="زمان"></q-input>
    </q-card-section>
    <q-card-actions left>
      <q-btn icon="save" color="primary" @click="save">ثبت</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue";
import { api } from "boot/axios";

let name = ref("");
let date = ref("");
let time = ref("");

defineProps({
  classRoom() {
    return { name: "" };
  },
});

computed();
function save() {
  api.post("admin/classrooms/create", {
    name: name.value,
  });
}
</script>
