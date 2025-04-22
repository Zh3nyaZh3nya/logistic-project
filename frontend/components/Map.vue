<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { useSettingsStore } from "~/stores/settings";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapClusterer,
  YandexMapMarker
} from 'vue-yandex-maps';
import { YMapClusterer } from "@yandex/ymaps3-types/packages/clusterer";
import { ProductStatus } from "~/types";
import type { YMap, VectorCustomizationItem, LngLatBounds } from '@yandex/ymaps3-types';
import type { IProduct, IStoresOnMap } from "~/types";

type PendingProduct = IProduct & { status: ProductStatus.STOCK_PENDING };

interface IProps {
  stores: IStoresOnMap[];
  orderProducts: PendingProduct[];
}

const props = defineProps<IProps>();

const settings_store = useSettingsStore();

const map = shallowRef<null | YMap>(null);
const customization = shallowRef<VectorCustomizationItem[]>(settings_store.currentCustomization);
const center = shallowRef(settings_store.currentCenter);
const zoom = shallowRef(settings_store.currentZoom);
const clusterer = shallowRef<YMapClusterer | null>(null);
const trueBounds = ref<LngLatBounds>([
  [0, 0],
  [0, 0],
]);
const filtersMap = ref<['stores', 'arriving-cars'] | []>([])
const hideFilters = ref<boolean>(false)
</script>

<template>
  <div class="position-relative h-100" v-if="center && zoom && customization">
    <yandex-map
        v-model="map"
        :settings="{
          location: {
            center,
            zoom,
          },
          theme: 'dark',
          showScaleInCopyrights: true,
        }"
        width="100%"
        height="100%"
    >
      <yandex-map-default-scheme-layer
          :settings="{
          customization: JSON.parse(JSON.stringify(customization)),
        }"
      />

      <yandex-map-default-features-layer />

      <yandex-map-clusterer
          v-if="!filtersMap.includes('stores')"
          zoom-on-cluster-click
          v-model="clusterer"
          :grid-size="2 ** 6"
          @trueBounds="trueBounds = $event"
      >
        <yandex-map-marker
            v-for="(store, index) in stores"
            :key="index"
            :settings="{
              coordinates: store.coords,
              icon: {
                layout: 'default#image',
                imageSize: [40, 40],
                imageOffset: [-20, -20],
              },
            }"
        >
          <nuxt-link :to="store.status === 'ACTIVE' ? `/stores/${store.id}` : ''">
            <div class="marker cursor-pointer">
              <div class="marker-icon">
                <v-icon icon="mdi-warehouse" size="25"></v-icon>
              </div>
              <div class="marker-text d-flex align-center justify-center">
                {{ store.title }}
              </div>
            </div>
          </nuxt-link>
        </yandex-map-marker>
        <template #cluster="{ length }">
          <div class="cluster fade-in text-h6 font-weight-medium cursor-pointer">
            {{ length }}
          </div>
        </template>
      </yandex-map-clusterer>

      <yandex-map-clusterer
          v-if="!filtersMap.includes('arriving-cars')"
          zoom-on-cluster-click
          v-model="clusterer"
          :grid-size="2 ** 6"
          @trueBounds="trueBounds = $event"
      >
        <yandex-map-marker
            v-for="(product, index) in orderProducts"
            :key="index"
            :settings="{
              coordinates: product?.current_coords_driver || [0, 0],
              icon: {
                layout: 'default#image',
                imageSize: [40, 40],
                imageOffset: [-20, -20],
              },
            }"
        >
          <div class="marker-driver cursor-pointer">
            <div class="marker-icon">
              <v-icon icon="mdi-truck-delivery-outline" size="25"></v-icon>
            </div>
            <div class="marker-driver-text d-flex flex-column">
              <p>
                {{ $t('product') }}: {{ product.title }}
              </p>
              <p>
                {{ $t('arriving_count') }}: {{ product.arrive_count }}
              </p>
              <p>
                {{ $t('price') }}: {{ product.price + ' ' + product.currency }}
              </p>
              <p>
                {{ $t('time_arrive') }}: {{ product.time_arrive }}
              </p>
              <p>
                {{ $t('store') }}: {{ stores.find(item => item.id === product.store_id)?.title }}
              </p>
            </div>
          </div>
        </yandex-map-marker>
        <template #cluster="{ length }">
          <div class="cluster fade-in text-h6 font-weight-medium cursor-pointer">
            {{ length }}
          </div>
        </template>
      </yandex-map-clusterer>
    </yandex-map>

    <div class="filters-map" :class="{'filters-map-hide': hideFilters}">
      <button class="filters-map-button" @click="hideFilters = !hideFilters">
        <v-icon :icon="hideFilters ? 'mdi-chevron-left' : 'mdi-chevron-right'" />
      </button>
      <div
          v-show="!hideFilters"
          class="filters-map-content"
      >
        <FiltersCheckbox
            :items="[
              { title: $t('hide_stores'), value: 'stores' },
              { title: $t('hide_arriving_cars'), value: 'arriving-cars' }
            ]"
            v-model="filtersMap"
            :title="$t('filters')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.marker {
  transform: translate(-50%, -50%);
  border-radius: 180px;

  &-icon {
    align-items: center;
    background: #fff;
    border-radius: 180px;
    box-shadow: 0 4px 4px #00000040;
    display: flex;
    height: 40px;
    justify-content: center;
    padding: 8px;
    position: relative;
    transition: all 0.3s;
    width: 40px;
    z-index: 1;

  }
  &:hover .marker-icon {
    background-color: rgb(var(--v-theme-accent));
    color: white;
  }

  &:hover .marker-text {
    max-width: none;
    opacity: 1;
    padding-left: 52px;
  }

  &-text {
    position: absolute;
    top: 0;
    background: rgb(var(--v-theme-primary));
    border-radius: 180px;
    height: 40px;
    left: 3px;
    max-width: 0;
    opacity: 0;
    padding-right: 20px;
    transition: all 0.3s;
    color: white;
    white-space: nowrap;
    overflow: hidden;
  }
}

.marker-driver {

  &-text {
    position: absolute;
    bottom: 55px;
    left: 50%;
    transform: translateX(-50%);
    background: rgb(var(--v-theme-primary));
    border-radius: 12px;
    max-width: 1000px;
    opacity: 0;
    padding: 8px;
    font-size: 14px;
    transition: all 0.3s;
    color: white;
    white-space: nowrap;
    overflow: hidden;
  }

  &:hover .marker-driver-text {
    opacity: 1;
  }

  &:hover .marker-icon {
    background-color: rgb(var(--v-theme-accent));
    color: white;
  }
}

.cluster {
  align-items: center;
  background: #fff;
  border-radius: 180px;
  box-shadow: 0 4px 4px #00000040;
  display: flex;
  height: 40px;
  justify-content: center;
  padding: 8px;
  position: relative;
  transition: all 0.3s;
  width: 40px;
  z-index: 1;

  &:hover {
    background-color: rgb(var(--v-theme-accent));
    color: white;
  }
}

.filters-map {
  background: rgb(18 18 18 / 89%) !important;
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 12px 16px;
  border-radius: 12px;
  @media (max-width: 960px) {
    top: 85px;
    right: 5px;
  }
  &-hide {
    background: transparent !important;
    .filters-map-button {
      left: 0 !important;
    }
  }
  &-button {
    position: absolute;
    top: 0;
    left: -45px;
    background: rgb(18 18 18 / 89%) !important;
    height: 40px;
    width: 40px;
    border-radius: 8px;
  }
}
</style>
