<script setup lang="ts">
import { ref } from "vue";
import type { IMenu } from "~/types";

const menu = ref<IMenu[]>([
  {
    id: 1,
    title_lang_key: "menu_link_1",
    icon: "mdi-map",
    link: "/map",
  },
  {
    id: 2,
    title_lang_key: "menu_link_2",
    icon: "mdi-store-outline",
    link: "/store",
  },
  {
    id: 3,
    title_lang_key: "menu_link_3",
    icon: "mdi-account-group-outline",
    link: "/members",
  },
  {
    id: 4,
    title_lang_key: "menu_link_4",
    icon: "mdi-information-outline",
    link: "/about",
  },
  {
    id: 5,
    title_lang_key: "menu_link_5",
    icon: "mdi-cogs",
    link: "/settings/profile",
  },
  {
    id: 6,
    title_lang_key: "menu_link_6",
    icon: "mdi-order-bool-descending-variant",
    link: "/orders",
  },
]);
</script>

<template>
  <v-main class="main pt-0">
    <section class="h-100">
      <v-container class="h-100 d-flex align-center justify-center">
        <Menu :menu="menu" />
      </v-container>
    </section>
  </v-main>

</template>

<style lang="scss">

</style>