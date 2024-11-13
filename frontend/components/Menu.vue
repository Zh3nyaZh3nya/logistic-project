<script setup lang="ts">
const localePath = useLocalePath()

interface IMenu {
  id: number
  title_lang_key: string
  icon: string
  link: string
}

const menu = ref<IMenu[]>([
  {
    id: 1,
    title_lang_key: 'menu_link_1',
    icon: 'mdi-map',
    link: '/map',
  },
  {
    id: 2,
    title_lang_key: 'menu_link_2',
    icon: 'mdi-store-outline',
    link: '/store',
  },
  {
    id: 3,
    title_lang_key: 'menu_link_3',
    icon: 'mdi-account-group-outline',
    link: '/members',
  },
  {
    id: 4,
    title_lang_key: 'menu_link_4',
    icon: 'mdi-information-outline',
    link: '/about',
  },
  {
    id: 5,
    title_lang_key: 'menu_link_5',
    icon: 'mdi-cogs',
    link: '/settings',
  },
])
</script>

<template>
  <v-row>
    <v-col
      v-for="(item, index) in menu"
      :key="item.id"
      :cols="index === menu.length - 1 ? 12 : 6"
      :class="[index % 2 === 0 ? 'justify-end' : 'justify-start', index === menu.length - 1 ? 'justify-center' : '']"
      class="d-flex pa-1 pa-sm-3"
    >
        <v-card
            :max-width="index === menu.length - 1 ? 624 : 300"
            :ripple="false"
            :to="localePath(item.link)"
            width="100%"
            class="d-flex flex-column align-center pa-3 pa-md-4"
        >
          <v-icon :icon="item.icon" size="60" class="mb-2" color="secondary"/>
          <h1 class="text-body-1 text-md-h5 font-weight-bold text-center">{{ $t(item.title_lang_key) }}</h1>
        </v-card>

    </v-col>
  </v-row>
</template>

<style scoped>

</style>