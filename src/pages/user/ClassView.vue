<template>
  <q-page>
    <h4>
      {{ classInfo.name }}
    </h4>
    <div class="text-center q-my-lg">
      <q-btn :href="classInfo.skyRoomLink" label="ورود به اسکای روم" target="_blank"/>
    </div>

    <!--<div class="sessions">
      <div class="q-gutter-sm q-my-sm">
        <q-card v-for="(session, index) in classInfo.sessions" :key="session.id" :class="session.statusText.toLowerCase()">
          <q-card-section>
            {{index + 1}}
            <br />
            {{ session.date }}
            {{session.time}}
            <br />
            {{ session.status}}
          </q-card-section>
        </q-card>
      </div>
    </div>-->

    <div class="row items-stretch">
      <div :class="CardClass" v-for="(session, index) in classInfo.sessions" :key="session.id" >
        <q-card class="q-ma-md" style="height2: 100%">
          <q-card-section>
            <strong>
            جلسه: {{index + 1}}
            </strong>

            <br />
            تاریخ: {{session.date}}
            <br />
            زمان: {{session.time}}
<!--          </q-card-section>-->
<!--          <q-card-actions>-->
            <div class="text-center q-mt-lg">
            <q-btn icon="movie" v-if="session.hasVideo" :to="{name: 'WatchVideo', params: {id: session.videoId}}" />
            <span v-else>ویدئوی این جلسه آپلود نشده است</span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!--<q-markup-table separator="cell">
      <thead>
      <q-th>
        تاریخ و زمان
      </q-th>
      <q-th >

      </q-th>
      </thead>
      <tbody>
      <q-tr v-for="(session, index) in classInfo.sessions" :key="session.id">
        <q-td>
          {{index + 1}}
        </q-td>
        <q-td>
          {{session.date}}
        </q-td>
        <q-td>
          <q-btn icon="movie" v-if="session.videoUploaded === true" />
        </q-td>
      </q-tr>
      </tbody>
    </q-markup-table>-->
  </q-page>
</template>

<script setup>

import {api} from "boot/axios";
import {useRoute} from "vue-router";
import {ref} from "vue";
import {CardClass} from "boot/grid";

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
