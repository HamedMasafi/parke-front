<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        <h5>
          کاربر جدید
        </h5>
        <q-form>
          <div class="row">
{{user}}
            <div class="col-md-6">
              <q-input v-model="model.firstName" :rules="[nameRule]" dense label="نام"
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
          </div>
          {{newUserLastName}}
        </q-form>
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" icon="save" label="ثبت" @click="save"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {onMounted, ref, watch, watchEffect} from "vue";


const props = defineProps({
  user: {

  },
  firstName() { return '' }
})

//let firstName = ref('')
let newUserFirstName = ref('')
let newUserLastName = ref('')
let newUserMobile = ref('')
let newUserNationalCode = ref('')

const model = defineModel({default: {}})

watch(model, () => {
  console.log("Usr changed")

  newUserFirstName.value = model.value.firstName
})
function nameRule(v) {
  if (!!v)
    return true
  return "نام را وارد کنید"
}

function lastNameRule(v) {
  if (!!v)
    return true
  return "نام خانوادگی را وارد کنید"
}

function phoneRule(v) {
  if (!!v) {
    if (v.length === 13)
      return true;
    else
      return "شماره موبایل صحیح نیست"
  }
  return "شماره موبایل را وارد کنید"
}

function nationalCodeRule(v) {
  if (!!v) {
    if (v.length === 10)
      return true;
    else
      return "کد ملی صحیح نیست"
  }
  return "کد ملی را وارد کنید"
}

function save() {

}

</script>

