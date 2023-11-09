<template>
  <q-page padding>

    <q-dialog v-model="setPermissionUserDialogModel">
      <q-card>
        <q-card-section>
          <h5>
            دسترسی کاربر
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
    <q-dialog v-model="editUserDialogModel">
      <q-card>
        <q-card-section>
          <h5>
            کاربر جدید
          </h5>
          <q-form>
            <div class="row">
              <div class="col-md-6">
                <q-input v-model="editUserFirstName" :rules="[nameRule]" dense label="نام"
                         outlined></q-input>
              </div>
              <div class="col-md-6 col-12">
                <q-input v-model="editUserLastName" :rules="[lastNameRule]" dense
                         label="نام خانوادگی" outlined></q-input>
              </div>
              <div class="col-sm-6">
                <q-input v-model="editUserMobile" :rules="[phoneRule]"
                         dense
                         label="شماره موبایل" mask="09##-###-####" outlined></q-input>
              </div>
              <div class="col-sm-6">
                <q-input v-model="editUserNationalCode" :rules="[nationalCodeRule]" dense label="کد ملی"
                         mask="##########" outlined></q-input>
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn color="primary" icon="save" label="ثبت" @click="saveUpdate"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!--  <edit-user-dialog v-model="editUserDialogModel" :user="userToEdit" />-->
    <q-dialog v-model="newUserDialog">
      <q-card class="rtl">
        <q-card-section>
          <h5>
            کاربر جدید
          </h5>
          <q-form>
            <div class="row">

              <div class="col-md-6">
                <q-input v-model="newUserFirstName" :rules="[nameRule]" dense label="نام"
                         outlined></q-input>
              </div>
              <div class="col-md-6 col-12">
                <q-input v-model="newUserLastName" :rules="[lastNameRule]"
                         dense outlined></q-input>
              </div>
              <div class="col-sm-6">
                <q-input v-model="newUserMobile" :rules="[phoneRule]"
                         dense
                         label="شماره موبایل" mask="09##-###-####" outlined></q-input>
              </div>
              <div class="col-sm-6">
                <q-input v-model="newUserNationalCode" :rules="[nationalCodeRule]" dense label="کد ملی"
                         mask="##########" outlined></q-input>
              </div>
              <div class="col-sm-6">
                <password-field v-model="newUserPassword" :rules="[passwordRule]" dense
                                label="کلمه عبور" outlined></password-field>
              </div>
              <div class="col-sm-6">
                <password-field v-model="newUserPassword2" :rules="[password2Rule]" dense
                                label="تکرار کلمه عبور" outlined></password-field>
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn color="primary" icon="save" label="ثبت" @click="registerNewUser"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    {{ users.length }}

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
          <q-btn flat icon="key" round @click="setUserPermission(user)"></q-btn>
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
import {api} from "boot/axios";
import {ref} from "vue";
import PasswordField from "components/PasswordField.vue";
import {useQuasar} from "quasar";
import {lastNameRule, nameRule, nationalCodeRule, phoneRule} from "src/rules/user";

const $q = useQuasar();

let newUserDialog = ref(false)
let editUserDialogModel = ref(false)
let setPermissionUserDialogModel = ref(false)
let users = ref([])
let userToEdit = ref({})

let userNewPermission = ref('')
let editUserId = ref('')
let editUserFirstName = ref('')
let editUserLastName = ref('')
let editUserMobile = ref('')
let editUserNationalCode = ref('')

let newUserFirstName = ref('')
let newUserLastName = ref('')
let newUserMobile = ref('')
let newUserNationalCode = ref('')
let newUserPassword = ref('')
let newUserPassword2 = ref('')
let isLoading = ref(false);

const roles = [
  {value: "A", label: 'ادمین'},
  {value: "B", label: 'مدیر'},
  {value: "C", label: 'کاربر عادی'},
]

function password2Rule(v) {
  if (v === newUserPassword.value)
    return true
  return "کلمات عبور یکسان نیستند"
}

function editUser(user) {
  editUserDialogModel.value = true

  editUserFirstName.value = user.firstName
  editUserLastName.value = user.lastName
  editUserMobile.value = user.phoneNumber
  editUserNationalCode.value = user.nationalCode
  editUserId.value = user.id
  userToEdit.value = user
}

function setUserPermission(user) {
  setPermissionUserDialogModel.value = true
  userToEdit.value = user
}

api
  .get("admin/Users/List")
  .then(response => users.value = response.data.data);

function saveUpdate() {
  const data = {
    Id: editUserId.value,
    firstName: editUserFirstName.value,
    lastName: editUserLastName.value,
    phoneNumber: editUserMobile.value,
    nationalCode: editUserNationalCode.value
  }
  api.post("admin/users/EditUser", data)

}

function saveUpdatePermissions() {
  const data = {
    userId: userToEdit.value.id,
    role: 'user'
  }
  api.post('admin/Users/SetRole', data)
}

function registerNewUser() {
  let data = {
    userName: newUserMobile.value,
    phoneNumber: newUserMobile.value.replaceAll('-', ''),
    firstName: newUserFirstName.value,
    lastName: newUserLastName.value,
    password: newUserPassword.value,
    nationalCode: newUserNationalCode.value
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
