<template>
  <q-page padding>

    <alert-box v-show="people.length === 0"
               color="yellow"
               text="تا کنون کسی برای این کلاس ثبت‌نام نکرده است"></alert-box>


    <q-input v-show="people.length !== 0" v-model="searchText" dense outlined/>

    <div class="row items-stretch q-gutter-lg">
      <div v-for="register in people" :key="register.id" class="col-2">
        <template v-if="filter(register.user)">
          <q-card>
            <q-card-section>
              <p class="text-center">
                <q-icon name="fa fa-user" size="xl"></q-icon>
              </p>
              <p class="text-h5">
                {{ register.user.firstName }} {{ register.user.lastName }}
              </p>
              <p dir="rtl">
                شماره موبایل:
                {{ register.user.phoneNumber }}
              </p>
            </q-card-section>
            <q-card-actions>

            </q-card-actions>
          </q-card>
        </template>
      </div>
    </div>

    <search-user v-model="addNewDialog" @selected="userSelected"/>

    <q-page-sticky :offset="[18, 18]" position="bottom-right">
      <q-btn color="accent" fab icon="add" @click="addNewDialog = true"/>
    </q-page-sticky>
  </q-page>
</template>

<script setup>

import {useRoute} from "vue-router";
import {api} from "boot/axios";
import {ref} from "vue";
import SearchUser from "components/dialogs/SearchUser.vue";
import AlertBox from "components/AlertBox.vue";
import {useQuasar} from "quasar";

const route = useRoute()

var classRoomId = route.params.id;
var people = ref([])
var addNewDialog = ref(false)
let searchUserName = ref('')
const searchText = ref('')

const $q = useQuasar();

if (classRoomId !== undefined) {
  api
    .get("admin/ClassRooms/Registers/" + classRoomId)
    .then(response => {
      people.value = response.data.data
    });
}

function filter(user) {
  if (searchText.value === '')
    return true;

  return user.firstName.indexOf(searchText.value) !== -1 || user.lastName.indexOf(searchText.value) !== -1
}

function userSelected(user) {
  // alert(JSON.stringify(user))
  const data = {
    classRoomId: classRoomId,
    userId: user.id
  }
  api.post("admin/ClassRooms/Register", data)
    .then(response => {
      if (response.data.success) {
        addNewDialog.value = false
        people.value.push({
          id: response.data.data,
          user: user
        })
      } else {
        $q.notify(response.data.message);
      }
    })
}

</script>


<style scoped>

</style>
