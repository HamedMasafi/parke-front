<template>
  <q-page padding>

    <!--    {{sessions}}-->
    <!--    <q-table :columns="columns" :rows="sessions" />-->

    <div
      class="q-table__container q-table--horizontal-separator q-table--vertical-separator column no-wrap q-table__card q-table--no-wrap">
      <table class="q-table">
        <thead>
        <tr>
          <th>زمان</th>
          <th>تاریخ</th>
          <th>مدت</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="session in sessions" :key="session.id">
          <td>
            {{ session.time }}
          </td>
          <td>
            {{ session.date }}
          </td>
          <td>
            {{ session.duration }}
            دقیقه
          </td>
          <td style="max-width: 0">
            <q-btn v-if="!session.videoUploaded" :to="{name: 'UploadSessionVideo', params: {id: session.id}}" icon="upload" label="آپلود"/>
            <template v-else>
              <q-icon name="check"></q-icon>
              قبلاً آپلود شده است
            </template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </q-page>
</template>

<script setup>

import {api} from "boot/axios";
import {ref} from "vue";
import {useAppStore} from "stores/app";
import {useRoute} from "vue-router";

let skyRoomLink = ref('')
let sessions = ref([]);
let name = ref("");
const appStore = useAppStore();
const route = useRoute()

const columns = [
  {
    name: 'time',
    required: true,
    label: 'زمان',
    align: 'left',
    field: row => row.time,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'date',
    required: true,
    label: 'تاریخ',
    align: 'left',
    field: row => row.date,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'duration',
    required: true,
    label: 'مدت زمان',
    align: 'left',
    field: row => row.duration,
    format: val => `${val} دقیقه`,
    sortable: true
  },
  {
    name: 'status',
    required: true,
    label: 'مدت زمان',
    align: 'left',
    field: row => {
      switch (row.status) {
        case 1:
          return 'گذشته';
      }
      return row.status
    },
    format: val => `${val}`,
    sortable: true
  },
]

const classId = route.params.id;

if (classId !== undefined) {
  name.value = classId

  appStore.isLoading = true
  api
    .get("admin/classrooms/details/" + classId)
    .then((response) => {
      const d = response.data.data;
      console.log(d)
      name.value = d.name;
      skyRoomLink.value = d.skyRoomLink
      sessions.value = d.sessions
      appStore.isLoading = false
    });
}
</script>

<style lang="scss" scoped>
.q-table {
  th {
    text-align: left;
  }

  td {
    text-align: left;
    border-bottom-width: 1px;
  }
}
</style>
