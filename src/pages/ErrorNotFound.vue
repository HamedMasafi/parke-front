<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 10vh">
        <q-icon name="fa fa-chain-broken" />
      </div>
      <div style="font-size: 21vh">۴۰۴</div>

      <div class="text-h4" style="opacity: 0.4">
        چیزی که دنبالش بودین پیدا نشد...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        icon="home"
        label="برو به خانه"
        no-caps
        text-color="blue"
        @click="goHome"
      />
    </div>
  </div>
</template>

<script setup>
import {defineComponent} from "vue";
import {useAuthStore} from "stores/auth";
import {Role} from "boot/role";
import {useRouter} from "vue-router";

const authStore = useAuthStore()
const router = useRouter()

function goHome() {
  if (authStore.role === Role.User)
    router.push({name: 'UserIndex'})
  else if (authStore.role === Role.Admin || authStore.role === Role.Manager)
    router.push({name: 'AdminIndex'})
  else
    console.log("User role not found", authStore.role)
}
</script>
