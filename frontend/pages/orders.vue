<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "~/stores/store";
import { useI18n } from "vue-i18n";
import { useLocalePath } from "#i18n";
import type { IProduct } from "~/types";

const store = useStore()
const { locale } = useI18n();
const localePath = useLocalePath()

const products = computed<IProduct[]>(() => {
  return store.products.filter((item) => item.status === 'STOCK_PENDING')
})

watch(() => locale.value, (newLocale) => {
  store.updateStoresByLocale(newLocale);
}, { immediate: true });

</script>

<template>
  <v-main>
    <section>
      <v-container>
        <v-btn :to="localePath('/')" variant="text" class="px-0 mb-4 text-none text-body-1">
          <v-icon icon="mdi-arrow-left" class="mr-2"></v-icon>
          <span>{{ $t('back-to-back') }}</span>
        </v-btn>
        <div class="d-flex flex-wrap align-center justify-space-between">
          <h1>{{ $t('title-orders') }}</h1>
          <v-btn :to="localePath('/map')" variant="text" class="px-0 text-none text-body-1">
            <span>{{ $t('go-to-map') }}</span>
            <v-icon icon="mdi-arrow-right" class="ml-2"></v-icon>
          </v-btn>
        </div>
        <div class="d-flex ga-1">
          <p>{{ $t('price-for-all-count') }}: </p>
          <p>
            {{
              products.reduce((acc, item) => {
                  return acc + (item.price * item.count)
              }, 0).toFixed(2) + ' ' + products[0].currency
            }}
          </p>
        </div>
      </v-container>
    </section>
    <section>
      <v-container>
        <TableProducts :table="products" :type="'pending'" class="mb-8" />
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>