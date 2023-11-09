<template>
  <q-page padding>
    <div class="row fit row wrap items-stretch content-start">
      <div v-for="cls in classes" :key="cls" class="cls col-sm-6 col-md-3 col-xs-12">
        <q-card>
          <q-card-section>
            <div class="text-center">
              <q-icon name="class" size="xl"/>
            </div>

            {{ cls.name }}

          </q-card-section>
          <q-card-actions class="text-center">
            <q-btn :to="{name: 'UserClassView', params: {id: cls.id}}" icon="login" label="ورود"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>

import {api} from "boot/axios";
import {ref} from "vue";
import {useAuthStore} from "stores/auth";

const authStore = useAuthStore()

const classes = ref([])
api.get("user/ClassRooms/List", {headers: {"Authorization": `Bearer ${authStore.token}`}})
  .then(res => {
    classes.value = res.data.data

  });
</script>

<style lang="scss" scoped>
div.cls {
  //width: 150px;
  //min-width: 150px;
  //max-width: 150px;
  //text-align: center;
  .q-card {
    margin: 6px;
  }
}
</style>
