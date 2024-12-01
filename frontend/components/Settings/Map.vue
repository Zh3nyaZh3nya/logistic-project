<script setup lang="ts">
import { ref } from "vue"
import { useSettingsStore } from "~/stores/settings";
import { useI18n } from "vue-i18n";
import {useDisplay} from "vuetify";

const settings_store = useSettingsStore()
const { t } = useI18n()
const { } = useDisplay()

const form = ref();
const longitude = ref<number | null>(Array.isArray(settings_store.map.customCenter) ? settings_store.map.customCenter[0] : null);
const latitude = ref<number | null>(Array.isArray(settings_store.map.customCenter) ? settings_store.map.customCenter[1] : null);
const zoom = ref<number | null>(settings_store.map.customZoom ?? null);

async function submitForm(): Promise<void> {
  const { valid } = await form.value.validate();

  if (valid || (zoom.value && !longitude.value && !latitude.value)) {
    const isUpdated = settings_store.updateMapSettings(
        longitude.value,
        latitude.value,
        zoom.value
    );

    if (!isUpdated) {
      console.error('Failed to update map settings');
    }
  } else {
    console.error('Form is invalid');
  }
}


function isLongitude(value: string | null): boolean | string {
  if (value === null) {
    if (latitude.value) return t('not_empty');
    return true;
  }
  if (value.length === 10) return true;
  return t('rule_is_longitude_1');
}

function isLatitude(value: string | null): boolean | string {
  if (value === null) {
    if (longitude.value) return t('not_empty');
    return true;
  }
  if (value.length === 10) return true;
  return t('rule_is_latitude_1');
}


function isZoom(value: string | null): boolean | string {
  if (value === null) return t('not_empty')
  if (Number(value) <= 25) return true
  if (Number(value) > 25) return t("rule_is_zoom_1")
  return t('rule_is_latitude_1')
}
</script>

<template>
  <v-form ref="form" @submit.prevent="submitForm">
    <v-row>
      <v-col cols="12" class="d-flex flex-column flex-md-row justify-md-space-between">
        <h2 class="text-body-1 text-md-h6 font-weight-medium mt-0 mt-md-3 mb-4 mb-md-0">{{ $t('settings_map_title_center')}}:</h2>
        <div class="d-flex flex-column flex-sm-row ga-4">
          <v-text-field
              v-model="longitude"
              variant="outlined"
              :label="$t('longitude')"
              v-mask="'##.#######'"
              :rules="[isLongitude]"
              min-width="177px"
              max-width="200px"
          />
          <v-text-field
              v-model="latitude"
              variant="outlined"
              :label="$t('latitude')"
              v-mask="'##.#######'"
              :rules="[isLatitude]"
              min-width="177px"
              max-width="200px"
          />
        </div>

      </v-col>
      <v-col cols="12" class="d-flex flex-column flex-md-row justify-md-space-between">
        <h2 class="text-body-1 text-md-h6 font-weight-medium mt-0 mt-md-3 mb-4 mb-md-0">{{ $t('settings_map_title_zoom')}}:</h2>
        <div class="d-flex ga-4">
          <v-text-field
              v-model="zoom"
              variant="outlined"
              :label="$t('zoom')"
              v-mask="'##'"
              :rules="[isZoom]"
              min-width="177px"
              max-width="200px"
          />
        </div>
      </v-col>

      <v-col cols="12" class="d-flex flex-column flex-sm-row justify-sm-space-between">
        <h2 class="text-body-1 text-md-h6 font-weight-medium mb-4 mb-md-0">{{ $t('settings_map_title_colors')}}:</h2>
        <div class="d-flex ga-4">
          <ColorPickerWithMap />
        </div>
      </v-col>
    </v-row>
    <div class="d-flex flex-column flex-sm-row ga-4 ga-md-8 justify-sm-end mt-16">
      <v-btn color="primary" size="large" elevation="0" class="text-none text-h6" type="submit">{{ $t('confirm') }}</v-btn>
      <v-btn
          class="text-none text-h6"
          variant="tonal"
          size="large"
          color="error"
          @click="
            settings_store.dropMapChanges(),
            longitude = null,
            latitude = null,
            zoom = null
          "
          elevation="0"
      >
        {{ $t('drop') }}
      </v-btn>
    </div>
  </v-form>
</template>

<style scoped>

</style>