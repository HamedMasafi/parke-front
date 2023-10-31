<template>
  <q-page padding>

    <q-dialog v-model="newUserDialog">
      <q-card>
        <q-card-section>
          <q-form>
          <q-input v-model="newUserFirstName" label="نام" outlined></q-input>
          <q-input v-model="newUserLastName" label="نام خانوادگی" outlined></q-input>
          <q-input v-model="newUserMobile" mask="09##-###-####" label="شماره موبایل" outlined></q-input>
          <password-field v-model="newUserPassword" label="کلمه عبور" outlined></password-field>
          <password-field v-model="newUserPassword2" label="تکرار کلمه عبور" outlined></password-field>
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn label="ثبت" color="primary" icon="save" @click="registerNewUser"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <table>
      <tr v-for="user in users" :key="user.id">
        <td>
          {{user.firstName }} {{user.lastName}}
        </td>
      </tr>
    </table>

    <q-page-sticky :offset="[18, 18]" position="bottom-right">
      <q-btn @click="newUserDialog = true" color="accent" fab icon="add"/>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import {api} from "boot/axios";
import {ref} from "vue";
import PasswordField from "components/PasswordField.vue";

let newUserDialog = ref(false)
let users = ref([])

let newUserFirstName = ref('')
let newUserLastName = ref('')
let newUserMobile = ref('')
let newUserPassword = ref('')
let newUserPassword2 = ref('')

api
  .get("user/list")
  .then(response => users.value = response.data.data);


function registerNewUser() {
  let data = {
    userName: newUserMobile.value,
    phoneNumber: newUserMobile.value,
    firstName: newUserFirstName.value,
    lastName: newUserLastName.value,
    password: newUserPassword.value
  }
  api
    .post("user/register", data)
}
</script>
