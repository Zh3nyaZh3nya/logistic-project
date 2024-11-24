<script setup lang="ts">
import type { ITable } from "~/types";

interface IProps {
  table: ITable
}

const props = defineProps<IProps>()
</script>

<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left" v-for="(header, index) in table.header.data" :key="header.id">
        {{ header.title }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(content, index) in table.content.data"
        :key="content.id"
    >
      <td>{{ content.photo }}</td>
      <td>{{ content.full_name }}</td>
      <td>{{ content.position }}</td>
      <td>{{ content.schedule }}</td>
      <td>{{ content.holiday }}</td>
      <td>{{ content.salary }}</td>
    </tr>
    </tbody>
  </v-table>

</template>

<style scoped>

</style>