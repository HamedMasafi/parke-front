<template>
  <q-page padding>

    <register-new-user-dialog v-model="newUserDialog" v-model:user="userToRegister" @save="registerNewUser"></register-new-user-dialog>
    <edit-user-dialog v-model="editUserDialogModel" v-model:user="userToEdit" @save="saveUpdate"></edit-user-dialog>

    <q-markup-table separator="cell">
      <thead>
      <tr>
        <th>#</th>
        <th>نام</th>
        <th>شماره موبایل</th>
        <th>کد ملی</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in users" :key="user.id">
        <td>
          {{ index + 1 }}
        </td>
        <td>
          {{ user.firstName }} {{ user.lastName }}
        </td>
        <td>
          {{ user.phoneNumber }}
        </td>
        <td>
          {{ user.nationalCode }}
        </td>
        <td class="option-buttons">
<!--          <q-btn flat icon="key" round @click="setUserPermission(user)"></q-btn>-->
          <q-btn flat icon="edit" round @click="editUser(user)"></q-btn>
        </td>
      </tr>
      </tbody>
    </q-markup-table>

    <q-page-sticky :offset="[18, 18]" position="bottom-right">
      <q-btn color="accent" fab icon="add" @click="newUserDialog = true"/>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { useCloned } from '@vueuse/core'
import {api} from "boot/axios";
import {ref} from "vue";
import {useQuasar} from "quasar";
import EditUserDialog from "components/dialogs/EditUserDialog.vue";
import RegisterNewUserDialog from "components/dialogs/RegisterNewUserDialog.vue";

const $q = useQuasar();

let newUserDialog = ref(false)
let editUserDialogModel = ref(false)
let setPermissionUserDialogModel = ref(false)
let users = ref([])
let userToEdit = ref({})
const userToRegister = ref({
  firstName: ''
})

let userNewPermission = ref('')
let isLoading = ref(false);

function editUser(user) {
  editUserDialogModel.value = true
  userToEdit.value = useCloned(user)
}

function setUserPermission(user) {
  setPermissionUserDialogModel.value = true
  userToEdit.value = user
}

api
  .get("admin/Users/List")
  .then(response => users.value = response.data.data);

function saveUpdate(u) {
  
  const data = {
    Id: u.value.id,
    firstName: u.value.firstName,
    lastName: u.value.lastName,
    phoneNumber: u.value.phoneNumber,
    nationalCode: u.value.nationalCode
  }

  api.post("admin/users/EditUser", data)
  editUserDialogModel.value = false
}

function saveUpdatePermissions() {
  const data = {
    userId: userToEdit.value.id,
    role: 'user'
  }
  api.post('admin/Users/SetRole', data)
}

function registerNewUser(u) {
  const data = {
    firstName: u.value.firstName,
    lastName: u.value.lastName,
    phoneNumber: u.value.phoneNumber.replaceAll('-', ''),
    nationalCode: u.value.nationalCode,
    password: u.value.password
  }

  api
    .post("user/auth/register", data)
    .then((response) => {
      isLoading.value = false;

      if (response.data.success === true) {
        users.value.push(data)
        newUserDialog.value = false
      } else {
        $q.notify(response.data.message);
      }
    })
    .catch((reason) => {
      isLoading.value = false;
    });
}
</script>
