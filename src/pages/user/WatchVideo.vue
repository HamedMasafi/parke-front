<template>
<q-page padding>
  <div class="video-container">
  <video controls>
    <source :src="videoSrc" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  </div>
</q-page>
</template>

<script setup>
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute()

const sessionId = route.params.id;
const videoSrc = ref('http://localhost:5005/api/user/classrooms/video/' + sessionId)
</script>

<style scoped lang="scss">

.video-container {

  text-align: center;
  //height: calc(100% - 380px);
  video {
    width: 700px;
    //height: 100%;
  }
}
</style>
