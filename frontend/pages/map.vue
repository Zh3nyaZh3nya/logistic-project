<script setup lang="ts">
import { ref, computed } from "vue"
import { useStore } from "~/stores/store";
import { IStores, IStoresOnMap } from "~/types";

const store = useStore()
const { locale } = useI18n()

const stores = computed<IStoresOnMap[]>(() => {
  if(store.stores_on_map) {
    return store.stores_on_map
  } else {
    return [] as IStoresOnMap[]
  }
})

watch(() => locale.value, (newLocale) => {
  store.updateStoresByLocale(newLocale);
}, { immediate: true });

onMounted(() => {

});

</script>

<template>
  <v-main class="map pt-0">
    <Map :stores="stores" />
  </v-main>
</template>

<style scoped>

</style>