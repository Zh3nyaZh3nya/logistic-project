<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue';
import { useSettingsStore } from '~/stores/settings';
import { useI18n } from 'vue-i18n';
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';
import { useDisplay } from "vuetify";

const settings_store = useSettingsStore();
const { t } = useI18n();
const { smAndUp } = useDisplay()

const map = shallowRef(null);
const color = ref<string>('#000000');
const overlay = ref<boolean>(false);
const selectVariant = ref<string>('water');
const drawer = ref<boolean>(true)
const rail = ref<boolean>(true)
const variants = ref<Record<string, string>[]>([
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
]);
const landscapeTags: readonly string[] = ['landscape', 'admin', 'land', 'transit'];

watch([color, selectVariant], ([newColor, newVariant]) => {
  const tags = newVariant === 'landscape' ? [...landscapeTags] : [newVariant];
  if (newColor && newVariant) {
    settings_store.updateCustomization(newColor, newVariant, tags);
  }
});
</script>

<template>
  <div class="color-picker">
    <v-btn
        color="primary"
        @click="overlay = !overlay"
        class="text-none text-body-1"
        size="large"
    >
      {{ $t('open') }}
    </v-btn>
    <v-overlay
        v-model="overlay"
        :opacity="smAndUp ? .5 : 1"
        :content-class="smAndUp ? '' : 'w-100 h-100 d-flex align-center'"
        class="d-flex align-center justify-center"
        scrim="background"
    >
      <header class="position-absolute top-0 right-0 mt-3 mr-3">
        <v-icon icon="mdi-close" @click="overlay = !overlay"></v-icon>
      </header>
      <v-container class="mx-0 px-0" :max-width="630">
        <v-row v-if="smAndUp">
          <v-col class="pr-sm-0" cols="12" sm="6">
            <div class="h-100">
              <v-color-picker
                  v-model="color"
                  :modes="['hexa']"
                  class="rounded-ts-lg"
              />
              <v-select
                  v-model="selectVariant"
                  :items="variants"
                  item-title="title"
                  item-value="value"
                  variant="solo"
                  color="accent"
                  hide-details
                  width="100%"
                  class="rounded-bs-lg elevation-0"
              />
            </div>
          </v-col>
          <v-col class="pl-sm-0" cols="12" sm="6">
            <div class="position-relative h-100">
              <yandex-map
                  v-model="map"
                  :settings="{
                    location: {
                      center: settings_store.currentCenter,
                      zoom: 11,
                    },
                    theme: 'dark',
                    showScaleInCopyrights: true,
                  }"
                  width="100%"
                  height="384px"
                  class="map"
              >
                <yandex-map-default-scheme-layer
                    :settings="{ customization: JSON.parse(JSON.stringify(settings_store.currentCustomization)) }"
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
                    size="x-large"
                    block
                    color="primary"
                    @click="settings_store.saveOrDropChangesColors('save')"
                    elevation="0"
                >
                  {{ $t('save') }} {{ $t('changes') }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                    class="text-none text-h6"
                    :ripple="false"
                    variant="tonal"
                    size="x-large"
                    block
                    color="error"
                    @click="settings_store.saveOrDropChangesColors('drop')"
                    elevation="0"
                >
                  {{ $t('drop') }} {{ $t('changes') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="position-relative color-picker-mobile"  v-else>
          <v-btn
              @click="rail = !rail"
              class="picker-custom-button px-0 transition-transform"
              :class="!rail ? 'picker-custom-button-left' : 'picker-custom-button-right'"
              variant="text"
              color="accent"
              :ripple="false"
          >
            <v-icon
                icon="mdi-chevron-left"
                class="transition-transform"
                :class="{ rotated: !rail }"
            ></v-icon>
          </v-btn>
          <div
            class="sheet position-relative border-0 left-0 d-flex flex-column align-center justify-center transition-width"
            :class="[rail ? 'active expanded' : 'collapsed']"
          >
            <div v-show="rail" class="">
              <v-color-picker
                  v-model="color"
                  :modes="['hexa']"
                  class="rounded-0"
              />
              <v-select
                  v-model="selectVariant"
                  :items="variants"
                  item-title="title"
                  item-value="value"
                  variant="solo"
                  color="accent"
                  hide-details
                  width="300"
                  class="rounded-bs-lg elevation-0"
              />
            </div>

            <v-row class="mt-2">
              <v-col cols="12" md="6" class="pb-0 d-flex justify-center">
                <v-btn
                    class="text-none text-subtitle-2"
                    :ripple="false"
                    color="primary"
                    @click="settings_store.saveOrDropChangesColors('save')"
                    elevation="0"
                >
                  {{ $t('save') }} {{ $t('changes') }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" class="d-flex justify-center">
                <v-btn
                    class="text-none text-subtitle-2"
                    :ripple="false"
                    variant="tonal"
                    color="error"
                    @click="settings_store.saveOrDropChangesColors('drop')"
                    elevation="0"
                >
                  {{ $t('drop') }} {{ $t('changes') }}
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <div
              class="sheet position-relative bg-transparent border-0 left-0 transition-width"
              :class="[!rail ? 'active expanded' : 'collapsed']"
          >
            <yandex-map
                  v-model="map"
                  :settings="{
                    location: {
                      center: settings_store.currentCenter,
                      zoom: 11,
                    },
                    theme: 'dark',
                    showScaleInCopyrights: true,
                  }"
                  width="100%"
                  height="384px"
                  class="map"
              >
                <yandex-map-default-scheme-layer
                    :settings="{ customization: JSON.parse(JSON.stringify(settings_store.currentCustomization)) }"
                />
              </yandex-map>
          </div>
        </v-row>
      </v-container>
    </v-overlay>
  </div>
</template>

<style lang="scss">
.color-picker {
  .map {
    canvas {
      border-radius: 0 8px 8px 0 !important;
    }
  }
}

.color-picker-mobile {
  .picker-custom-button {
    position: absolute;
    z-index: 99999999999;
    right: 0;
    top: 40%;
    transform: rotateY(50%);
    min-width: unset;
    width: 40px;
    height: 80px !important;
    background: rgb(var(--v-theme-background));
    padding-right: 8px !important;
    &-left {
      padding-right: unset !important;
      padding-left: 8px !important;
      right: unset;
      left: 0;
    }
  }

  .transition-width {
    transition: all 0.5s ease;
  }

  .sheet.active.expanded {
    width: 100%;
    opacity: 1;
  }

  .sheet.collapsed {
    width: 0;
    opacity: 0;
  }

  .transition-transform {
    transition: transform 0.5s ease;
  }

  .picker-custom-button-left {
    transform: translateX(0px);
  }

  .picker-custom-button-right {
    transform: translateX(0);
  }

  .rotated {
    transform: rotate(180deg);
  }
}


</style>