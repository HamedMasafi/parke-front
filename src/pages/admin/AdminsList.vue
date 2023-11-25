<template>
  <q-page padding>

    <register-new-user-dialog v-model="newUserDialog" v-model:user="userToRegister" @save="registerNewAdmin" show-permissions="true"></register-new-user-dialog>

    <q-dialog v-model="setPermissionDialog">
      <q-card>
        <q-card-section>
          <h5>
            دسترسی کاربر
            {{userToSetPermission.firstName}}
            {{userToSetPermission.lastName}}
          </h5>
          <q-option-group
            v-model="userNewPermission"
            :options="roles"
            color="primary"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn color="primary" icon="save" label="ثبت" @click="saveUpdatePermissions"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-markup-table separator="cell">
      <thead>
      <tr>
        <th>#</th>
        <th>نام</th>
        <th>شماره موبایل</th>
        <th>کد ملی</th>
        <th>دسترسی</th>
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
        <td>
          <span v-if="user.role === RoleValues.Admin">
            مدیر کل سایت
          </span>
          <span v-if="user.role === RoleValues.Manager">
            مدیر
          </span>
          <!--          <q-btn flat icon="key" round @click="setUserPermission(user)"></q-btn>-->
          <q-btn flat icon="edit" round @click="beginSetPermission(user)"></q-btn>
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
import {ref} from "vue";
import {api} from "boot/axios";
import {Role, RoleNameToValue, RoleValues, RoleValueToName} from "boot/role";
import RegisterNewUserDialog from "components/dialogs/RegisterNewUserDialog.vue";

let users = ref([])
const setPermissionDialog = ref(false);
const userNewPermission = ref('');
const userToRegister = ref({})
const newUserDialog = ref(false)

const roles = ref([
  {
    label: 'مدیر کل سایت',
    value: Role.Admin
  },
  {
    label: 'مدیر',
    value: Role.Manager
  }]);
const userToSetPermission = ref()

function beginSetPermission(user) {
  userNewPermission.value = RoleValueToName(user.role)
  userToSetPermission.value = user
  setPermissionDialog.value = true;
}

function saveUpdatePermissions() {
  const data = {
    userId: userToSetPermission.value.id,
    role: userNewPermission.value
  }

  userToSetPermission.value.role = RoleNameToValue(userNewPermission.value)
  api.post("admin/Users/SetRole", data)

  setPermissionDialog.value = false;
}

function registerNewAdmin(admin) {

}
api
  .get("admin/Users/Admins")
  .then(response => users.value = response.data.data);
</script>

<style scoped lang="scss">

</style>
