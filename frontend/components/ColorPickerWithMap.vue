<script setup lang="ts">
import { ref, shallowRef } from "vue"
import { useSettingsStore } from "~/stores/settings";
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';
import { useI18n } from "vue-i18n";
import type { YMap, VectorCustomizationItem } from '@yandex/ymaps3-types';

interface IVariant {
  title: string,
  value: string
}

const settings_store = useSettingsStore()
const settings_map = settings_store.map
const { t } = useI18n()

const map = shallowRef<null | YMap>(null);
const customCustomization = shallowRef<VectorCustomizationItem[]>(JSON.parse(JSON.stringify(settings_map.customColors)));
const initialCustomization = shallowRef<VectorCustomizationItem[]>(JSON.parse(JSON.stringify(settings_map.initialColors)));
const newCustomization = shallowRef<VectorCustomizationItem[]>(customCustomization.value ?? []);

const center = settings_map.customCenter ?? settings_map.initialCenter

const color = ref<string>('#000000')
const mode = ref<string>('hexa')
const overlay = ref<boolean>(false)
const selectVariant = ref<string>('water')
const variants = ref<IVariant[]>([
  {
    title: t('variant_water'),
    value: 'water',
  },
  {
    title: t('variant_road'),
    value: 'road',
  },
  {
    title: t('variant_building'),
    value: 'building',
  },
  {
    title: t('variant_landscape'),
    value: 'landscape',
  },
])
const landscapeTags: readonly string[] = ['landscape', 'admin', 'land', 'transit'];

function saveOrDropChanges(type: 'save' | 'drop'): void {
  if(type === 'save') {
    settings_map.customColors = newCustomization.value
  } else {
    settings_map.customColors = null
  }
  overlay.value = false
}

watch([color, selectVariant], ([newColor, newVariant]) => {
  const tags =
      newVariant === 'landscape'
          ? landscapeTags
          : [newVariant];

  if (newColor && newVariant) {
    const existingCustomization = newCustomization.value.find((item) =>
        tags.some((tag) => item.tags.any.includes(tag))
    );

    if (existingCustomization) {
      existingCustomization.stylers[0].color = newColor;
    } else {
      newCustomization.value.push({
        tags: {
          any: tags,
        },
        elements: 'geometry',
        stylers: [
          {
            color: newColor,
          },
        ],
      });
    }
  }
});
</script>

<template>
  <div>
    <v-btn
        color="primary"
        @click="overlay = !overlay"
        class="text-none text-body-1"
        size="large"
    >
      {{ $t('open') }}
    </v-btn>

    <v-overlay v-model="overlay" class="d-flex align-center justify-center" scrim="primary">
      <v-container :max-width="630">
        <v-row>
          <v-col class="pr-md-0" cols="12" md="6">
            <div class="h-100">
              <v-color-picker
                  v-model="color"
                  v-model:mode="mode"
                  class=""
                  rounded="0"
              >
              </v-color-picker>
              <v-select
                  v-model="selectVariant"
                  :items="variants"
                  item-title="title"
                  item-value="value"
                  variant="solo"
                  rounded="0"
                  color="accent"
                  hide-details
              >

              </v-select>
            </div>
          </v-col>
          <v-col class="pl-md-0" cols="12" md="6">
            <div class="position-relative h-100">
              <yandex-map
                  v-model="map"
                  :settings="{
                    location: {
                      center,
                      zoom: 10,
                    },
                    theme: 'dark',
                    showScaleInCopyrights: true,

                  }"
                  width="100%"
                  height="384px"
                  class="rounded-lg"
              >
                <yandex-map-default-scheme-layer
                    :settings="{ customization: newCustomization }"
                    :key="JSON.stringify(color)"
                />
              </yandex-map>
            </div>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="6">
                <v-btn
                    class="text-none text-h6"
                    :ripple="false"
                    size="large"
                    block
                    color="primary"
                    @click="saveOrDropChanges('save')"
                >
                  {{ $t('save') }} {{ $t('changes') }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                    class="text-none text-h6"
                    :ripple="false"
                    variant="tonal"
                    size="large"
                    block
                    color="error"
                    @click="saveOrDropChanges('drop')"
                >
                  {{ $t('drop') }} {{ $t('changes') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>

  </div>
</template>

<style scoped>

</style>