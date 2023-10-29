<template>
  <q-page padding>
    <!-- content -->
    <p>Parke</p>

    <class-room-row v-for="cls in classRooms" :key="cls.name" :class-room="cls" class="q-mt-sm"></class-room-row>
    <q-dialog v-model="showNewDialog">
      <class-list-item>
      </class-list-item>
    </q-dialog>

    <q-page-sticky :offset="[18, 18]" position="bottom-right">
      <q-btn color="accent" fab icon="add" @click="showNewDialog = true"/>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import ClassListItem from "components/ClassListItem.vue";
import {ref} from "vue";
import {api} from "boot/axios";
import ClassRoomRow from "components/ClassRoomRow.vue";

let classRooms = ref([])
let showNewDialog = ref(false)

api
  .get("classrooms/list")
  .then(response => {
    classRooms.value = response.data.data
  })
</script>
