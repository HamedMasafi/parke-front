<template>
  <div class="root">
    <div class="dim"></div>
    <div class="content">
      <q-circular-progress
        class="q-ma-md"
        color="blue"
        indeterminate
        rounded
        size="50px"
      />
      <br />
      <span>{{text}}</span>
    </div>
  </div>
</template>


<script setup>
  defineProps({
    dim: {
      type: Boolean,
      default: false
    },
    text: {
      default: '',
      type: String
    }
  })
</script>

<style lang="scss" scoped>
div.root {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  //background-color: #000000;

  div.dim {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.4;
  }
  div.content {
    left: 50%;
    top: 50%;
    position: absolute;
    text-align: center;

    transform: translate(-50%, -50%);
    span {
      font-weight: bold;
    }
  }
}
</style>
