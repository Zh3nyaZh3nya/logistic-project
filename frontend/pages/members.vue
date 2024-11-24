<script setup lang="ts">
import { ref } from "vue";
import { useApi } from "~/composables/api";
import type { ITable } from "~/types";

const { $api } = useApi()

const { data, status, pending, refresh } = await useAsyncData('membersPage',  async () => {
  const asd = $api('/members')

  return { asd }
})

const columnData = ref<ITable>({
  header: {
    data: [
      {
        id: 1,
        title: 'Фото'
      },
      {
        id: 2,
        title: 'Ф.И.О'
      },
      {
        id: 3,
        title: 'Должность'
      },
      {
        id: 4,
        title: 'График Работы'
      },
      {
        id: 5,
        title: 'В отпуске'
      },
      {
        id: 6,
        title: 'Зарплата'
      }
    ]
  },
  content: {
    data: [
      {
        id: 1,
        photo: '',
        full_name: '',
        position: '',
        schedule: '',
        holiday: false,
        salary: 300000,
      },
      {
        id: 1,
        photo: '',
        full_name: '',
        position: '',
        schedule: '',
        holiday: false,
        salary: 300000,
      },
    ]
  }
})

</script>

<template>
  <v-main>
    <section class="table-section">
      <v-container class="px-0">
        <h1 class="mb-4 text-center">{{ $t('table_page_title') }}</h1>
        <Table :table="columnData" />
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>