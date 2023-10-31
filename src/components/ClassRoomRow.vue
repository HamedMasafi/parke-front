<template>
  <q-card>
    <q-card-section>
      <div class="row">
        <div class="col-10">
          {{ classRoom.name }}
        </div>
        <div class="col-2 text-right">
          <q-btn icon="people" flat round></q-btn>
          <q-btn icon="edit" flat round :to="{name: 'AdminClassEdit', params: {id: classRoom.id}}"></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  classRoom: Object,
});
</script>
