<script setup lang="ts">
import { ref } from "vue"
import { useSettingsStore } from "~/stores/settings";

const settings_store = useSettingsStore()
const settings_map = settings_store.map

const longitude = ref<number | null>(null);
const latitude = ref<number | null>(null);
const zoom = ref<number | null>(null);

const rangeRule = (value: number) => {
  if (value === null) return true;
  return value >= 0 && value <= 25 || 'Value must be between 0 and 25';
};
</script>

<template>
  <v-form>
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-space-between">
        <h2 class="text-h6 font-weight-medium">{{ $t('settings_map_title_center')}}:</h2>
        <div class="d-flex ga-4">
          <v-text-field
              v-model="longitude"
              variant="outlined"
              :label="$t('longitude')"
              :hide-details="true"
              v-mask="'###.######'"
              min-width="130px"
          />
          <v-text-field
              v-model="latitude"
              variant="outlined"
              :label="$t('latitude')"
              :hide-details="true"
              v-mask="'###.######'"
              min-width="130px"
          />
        </div>

      </v-col>
      <v-col cols="12" class="d-flex align-center justify-space-between">
        <h2 class="text-h6 font-weight-medium">{{ $t('settings_map_title_zoom')}}:</h2>
        <div class="d-flex ga-4">
          <v-text-field
              v-model="zoom"
              variant="outlined"
              :label="$t('zoom')"
              :hide-details="true"
              v-mask="'##'"
              min-width="276px"
              :rules="[rangeRule]"
          />
        </div>
      </v-col>

      <v-col cols="12" class="d-flex align-center justify-space-between">
        <h2 class="text-h6 font-weight-medium">{{ $t('settings_map_title_colors')}}:</h2>
        <div class="d-flex ga-4">
          <ColorPickerWithMap />
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>

</style>