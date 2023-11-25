<template>
  <q-card>
    <q-card-section>
      <p>
        <q-icon
            v-show="session.time.trim().length === 5"
            class="text-green"
            name="check"
        ></q-icon>
        <q-icon
            v-show="session.time.trim().length !== 5"
            class="text-red"
            name="error"
        ></q-icon>

        جلسه شماره {{ index + 1 }}
      </p>

      <q-item v-ripple clickable>
        <div class="cursor-pointer">
          زمان:
          {{ session.time }}
          <q-icon
              v-show="session.time === ''"
              class="text-red"
              name="edit"
          ></q-icon>
          <q-popup-edit v-model="label" auto-save>
            <q-input
                v-model="session.time"
                autofocus
                counter
                dense
                label="زمان"
                mask="##:##"
                @keyup.enter="session.set"
            />
          </q-popup-edit>
        </div>
      </q-item>

      <q-item v-ripple clickable>
        <div class="cursor-pointer">
          تاریخ:
          {{ session.date }}
          <q-icon
              v-show="session.date === ''"
              class="text-red"
              name="edit"
          ></q-icon>
          <q-popup-edit v-model="label" auto-save>
            <q-input
                v-model="session.date"
                autofocus
                counter
                dense
                label="تاریخ"
                mask="14##/##/##"
                @keyup.enter="session.set"
            />
          </q-popup-edit>
        </div>
      </q-item>

    </q-card-section>
    <q-card-actions>
      <q-btn
          v-if="session.id === ''"
          color="red"
          icon="remove"
          size="sm"
          @click="remove(index)"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'click:remove'])

const session = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

</script>

<style lang="scss" scoped>

.cursor-pointer {
  width: 100%;
}
</style>
