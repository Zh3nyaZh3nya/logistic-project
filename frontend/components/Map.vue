<script setup lang="ts">
import { shallowRef } from 'vue'
import { useSettingsStore } from "~/stores/settings";
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';
import type { YMap, VectorCustomizationItem } from '@yandex/ymaps3-types';

const settings_store = useSettingsStore()

const map = shallowRef<null | YMap>(null);
const customization = shallowRef<VectorCustomizationItem[]>(settings_store.currentCustomization)
const center = shallowRef(settings_store.currentCenter)
const zoom = shallowRef(settings_store.currentZoom)
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
      <yandex-map-default-scheme-layer :settings="{ customization: JSON.parse(JSON.stringify(customization)), }"/>
    </yandex-map>
  </div>
</template>

<style lang="scss">

</style>