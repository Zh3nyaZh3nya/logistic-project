<script setup lang="ts">
import { ref } from "vue"
import { useLocalePath } from "#i18n";
import { useStore } from "~/stores/store";
import { useRoute } from "vue-router";
import type { IProduct, IStores } from "~/types";
import type { ApexOptions } from "apexcharts";

const { t, locale } = useI18n()
const localePath = useLocalePath()
const store = useStore()
const route = useRoute()

const storeData = ref<IStores>({coords: [0, 0], id: 0, products: [], status: 'ACTIVE', title: "", work_time: "ПН-ПН 11:11-11:12"})
const products = ref<IProduct[]>([])
const tab = ref<string | null>(null)
const optionsFirstChart = ref<ApexOptions>({
  labels: [t('count'), t('sell_count'), t('send_count'), t('arrive_count'),]
})
const optionsSecondChart = ref<ApexOptions>({
  labels: [t('STOCK_PENDING'), t('NOT_AVAILABLE'), t('SELL'), t('SEND'), t('ARRIVED')]
})

const seriesFirstChart = computed((): number[] | undefined => {
  if (products.value.length > 0) {
    const totals = {
      count: 0,
      arrive_count: 0,
      sell_count: 0,
      send_count: 0,
    };

    products.value.forEach((item: IProduct) => {
      totals.count += item.count;
      totals.arrive_count += item.arrive_count;
      totals.sell_count += item.sell_count;
      totals.send_count += item.send_count;
    });

    return [totals.count, totals.arrive_count, totals.sell_count, totals.send_count];
  }
  return undefined;
});

const seriesSecondChart = computed((): number[] | undefined => {
  if (products.value.length > 0) {
    const counts: Record<string, number> = {};

    products.value.forEach((item: IProduct) => {
      const status = item.status;
      counts[status] = (counts[status] || 0) + 1;
    });

    return Object.values(counts);
  }
  return undefined;
});

watch(() => locale.value, (newLocale) => {
  store.updateStoresByLocale(newLocale);
}, { immediate: true });

onMounted(() => {
  if (store.stores) {
    const foundStore: IStores = store.GET_STORE(Number(route.params.id));
    const foundProducts: IProduct[] = store.GET_STORE_PRODUCTS(Number(route.params.id));
    if (foundStore) {
      storeData.value = foundStore;
    }
    if (foundProducts) {
      products.value = foundProducts
    }
  }
});
</script>

<template>
  <v-main>
    <section class="mt-4">
      <v-container>
        <v-btn :to="localePath('/stores')" variant="text" class="px-0 mb-4 text-none text-body-1">
          <v-icon icon="mdi-arrow-left" class="mr-2"></v-icon>
          <span>{{ $t('back-to-back') }}</span>
        </v-btn>
        <div class="d-flex align-center justify-space-between">
          <h1 class="mb-4">{{ $t('store')}}: {{ storeData.title }}</h1>
          <div class="d-flex ga-4">
            <p class="text-h6">{{ $t('earn_money') }}: {{ storeData.earn_money }}$</p>
            <p class="text-h6">{{ $t('money') }}: {{ storeData.money }}$</p>
          </div>
        </div>
        <v-tabs
          v-model="tab"
          bg-color="primary"
          class="rounded-t-lg"
        >
          <v-tab class="text-none text-h6" value="products">
            {{ $t('products') }}
          </v-tab>
          <v-tab class="text-none text-h6" value="members">
            {{ $t('members') }}
          </v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="products">
            <TableProducts :table="products" class="mb-8" />

            <v-row>
              <v-col cols="12" md="6">
                <Chart
                    :title="$t('title_product_chart_1')"
                    type="pie"
                    :width="500"
                    :chart-options="optionsFirstChart"
                    :series="seriesFirstChart"
                />
              </v-col>
              <v-col cols="12" md="6" class="d-flex justify-end">
                <Chart
                    :title="$t('title_product_chart_2')"
                    type="pie"
                    :width="500"
                    :chart-options="optionsSecondChart"
                    :series="seriesSecondChart"
                />
              </v-col>
            </v-row>

          </v-tabs-window-item>

          <v-tabs-window-item value="members">
            Two
          </v-tabs-window-item>
        </v-tabs-window>
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>