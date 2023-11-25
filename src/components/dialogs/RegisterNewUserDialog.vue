<template>
  <q-dialog v-model="newUserDialog">
    <q-card class="rtl">
      <q-card-section>
        <h5>
          کاربر جدید
        </h5>

        <q-form>
          <div class="row">

            <div :class="col">
              <q-input v-model="value.firstName" :rules="[nameRule]" dense label="نام"
                       outlined></q-input>
            </div>
            <div :class="col">
              <q-input v-model="value.lastName" :rules="[lastNameRule]"
                       dense outlined></q-input>
            </div>
            <div :class="col">
              <q-input v-model="value.mobile" :rules="[phoneRule]"
                       dense
                       label="شماره موبایل" mask="09##-###-####" outlined></q-input>
            </div>
            <div :class="col">
              <q-input v-model="value.nationalCode" :rules="[nationalCodeRule]" dense label="کد ملی"
                       mask="##########" outlined></q-input>
            </div>
            <div :class="col">
              <password-field v-model="value.password" :rules="[passwordRule]" dense
                              label="کلمه عبور" outlined></password-field>
            </div>
            <div :class="col">
              <password-field v-model="value.password2" :rules="[password2Rule]" dense
                              label="تکرار کلمه عبور" outlined></password-field>
            </div>

            <div :class="col" v-if="showPermissions">
              <q-option-group
                v-model="value.role"
                :options="roles"
                color="primary"
              />
            </div>

          </div>
        </q-form>
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" icon="save" label="ثبت" @click="save"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import PasswordField from "components/PasswordField.vue";
import {lastNameRule, nameRule, nationalCodeRule, passwordRule, phoneRule} from "src/rules/user";
import {computed, ref} from "vue";
import {Role} from "boot/role";

const props = defineProps(['user', 'showPermissions'])
const emit = defineEmits(['update:user', "save"])
const col = ref('col-md-6 col-xs-12')

const value = computed({
  get() {
    return props.user
  },
  set(value) {
    emit('update:user', value)
  }
})

const roles = ref([
  {
    label: 'مدیر کل سایت',
    value: Role.Admin
  },
  {
    label: 'مدیر',
    value: Role.Manager
  }]);

function password2Rule(v) {
  if (v === this.value.password.value)
     return true
  return "کلمات عبور یکسان نیستند"
}

function save() {
  emit('save', value)
}
</script>
