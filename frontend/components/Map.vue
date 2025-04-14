<script setup lang="ts">
import { ref, shallowRef, defineProps } from 'vue';
import { useSettingsStore } from "~/stores/settings";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapClusterer,
  YandexMapMarker
} from 'vue-yandex-maps';
import type { YMap, VectorCustomizationItem, LngLatBounds } from '@yandex/ymaps3-types';
import type { IStoresOnMap } from "~/types";
import { YMapClusterer } from "@yandex/ymaps3-types/packages/clusterer";

interface IProps {
  stores: IStoresOnMap[];
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
    </yandex-map>
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
</style>
