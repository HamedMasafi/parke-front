<template>
  <q-page padding>

    <iframe
      allowfullscreen="allowfullscreen" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d1373.741767321282!2d48.87780532618283!3d38.43234030211218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d38.43266537913813!2d48.878269829682836!5e0!3m2!1sen!2s!4v1699461706132!5m2!1sen!2s"
    ></iframe>
    <q-list bordered separator>
      <q-item v-ripple clickable>
        <q-item-section avatar>
          <q-icon color="primary" name="mdi-map"/>
        </q-item-section>

        <q-item-section class="text-left" dir="ltr">      تهران، خیابان ولیعصر بالاتر از میدان پلاک ۱
        </q-item-section>
      </q-item>
      <q-item v-ripple clickable>
        <q-item-section avatar>
          <q-icon color="primary" name="mdi-whatsapp"/>
        </q-item-section>

        <q-item-section class="text-left" dir="ltr">0912 123 4567</q-item-section>
      </q-item>
      <q-item v-ripple clickable href="mailto:parke@gmail.com">
        <q-item-section avatar>
          <q-icon color="primary" name="mdi-email"/>
        </q-item-section>

        <q-item-section>parke@gmail.com</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>

</script>

<style lang="scss" scoped>
iframe {
  width: 100%;
  height: 300px;
  border: none;
}
</style>
