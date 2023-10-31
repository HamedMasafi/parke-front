<template>
  <q-page padding>
    <q-dialog v-model="picker">
      <date-time-picker> </date-time-picker>
    </q-dialog>

    <q-dialog v-model="editDialog">
      <class-list-item> </class-list-item>
    </q-dialog>
    <q-banner class="bg-primary text-white q-my-lg">
      عنوان کلاس را در کادر زیر وارد کنید.
      سپس به جلسات مورد نیاز این کلاس را وارد کنید. به کلیک روی دکمه «افزودن» می‌توانید یک جلسه جدید ایجاد کنید.
      سپس تاریخ و زمان جلسه را تنظیم کنیم. زمان هر جلسه به طور پیش‌فرض زمان جلسه قبل و تاریخ آن یک روز بعد است.
    </q-banner>

    <q-input v-model="name" label="عنوان کلاس" outlined></q-input>


    <div class="q-gutter-lg  q-my-lg">
      <q-card v-for="(session, index) in sessions" :key="index">
        <q-card-section>
          <p>
            <q-icon
              name="check"
              class="text-green"
              v-show="session.time.trim().length === 5"
            ></q-icon>
            <q-icon
              name="error"
              class="text-red"
              v-show="session.time.trim().length !== 5"
            ></q-icon>

            جلسه شماره {{ index + 1 }}
          </p>

          <q-item clickable v-ripple>
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
                mask="##:##"
                label="زمان"
                @keyup.enter="session.set"
              />
            </q-popup-edit>
          </div>
          </q-item>

          <q-item clickable v-ripple>
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
                mask="14##/##/##"
                label="تاریخ"
                @keyup.enter="session.set"
              />
            </q-popup-edit>
          </div>
          </q-item>

        </q-card-section>
        <q-card-actions>
          <q-btn
            color="red"
            icon="remove"
            size="sm"
            @click="remove(index)"
          ></q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="bg-green">
          <q-btn class="add" color="white" icon="add" @click="add" label="افزودن" icon-right="arrow_left" flat></q-btn>
      </q-card>
    </div>

  <p>
    {{sessions.length}} جلسه برای این کلاس تنظیم شده است
  </p>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import DateTimePicker from "components/DateTimePicker.vue";
import ClassListItem from "components/ClassListItem.vue";
import { useQuasar } from "quasar";
import {ShamsiCalendar} from "src/utilities/shamsi";
import {useRoute} from "vue-router";
import {api} from "boot/axios";

const $q = useQuasar();
let name = ref("");
let sessions = ref([]);
let picker = ref(false);
let editDialog = ref(false);
const route = useRoute()

const classId = route.params.id;

if (classId !== undefined) {
  name.value = classId

  api
    .get("classrooms/details/" + classId)
    .then((response) => {
      name.value = response.data.data.name;
    });
}
function add() {
  let newSession = {
    time: "",
    date: "",
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

<style scoped lang="scss">
.q-card {
  display: inline-block;
  width: 200px;
  height: 200px;

  .add{
    height: 100%;
    width: 100%;
  }
}

.q-gutter-lg {
  margin-right: 0;
}

.q-dialog-plugin {
  direction: rtl!important;
}

.cursor-pointer {
  width: 100%;
}
</style>
