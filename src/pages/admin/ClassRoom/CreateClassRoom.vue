<template xmlns:slot="http://www.w3.org/1999/html">
  <q-page padding>
    <q-dialog v-model="picker">
      <date-time-picker></date-time-picker>
    </q-dialog>

    <q-dialog v-model="editDialog">
      <class-list-item></class-list-item>
    </q-dialog>
    <alert-box color="green">
      <q-icon name="fa fa-check"></q-icon>

      عنوان کلاس را در کادر زیر وارد کنید.
      سپس به جلسات مورد نیاز این کلاس را وارد کنید. به کلیک روی دکمه «افزودن» می‌توانید یک جلسه جدید ایجاد کنید.
      سپس تاریخ و زمان جلسه را تنظیم کنیم. زمان هر جلسه به طور پیش‌فرض زمان جلسه قبل و تاریخ آن یک روز بعد است.
    </alert-box>

    <form-row>
      <template v-slot:label>
        <label>عنوان کلاس</label>
      </template>
      <template v-slot:control>
        <q-input dense v-model="name" label="عنوان کلاس" outlined></q-input>
      </template>
    </form-row>
    <form-row>
      <template v-slot:label>
        <label>لینک اسکای روم</label>
      </template>
      <template v-slot:control>
        <q-input dense v-model="skyRoomLink" label="لینک اسکای روم" outlined></q-input>
      </template>
    </form-row>

    <div class="q-gutter-lg  q-my-lg">
      <q-card v-for="(session, index) in sessions" :key="index">
        <q-card-section>
          <p>
            <q-icon
              v-show="session.time.trim().length === 5"
              class="text-green"
              name="check"
            ></q-icon>
            <q-icon
              v-show="session.time.trim().length !== 5"
              class="text-red"
              name="error"
            ></q-icon>

            جلسه شماره {{ index + 1 }}
          </p>

          <q-item v-ripple clickable>
            <div class="cursor-pointer">
              زمان:
              {{ session.time }}
              <q-icon
                v-show="session.time === ''"
                class="text-red"
                name="edit"
              ></q-icon>
              <q-popup-edit v-model="label" auto-save>
                <q-input
                  v-model="session.time"
                  autofocus
                  counter
                  dense
                  label="زمان"
                  mask="##:##"
                  @keyup.enter="session.set"
                />
              </q-popup-edit>
            </div>
          </q-item>

          <q-item v-ripple clickable>
            <div class="cursor-pointer">
              تاریخ:
              {{ session.date }}
              <q-icon
                v-show="session.date === ''"
                class="text-red"
                name="edit"
              ></q-icon>
              <q-popup-edit v-model="label" auto-save>
                <q-input
                  v-model="session.date"
                  autofocus
                  counter
                  dense
                  label="تاریخ"
                  mask="14##/##/##"
                  @keyup.enter="session.set"
                />
              </q-popup-edit>
            </div>
          </q-item>

        </q-card-section>
        <q-card-actions>
          <q-btn
            v-if="session.id === ''"
            color="red"
            icon="remove"
            size="sm"
            @click="remove(index)"
          ></q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="bg-green">
        <q-btn class="add" color="white" flat icon="add" icon-right="arrow_left" label="افزودن" @click="add"></q-btn>
      </q-card>
    </div>

    <p>
      {{ sessions.length }} جلسه برای این کلاس تنظیم شده است
    </p>

    <q-btn color="primary" icon="save" label="ثبت" @click="save"/>
    <LoadingProgress v-show="isLoading"/>
  </q-page>
</template>

<script setup>
import {ref} from "vue";
import DateTimePicker from "components/DateTimePicker.vue";
import ClassListItem from "components/ClassListItem.vue";
import {useQuasar} from "quasar";
import {ShamsiCalendar} from "src/utilities/shamsi";
import {useRoute} from "vue-router";
import {api} from "boot/axios";
import LoadingProgress from "components/LoadingProgress.vue";
import AlertBox from "components/AlertBox.vue";
import FormRow from "components/FormRow.vue";

const $q = useQuasar();
let name = ref("");
let sessions = ref([]);
let picker = ref(false);
let skyRoomLink = ref('')
let editDialog = ref(false);
const route = useRoute()
let isLoading = ref(false)
const classId = route.params.id;

if (classId !== undefined) {
  name.value = classId

  isLoading.value = true
  api
    .get("admin/classrooms/details/" + classId)
    .then((response) => {
      const d = response.data.data;
      console.log(d)
      name.value = d.name;
      skyRoomLink.value = d.skyRoomLink
      sessions.value = d.sessions
      isLoading.value = false
    });
}

function add() {
  let newSession = {
    id: '',
    time: "",
    date: "",
    duration: 90
  };

  if (sessions.value.length > 0) {
    newSession.time = sessions.value[sessions.value.length - 1].time;

    //debugger;
    var sh = new ShamsiCalendar();
    sh.parse(sessions.value[sessions.value.length - 1].date)

    var tommorow = new ShamsiCalendar();
    tommorow.from_jdn(sh.jdn + 1)
    newSession.date = tommorow.toString()
  }
  sessions.value.push(newSession);
}

function save() {

  const data = {
    name: name.value,
    skyRoomLink: skyRoomLink.value,
    sessions: sessions.value
  }
  api.post("admin/classrooms/create", data);
}

function remove(index) {
  $q.dialog({
    title: 'حذف',
    message: 'آیا اظمینان به حذف این جلسه دارید؟',
    cancel: true,
    persistent: false
  }).onOk(() => {
    sessions.value.splice(index, 1)
  })
}

function isSessionValid(session) {
  return false;
}
</script>

<style lang="scss" scoped>
.q-card {
  display: inline-block;
  width: 200px;
  height: 220px;

  .add {
    height: 100%;
    width: 100%;
  }
}

.q-gutter-lg {
  margin-right: 0;
}

.q-dialog-plugin {
  direction: rtl !important;
}

.cursor-pointer {
  width: 100%;
}
</style>
