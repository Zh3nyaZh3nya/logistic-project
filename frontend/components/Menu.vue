<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import type { IMenu } from "~/types";

const localePath = useLocalePath();

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

onMounted(() => {
  const items = document.querySelectorAll(".menu-item");
  gsap.fromTo(
      items,
      { opacity: 0, rotateY: -90, transformOrigin: "center center" },
      {
        opacity: 1,
        rotateY: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power2.out",
      }
  );
});
</script>

<template>
  <v-row>
    <v-col
        v-for="(item, index) in menu"
        :key="item.id"
        :cols="menu.length % 2 !== 0 ? index === menu.length - 1 ? 12 : 6 : 6"
        :class="[index % 2 === 0 ? 'justify-end' : 'justify-start', menu.length % 2 !== 0 ? index === menu.length - 1 ? 'justify-center' : '' : '']"
        class="d-flex pa-1 pa-sm-3 menu-item"
    >
      <v-card
          :max-width="menu.length % 2 !== 0 ? index === menu.length - 1 ? 624 : 300 : 300"
          :ripple="false"
          :to="localePath(item.link)"
          width="100%"
          class="d-flex flex-column align-center pa-3 pa-md-4"
      >
        <v-icon :icon="item.icon" size="60" class="mb-2" color="accent" />
        <h1 class="text-body-1 text-md-h5 font-weight-bold text-center">
          {{ $t(item.title_lang_key) }}
        </h1>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.menu-item {
  perspective: 1000px; /* Добавляем перспективу для 3D эффекта */
  transform-style: preserve-3d; /* Для корректной 3D трансформации */
}
</style>
