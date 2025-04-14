<script setup lang="ts">
import type { IMember, ITableHeader } from "~/types";

const { t } = useI18n()

interface IProps {
  table: IMember[]
}

const props = defineProps<IProps>()

const header: ITableHeader[] = [
  {
    title: "№",
    align: "center",
    sortable: true,
    key: 'id',
  },
  {
    title: t('photo'),
    align: "center",
    sortable: false,
    key: 'photo'
  },
  {
    title: t('full_name'),
    align: "center",
    sortable: false,
    key: 'full_name'
  },
  {
    title: t('position'),
    align: "center",
    sortable: false,
    key: 'position'
  },
  {
    title: t('holiday'),
    align: "center",
    sortable: true,
    key: 'holiday'
  },
  {
    title: t('salary'),
    align: "center",
    sortable: true,
    key: 'salary'
  },
]
</script>

<template>
  <v-card class="bordered-table rounded-t-0">
    <v-data-table
        :items="table"
        :fixed-header="true"
        :headers="header"
        :hide-default-footer="true"
        :no-data-text="$t('no-data')"
    >
      <template v-slot:item.photo="{ item }">
        <v-img v-if="item.photo" :src="item.photo" :min-width="140" class="my-4" rounded="lg" cover />
        <v-icon v-else icon="mdi-account-hard-hat-outline"></v-icon>
      </template>
      <template v-slot:item.holiday="{ item }">
        <p v-if="item.holiday">
          {{ $t('on_holiday') }}
          <v-icon icon="mdi-palm-tree"></v-icon>
        </p>
        <p v-else>
          {{ $t('on_work') }}
          <v-icon icon="mdi-briefcase-outline"></v-icon>
        </p>
      </template>
      <template v-slot:item.salary="{ item }">
        <p>{{ (item.salary).toLocaleString('ru-RU') }} ₸ / {{ $t('in_month') }}</p>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>

</style>