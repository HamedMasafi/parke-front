<template>
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
</template>
<script setup>
import PasswordField from "components/PasswordField.vue";
</script>
