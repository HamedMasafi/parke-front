<template>
  <q-page padding>

    <alert-box color="green" text="قبلاً برای این جلسه ویدئویی ارسال شده است"/>

    <q-dialog v-model="isUploading">
      <q-card>
        <q-card-section class="text-center q-px-lg">
          <q-circular-progress
            :thickness="1"
            :value="progress"
            class="q-ma-md"
            color="grey-8"
            size="45px"
            track-color="orange"
          />
        </q-card-section>
        <p class="text-center">
        در حال آپلود فایل...
          <br />
          {{progress}}٪
        </p>
      </q-card>
    </q-dialog>

    <div v-if="!isUploading" class="row q-gutter-lg">
      <div class="col-md-4">
        <q-file v-model="file" outlined @change="changeFile">
          <template v-slot:append>
            <q-icon name="attach_file"/>
          </template>
        </q-file>
      </div>


      <q-btn icon="send" label="ارسال" @click="uploadFile"/>
    </div>

    <q-linear-progress v-show="isUploading" v-model="progress"/>
  </q-page>
</template>

<script setup>
import {computed, ref} from "vue";
import AlertBox from "components/AlertBox.vue";
import {api} from "boot/axios";
import {useRoute} from "vue-router";
import {useQuasar} from "quasar";

const fileData = ref(null)
const file = ref(null)
const route = useRoute()

const fileName = computed(() => file.value?.name);
const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 1));
const fileMimeType = computed(() => file.value?.type);

const sessionId = route.params.id;
const progress = ref(0);
const isUploading = ref(false)
const $q = useQuasar();

const changeFile = (event) => {
  alert("Hi")
  //file.value = file.value.files.item(0);
  console.log(file.value)
};

function uploadFile() {
  isUploading.value = true;

  let formData = new FormData();
  formData.append('video', file.value);
  formData.append('sessionId', sessionId);

  progress.value = 0;

  api.post('Admin/ClassRooms/UploadVideo', formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        progress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(progressEvent.progress)
      }
    }
  ).then(function () {
    console.log('SUCCESS!!');
    isUploading.value = false;
    $q.notify("فایل با موفقیت آپلود شد");
  })
    .catch(function () {
      console.log('FAILURE!!');
      isUploading.value = false;
    });
}
</script>
