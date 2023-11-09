<template>
  <q-page padding>
    <password-field v-model="userCurrentPassword" :rules="[passwordRule]" dense
                    label="کلمه عبور جاری" outlined></password-field>
    <password-field v-model="newUserPassword" :rules="[passwordRule]" dense
                    label="کلمه عبور جدید" outlined></password-field>
    <password-field v-model="newUserPassword2" :rules="[password2Rule]" dense
                    label="تکرار کلمه عبور جدید" outlined></password-field>

    <div class="text-center">
      <q-btn color="primary" label="ثبت" icon="save" @click="save" />
    </div>
  </q-page>
</template>

<script setup>
import {passwordRule} from "src/rules/user";
import PasswordField from "components/PasswordField.vue";
import {ref} from "vue";

const userCurrentPassword = ref('')
const newUserPassword = ref('')
const newUserPassword2 = ref('')

function password2Rule(v) {
  if (v === newUserPassword.value)
    return true
  return "کلمات عبور یکسان نیستند"
}

function save() {

}
</script>

<style lang="scss" scoped>

</style>
