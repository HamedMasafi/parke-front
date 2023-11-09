<template>
  <q-page>
    <h4>
      {{ classInfo.name }}
    </h4>
    <div class="text-center q-my-lg">
      <q-btn :href="classInfo.skyRoomLink" label="ورود به اسکای روم" target="_blank"/>
    </div>

    <div class="sessions">
      <div class="q-gutter-sm q-my-sm">
        <q-card v-for="session in classInfo.sessions" :key="session.id" :class="session.statusText.toLowerCase()">
          <q-card-section>
            {{ session.date }}
            <br />
            {{ session.status}}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>

import {api} from "boot/axios";
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute()

const classId = route.params.id;
const classInfo = ref({})

api.get('user/ClassRooms/Details/' + classId)
  .then(res => {
    classInfo.value = res.data.data
  })
</script>

<style lang="scss" scoped>
div.sessions {
  overflow-x: scroll;
  flex-wrap: nowrap;
  white-space: nowrap;
  div {

    div.q-card {
      display: inline-block;
      width: 200px;

      &.past {
        background-color: #eee;
        opacity: 0.7;
        scale: 0.8;
      }

      &.future {
        background-color: #8f8;
        opacity: 0.7;
        scale: 0.8;
      }
    }
  }
}
</style>
