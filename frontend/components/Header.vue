<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'
import { useRouter, useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'

const { locale, locales } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const route = useRoute()

type LocaleCode = typeof locales.value[number]['code']

const isHome = ref(true)
const headerExpanded = ref(false)

watchEffect(() => {
  isHome.value = route.path === localePath('/')
  headerExpanded.value = !isHome.value
})

const changeLanguage = (lang: LocaleCode) => {
  if (locale.value !== lang) {
    locale.value = lang
    const path = localePath(route.path)
    router.push(path)
  }
}
</script>

<template>
  <header
      :class="['header-wrapper header-md-wrapper', { 'header-expanded': headerExpanded }]"
      v-show="!$route.path.includes(localePath('settings'))"
  >
    <v-app-bar class="header position-relative" app :elevation="2">
      <nuxt-link v-show="!isHome" class="px-4" :to="localePath('/')">
        <v-icon icon="mdi-home" size="28" color="secondary"></v-icon>
      </nuxt-link>

      <v-menu class="header-menu-lang d-flex justify-center" offset-y>
        <template v-slot:activator="{ props }">
          <v-btn :ripple="false" icon v-bind="props">
            <v-icon icon="mdi-translate" color="secondary"></v-icon>
          </v-btn>
        </template>
        <v-list class="py-0">
          <v-list-item
              v-for="(language, index) in locales"
              :key="index"
              @click="changeLanguage(language.code as LocaleCode)"
          >
            <v-list-item-title>{{ language.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </header>
</template>

<style lang="scss">
.header-md-wrapper {
  position: fixed;
  z-index: 10000;
  min-width: 64px;

  @media (min-width: 600px) {
    left: 50% !important;
    transform: translateX(-50%) !important;
  }
  @media (max-width: 600px) {
    right: 0;
  }
  .header {
    border-radius: 0 0 0 16px;
    @media (min-width: 600px) {
      border-radius: 0 0 16px 16px;
    }
  }
}

.header-wrapper {
  .header {
    max-width: 64px;
    transition: max-width 0.3s ease;
    .v-toolbar__content {
      display: flex;
      justify-content: center;
    }
    .v-toolbar__content > .v-btn:last-child {
      margin-right: 0;
      margin-left: 0;
    }
  }
  &.header-expanded .header {
    max-width: 128px;
  }
}

.header-menu-lang {
  .v-overlay__content {
    width: auto !important;
    min-width: 60px;
    top: 68px !important;
  }
}

.header-menu-lang .v-overlay__content {
  @media (min-width: 600px) {
    position: absolute !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
  }
  @media (max-width: 600px) {
    right: 4px !important;
    left: unset !important;
  }
}
</style>
