<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        <h5>
          ویرایش کاربر
        </h5>
        <q-form>
          <div class="row">

            <div :class="col">
              <q-input v-model="value.firstName" :rules="[nameRule]" dense label="نام"
                       outlined></q-input>
            </div>
            <div :class="col">
              <q-input v-model="value.lastName" :rules="[lastNameRule]" label="نام خانوادگی"
                       dense outlined></q-input>
            </div>
            <div :class="col">
              <q-input v-model="value.phoneNumber" :rules="[phoneRule]"
                       dense
                       label="شماره موبایل" mask="09##-###-####" outlined></q-input>
            </div>
            <div :class="col">
              <q-input v-model="value.nationalCode" :rules="[nationalCodeRule]" dense label="کد ملی"
                       mask="##########" outlined></q-input>
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
import {computed, ref} from 'vue'
import {lastNameRule, nameRule, nationalCodeRule, phoneRule} from "src/rules/user";

const props = defineProps(['user'])
const emit = defineEmits(['update:user', "save"])
const col = ref('col-md-6 col-xs-12')

const value = computed({
  get() {
    return props.user.cloned
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

function save() {
  emit('save', value)
}

</script>

