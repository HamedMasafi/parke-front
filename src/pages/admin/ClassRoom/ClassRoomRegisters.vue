<template>
  <q-page padding>
    <p v-for="user in people" :key="user.id">
      {{user}}
    </p>

    <q-dialog v-model="addNewDialog">
      <q-card>
        <q-card-section>
        Hi
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-page-sticky :offset="[18, 18]" position="bottom-right">
      <q-btn @click="addNewDialog = true" color="accent" fab icon="add"/>
    </q-page-sticky>
  </q-page>
</template>

<script setup>

import {useRoute} from "vue-router";
import {api} from "boot/axios";
import {ref} from "vue";

const route = useRoute()

var classRoomId = route.params.id;
var people = ref([])
var addNewDialog = ref(false)

if (classRoomId !== undefined) {
  api
    .get("ClassRooms/Registers/" + classRoomId)
    .then(response => {
      people.value = response.data.data
    });
}
</script>


<style scoped>

</style>
