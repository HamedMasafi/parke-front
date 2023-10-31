<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">۴۰۴</div>

      <div class="text-h2" style="opacity: 0.4">
        چیزی که دنبالش بودین پیدا نشد...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        icon="home"
        label="برو به خانه"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
});
</script>
