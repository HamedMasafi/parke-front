<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        <q-input v-model="searchText" label="کدملی یا شماره موبایل" @keydown.enter.prevent="search">
          <template v-slot:append>
            <q-avatar>
              <q-btn @click="search" icon="search"/>
            </q-avatar>
          </template>
        </q-input>

        <q-scroll-area>
          <div v-for="user in users" :key="user.nationalCode">
            <q-btn flat @click="select(user)">
            {{user.firstName}} {{user.lastName}}
            </q-btn>
          </div>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>


<script setup>

import {ref} from "vue";
import {api} from "boot/axios";

let searchText = ref('');
let users = ref([])

const emit = defineEmits(['selected'])
function search() {
  api
    .get("user/find/" + searchText.value)
    .then(response => {
      users.value = response.data.data
    })
}

function select(user) {
  emit('selected', user)
}
</script>


<style scoped lang="scss">
.q-scrollarea{
  width: 100%;
  height: 200px;

  .q-btn {
    width: 100%;
  }
}
</style>
