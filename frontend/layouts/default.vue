<script setup lang="ts">
</script>

<template>
  <v-app>
    <Header />
    <slot />
  </v-app>
</template>

<style lang="scss">
.header-hide {
  height: 0 !important;
}
</style>
