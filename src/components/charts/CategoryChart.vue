<template>
  <div class="row">
    <DoughnutChart :chartData="testData" />
  </div>
</template>

<script>

import {DoughnutChart} from 'vue-chart-3';
import {computed, onMounted} from "vue";
import {useStore} from "vuex";


export default {
  name: "CategoryChart.vue",
  components: {DoughnutChart},
  setup() {
    const store = useStore()

    let categories = computed(() => store.getters.sortedCategoryAggregates)
    let getCategories = () => {
      store.dispatch('getCategoryAggregates')
    }
    const testDataOld = {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    };


    const testData = {
      labels: categories.value.map(value => value.title),
      datasets: [
        {
          data: categories.value.map(value => value.amount),
          backgroundColor:
              ["#C591F2","#C294EE","#C097E9","#BD99E5","#BB9CE0","#B89FDC","#B5A2D7","#B3A5D3","#B0A8CE","#ADAACA","#ABADC6","#A8B0C1","#A6B3BD","#A3B6B8","#A0B9B4","#9EBBAF","#9BBEAB","#98C1A6","#96C4A2","#93C79D","#91CA99","#8ECC95","#8BCF90","#89D28C","#86D587","#83D883","#81DB7E","#7EDD7A","#7CE075","#79E371"]
        },
      ],
    };
    onMounted(() => {
      getCategories()
    })
    return {testData};
  },
}
</script>

<style scoped>

</style>
