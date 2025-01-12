<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "~/stores/store";
import { useI18n } from "vue-i18n";
import type {IMenu, IStores} from "~/types";

const store = useStore()
const { locale } = useI18n();

const menu = ref<IMenu[]>([]);

watch(() => locale.value, (newLocale) => {
  store.updateStoresByLocale(newLocale);
}, { immediate: true });

onBeforeMount(() => {
  if(store.GET_STORES) {
    store.GET_STORES.map((item: IStores, _) => {
      menu.value.push({
        id: item.id,
        title: item.title,
        icon: 'mdi-warehouse',
        link: `/stores/${item.id}`,
        disabled: item.status !== 'ACTIVE'
      })
    })
  }
})
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

<style scoped>

</style>