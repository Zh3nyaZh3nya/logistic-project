<script setup lang="ts">
import { ref } from "vue"
import { getStatusColor } from "~/utils/getStatusColor"
import type { IProduct, ITableHeader } from "~/types";

interface IProps {
  table: IProduct[]
}

const props = defineProps<IProps>()
const { t } = useI18n()

const header = ref<ITableHeader[]>([
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
    title: t('title_table_header_product'),
    align: "center",
    sortable: false,
    key: 'title',
    width: "200px"
  },
  {
    title: t('short_desc'),
    align: "center",
    sortable: false,
    key: 'short_desc'
  },
  {
    title: t('status'),
    align: "center",
    sortable: true,
    key: 'status'
  },
  {
    title: t('category'),
    align: "center",
    sortable: true,
    key: 'category'
  },
  {
    title: t('price'),
    align: "center",
    sortable: true,
    key: 'price'
  },
  {
    title: t('count'),
    align: "center",
    sortable: true,
    key: 'count'
  },
  {
    title: t('sell_count'),
    align: "center",
    sortable: true,
    key: 'sell_count'
  },
  {
    title: t('send_count'),
    align: "center",
    sortable: true,
    key: 'send_count'
  },
  {
    title: t('arrive_count'),
    align: "center",
    sortable: true,
    key: 'arrive_count'
  },
  {
    title: t('time_arrive'),
    align: "center",
    sortable: true,
    key: 'time_arrive'
  },
  {
    title: t('time_send'),
    align: "center",
    sortable: true,
    key: 'time_send'
  },
])
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
        <v-img :src="item.photo" :min-width="140" class="my-4" rounded="lg" cover />
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
            :color="getStatusColor(item.status)"
            class="w-100 d-flex justify-center font-weight-bold"
        >
          {{ $t(item.status) }}
        </v-chip>
      </template>
      <template v-slot:item.price="{ item }">
        <span>{{ item.price }} {{ item.currency }}</span>
      </template>
      <template v-slot:item.time_arrive="{ item }">
        <span>{{ item.time_arrive ?? $t('no-data') }}</span>
      </template>
      <template v-slot:item.time_send="{ item }">
        <span>{{ item.time_send ?? $t('no-data') }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<style lang="scss">
.custom-table {

}
</style>

