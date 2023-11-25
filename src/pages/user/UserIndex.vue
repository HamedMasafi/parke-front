<template>
  <q-page padding>

    <div class="text-center">
    <q-avatar size="160px" color="orange">
      {{avatarLetters}}
    </q-avatar>

      <h4>
        {{ authStore.userInfo.firstName }} {{ authStore.userInfo.lastName}}
      </h4>
    </div>
    <alert-box color="green" text="برای مشاهده کلاس‌های خود از نوار پایین گزینه «کلاس‌های من» را انتخاب کنید"/>

    کلاس‌های پیش رو:
    <div class="row q-gutter-lg22">
      <div v-for="cls in classRooms" :key="cls.name" class="col-sm-6 col-md-3 col-xs-12">
        <q-card>
          <q-card-section>
            <p class="text-h5">
              {{ cls.name }}
            </p>
            <p>
              وضعیت:
              <span class="text-green">شروع نشده</span>
            </p>
<!--            <q-linear-progress size="25px" :value="progress" color="accent">-->
<!--              <div class="absolute-full flex flex-center">-->
<!--                <q-badge color="white" text-color="accent" :label="progressLabel" />-->
<!--              </div>-->
<!--            </q-linear-progress>-->
          </q-card-section>
<!--          <div class="text-center q-pa-sm">-->
<!--            <q-btn label="شرکت در این کلاس" icon="fa fa-hand"/>-->
<!--          </div>-->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>

import AlertBox from "components/AlertBox.vue";
import ClassListItem from "components/ClassListItem.vue";
import {ref} from "vue";
import {api} from "boot/axios";
import ClassRoomRow from "components/ClassRoomRow.vue";
import LoadingProgress from "components/LoadingProgress.vue";
import {useAuthStore} from "stores/auth";

let classRooms = ref([]);
let showNewDialog = ref(false);
let isLoading = ref(true);
const authStore = useAuthStore();

const progress = ref(0.3)
const progressLabel = ref('25%')
const avatarLetters = ref(authStore.userInfo.firstName[0]  + '‌' + authStore.userInfo.lastName[0])

function add() {
}

api.get("admin/classrooms/list").then((response) => {
  classRooms.value = response.data.data;
  isLoading.value = false
});
</script>

<style lang="scss" scoped>
.q-card {
  margin: 6px;
}
</style>
