
<template>
  <q-page padding>
    <div class="col-md-6">
      <q-input v-model="newUserFirstName" :rules="[nameRule]" dense label="نام"
               outlined></q-input>
    </div>
    <div class="col-md-6 col-12">
      <q-input v-model="newUserLastName" :rules="[lastNameRule]" label="نام خانوادگی"
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

    <div class="text-center">
      <q-btn color="primary" label="ثبت" icon="save" @click="save" />
    </div>
  </q-page>
</template>

<script setup>

import {lastNameRule, nameRule, nationalCodeRule, phoneRule} from "src/rules/user";
import {ref} from "vue";
import {useAppStore} from "stores/app";

let newUserFirstName = ref('')
let newUserLastName = ref('')
let newUserMobile = ref('')
let newUserNationalCode = ref('')

const appStore = useAppStore()
function save() {
  appStore.isLoading = true
}

</script>

<style scoped lang="scss">

</style>
