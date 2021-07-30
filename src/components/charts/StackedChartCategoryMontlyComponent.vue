<template>
  <BarChart :chartData="testData" :options="options"/>
</template>

<script>
import {BarChart} from "vue-chart-3";
import {computed, ref} from "vue";

export default {
  components: {BarChart},
  props: ['chartData'],
  setup(props) {
    const dataValues = ref([30, 40, 60, 70, 5]);
    const toggleLegend = ref(true);
    const options = computed(() => ({
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      },
      plugins: {
        legend: {
          position: toggleLegend.value ? "top" : "bottom",
        },
        title: {
          display: true,
          text: "StakedBar",
        },
      },
    }));
    const testData = computed(() => ({
      labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
      datasets: [
        {
          data: [1, 1, 1 , 1 ,1],
          backgroundColor: [
            "#0A2F51",
            "#0E4D64",
            "#137177",
            "#188977",
            "#1D9A6C",
            "#39A96B",
            "#56B870",
            "#74C67A",
            "#99D492",
            "#BFE1B0",
            "#DEEDCF"
          ],
        },
        {
          data: [2, 2, 2 , 2 ,2],
          backgroundColor: [
            "#814C4A",
            "#A46E63",
            "#C6937D",
            "#E7BB98",
            "#EABBA3",
            "#EEBCAE",
            "#F1C0B9",
            "#F4C5C4",
            "#F6D0D4",
            "#F9DBE2"
          ],
        },
        {
          data: [3, 3, 3 , 3 ,3],
          backgroundColor: [
            "#503875",
            "#8352A3",
            "#BD70D1",
            "#F990FE",
            "#F2ABFF",
            "#F0C8FF",
            "#F5E6FF"
          ],
        }
      ],
    }));

    return { testData, options}
  }
}
</script>

<style scoped>

</style>
