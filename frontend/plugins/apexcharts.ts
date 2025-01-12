import { defineNuxtPlugin } from 'nuxt/app';
import VueApexCharts from 'vue3-apexcharts';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueApexCharts);
});
