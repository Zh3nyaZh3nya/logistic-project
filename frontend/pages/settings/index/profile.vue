<script setup lang="ts">

</script>

<template>
  <v-main class="profile w-100">
    <section class="profile-wrapper w-100">
      <v-container class="w-100">
        <h1 class="text-h6 text-md-h4 font-weight-bold mb-4">{{ $t('profile_title') }}</h1>
        <SettingsProfile />
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>