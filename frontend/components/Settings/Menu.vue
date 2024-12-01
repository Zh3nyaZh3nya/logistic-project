<script setup lang="ts">
import { ref } from 'vue'
import { useLocalePath } from "#i18n";
import { useDisplay } from 'vuetify'
import type { IMenu } from "~/types";

const { mdAndUp, smAndUp } = useDisplay()
const localePath = useLocalePath()

const drawer = ref<boolean>(true)
const menu = ref<IMenu[]>([
  {
    id: 1,
    title_lang_key: 'settings_menu_1',
    icon: 'mdi-account-circle-outline',
    link: 'profile',
  },
  {
    id: 2,
    title_lang_key: 'settings_menu_2',
    icon: 'mdi-map',
    link: 'map',
  },
  {
    id: 3,
    title_lang_key: 'settings_menu_3',
    icon: 'mdi-theme-light-dark',
    link: 'theme',
  },
  {
    id: 4,
    title_lang_key: 'settings_menu_4',
    icon: 'mdi-frequently-asked-questions',
    link: 'faq',
  },
])
</script>

<template>
  <v-card :rounded="false">
    <v-layout>
      <v-navigation-drawer
          theme="dark"
          permanent
          rail
          v-if="smAndUp"
      >
        <v-list
            density="compact"
            nav
            class="py-1"
        >
          <v-list-item prepend-icon="mdi-home" :to="localePath('/')" base-color="accent"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-navigation-drawer
          v-model="drawer"
          permanent
          :rail="!mdAndUp"
      >
        <v-list class="py-0">
          <v-list-item prepend-icon="mdi-home" :to="localePath('/')" base-color="accent" v-if="!smAndUp"></v-list-item>

          <v-list-item
              v-for="(item, index) in menu"
              :prepend-icon="item.icon"
              :title="$t(item.title_lang_key)"
              :value="item.title_lang_key"
              :to="localePath(`/settings/${item.link}`)"
              active-class="active-list-item"
              color="accent"
          >

          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <aside class="w-100 mx-4 mt-4" style="min-height: 100vh">
        <NuxtPage />
      </aside>
    </v-layout>
  </v-card>
</template>

<style lang="scss">
.active-list-item {
  color: rgb(var(--v-theme-accent)) !important;
  border-right: 3px solid rgb(var(--v-theme-accent)) !important;
}
</style>