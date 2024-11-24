<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useSettingsStore } from "~/stores/settings";
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';
import type { YMap, VectorCustomizationItem } from '@yandex/ymaps3-types';

const settings_store = useSettingsStore()
const settings_map = settings_store.map

const map = shallowRef<null | YMap>(null);
const customization = shallowRef<VectorCustomizationItem[]>(
    JSON.parse(JSON.stringify(settings_map.customColors ?? settings_map.initialColors))
);
const center = settings_map.customCenter ?? settings_map.initialCenter
const zoom = settings_map.customZoom ?? settings_map.initialZoom
onMounted(() => console.log(customization.value))
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
      <yandex-map-default-scheme-layer :settings="{ customization: customization, }"/>
    </yandex-map>
  </div>

</template>

<style lang="scss">

</style>