<template>
  <q-page padding>

    <div class="row items-stretch q-gutter-lg">
      <div v-for="cls in classRooms" :key="cls.name" class="col-2">
        <q-card>
          <q-card-section>
            <p class="text-h5">
              {{ cls.name }}
            </p>
            <p>
              وضعیت:
              <span class="text-green">فعال</span>
            </p>
          </q-card-section>
          <q-card-actions>
            <q-btn :to="{name: 'AdminClassRegisters', params: {id: cls.id}}" flat icon="people" round></q-btn>
            <q-btn :to="{name: 'AdminClassEdit', params: {id: cls.id}}" flat icon="edit" round></q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

<!--    <class-room-row-->
<!--      v-for="cls in classRooms"-->
<!--      :key="cls.name"-->
<!--      :class-room="cls"-->
<!--      class="q-mt-sm"-->
<!--    ></class-room-row>-->

    <q-dialog v-model="showNewDialog">
      <class-list-item></class-list-item>
    </q-dialog>

    <q-page-sticky :offset="[18, 18]" position="bottom-right">
      <q-btn :to="{name: 'AdminClassCreate'}" color="accent" fab icon="add"/>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import ClassListItem from "components/ClassListItem.vue";
import {ref} from "vue";
import {api} from "boot/axios";
import ClassRoomRow from "components/ClassRoomRow.vue";

let classRooms = ref([]);
let showNewDialog = ref(false);

function add() {
}

api.get("classrooms/list").then((response) => {
  classRooms.value = response.data.data;
});
</script>
