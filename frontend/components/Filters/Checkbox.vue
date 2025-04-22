<script setup lang="ts" generic="T extends string">
import { computed } from "vue";

const props = defineProps<{
  items: {
    title: string,
    value: string
  }[];
  modelValue: T[] | null;
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[] | null): void
}>()

const model = computed<string[] | null>({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value ?? [])
  }
})
</script>

<template>
  <div class="сheckbox-filters">
    <h3 class="text-h6">{{ title }}</h3>
    <v-checkbox
        v-for="item in items"
        :key="item.title"
        :value="item.value"
        :hide-details="true"
        v-model="model"
        color="accent"
    >
      <template #label>
        <span>{{ $t(`${item.title}`) }}</span>
      </template>
    </v-checkbox>
  </div>
</template>

<style lang="scss">
.сheckbox-filters {
  .v-checkbox .v-selection-control {
    min-height: 30px;
    display: flex;
    gap: 8px;
  }
  .v-selection-control--density-default {
    --v-selection-control-size: 30px;
  }
  .v-icon--size-default {
    font-size: 19px;
  }
  .v-selection-control__input, .v-selection-control__wrapper {
    width: 15px;
    height: 25px;
  }
}
</style>