<template>
  <div :class="`box ${color}`">
    <slot>
      <q-icon v-if="color === 'green'" name="fa fa-check"></q-icon>
      <q-icon v-if="color === 'blue'" name="fa fa-info"></q-icon>
      <q-icon v-if="color === 'yellow'" name="fa fa-warning"></q-icon>
      <q-icon v-if="color === 'red'" name="fa fa-outline fa-close"></q-icon>
      {{text}}
    </slot>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String
  },
  color: {
    type: String
  }
})
</script>


<style scoped lang="scss">
.box {
  border-radius: 5px;
  margin-bottom: 10px;

  padding: 18px 22px;
  font-weight: bold;
  &.green {
    background-color: #EFFFF7;
    border-left: 6px solid #18AD7B;
    color: #18AD7B;
  }

  &.blue {
    background-color: #E7F7FF;
    border-left: 6px solid #3984F7;
    color: #3984F7;
  }

  &.yellow {
    background-color: #FFFBEF;
    border-left: 6px solid #CE8C21;
    color: #CE8C21;
  }

  &.red {
    background-color: #FFF3EF;
    border-left: 6px solid #FF5652;
    color: #FF5652;
  }
}
</style>
