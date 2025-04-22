<script setup lang="ts">
import { ref, computed } from "vue"
import { useStore } from "~/stores/store";
import { ProductStatus } from "~/types";
import type { IProduct, IStoresOnMap } from "~/types";

type PendingProduct = IProduct & { status: ProductStatus.STOCK_PENDING };

const store = useStore()
const { locale } = useI18n()

const stores = computed<IStoresOnMap[]>(() => {
  if(store.stores_on_map) {
    return store.stores_on_map
  } else {
    return [] as IStoresOnMap[]
  }
})

const orderProducts = computed<PendingProduct[]>(() => {
  if(store.products) return store.products.filter(item => item.status === "STOCK_PENDING")
  return [] as PendingProduct[]
})

watch(() => locale.value, (newLocale) => {
  store.updateStoresByLocale(newLocale);
}, { immediate: true });
</script>

<template>
  <v-main class="map pt-0">
    <Map :stores="stores" :order-products="orderProducts" />
  </v-main>
</template>

<style scoped>

</style>