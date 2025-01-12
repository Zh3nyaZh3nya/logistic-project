<script setup lang="ts">
import type { ApexOptions } from "apexcharts";
import { computed } from "vue";

interface IProps {
  title: string
  type: "line" | "bar" | "area" | "pie" | "donut" | "radar";
  width: string | number;
  height: string | number;
  chartOptions: ApexOptions;
  series: Array<{ name: string; data: number[] }>;
}

const props = defineProps<IProps>();

const chartColors = {
  seriesColors: [
    '#1A3E5F',  // Основной темно-синий
    '#8DA1B4',  // Второстепенный серый
    '#F57C00',  // Оранжевый
    '#4CAF50',  // Зеленый
    '#FFC107',  // Желтый
    '#FF5252',  // Красный
    '#2196F3',  // Синий
    '#B0BEC5',  // Светло-серый
  ],
  background: '#121212',   // Темный фон
  grid: '#2C2C2C',         // Темно-серый для сетки
  text: '#E0E0E0',         // Светло-серый текст для темного фона
  axis: '#B0BEC5',         // Цвет осей
  hover: '#F57C00',        // Цвет для наведения
};


const computedChartOptions = computed((): ApexOptions => {
  return {
    ...props.chartOptions,
    chart: {
      ...props.chartOptions.chart,
      background: chartColors.background,
      foreColor: chartColors.text,
    },
    colors: chartColors.seriesColors,
    grid: {
      ...props.chartOptions.grid,
      borderColor: chartColors.grid,
    },
    xaxis: {
      ...props.chartOptions.xaxis,
      labels: {
        ...props.chartOptions.xaxis?.labels,
        style: {
          ...props.chartOptions.xaxis?.labels?.style,
          colors: chartColors.axis,
        },
      },
      axisBorder: {
        ...props.chartOptions.xaxis?.axisBorder,
        color: chartColors.axis,
      },
      axisTicks: {
        ...props.chartOptions.xaxis?.axisTicks,
        color: chartColors.axis,
      },
    },
    yaxis: {
      ...props.chartOptions.yaxis,
      labels: {
        ...props.chartOptions.yaxis?.labels,
        style: {
          ...props.chartOptions.yaxis?.labels?.style,
          colors: chartColors.axis,
        },
      },
    },
    tooltip: {
      ...props.chartOptions.tooltip,
      theme: 'dark',
    },
  };
});

</script>

<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-6">{{ title }}</h2>
    <div id="chart">
      <apexchart
          :type="type"
          :width="width || '100%'"
          :height="height || 500"
          :options="computedChartOptions"
          :series="series"
      />
    </div>
  </div>
</template>