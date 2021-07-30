<template>
  <div class="row">
    <div v-for="(category, index) in categories" :key="index">
      {{ category.title }} - {{ category.group }}
      <div v-for="(date, index2) in category.dates" :key="index2">
        {{ date.month }}- {{ date.year }}
      </div>
    </div>
    <stacked-chart-category-montly-component/>
  </div>
</template>

<script>

import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import StackedChartCategoryMontlyComponent from "./StackedChartCategoryMontlyComponent.vue";
import {range} from "../../service/utils";

export default {
  name: "CategoryByMonth.vue",
  components: {StackedChartCategoryMontlyComponent},
  setup() {
    const store = useStore()
    let chartDate = ref()
    let categories = computed(() => store.getters.sortedCategoryAggregatesMonthly)
    let getCategories = () => {
      store.dispatch('getCategoryAggregatesMonthly').then(_ => {
        let data = categories.value
        let minYear = Math.min(...data.map(value => Math.min(...value.dates.map(value2 => value2.year))))
        let maxYear = Math.max(...data.map(value => Math.max(...value.dates.map(value2 => value2.year))))
        let minMonth = Math.min(...data.map(value => Math.min(...value.dates.filter(value => value.year === minYear).map(value2 => value2.month))))
        let maxMonth = Math.max(...data.map(value => Math.max(...value.dates.filter(value => value.year === maxYear).map(value2 => value2.month))))
        let root = {}
        let labels = []
        let years = range(maxYear - minYear + 1, minYear)
        years.forEach(year =>{
          let months;
          if(year === minYear){
            months =range(12 - minMonth + 1, minMonth)
          }
          else if(year === maxYear){
            months = range(maxMonth, 1)
          } else {
            months = range(12,1)
          }
          months.forEach(month => labels.push(year + "-" + month))
        })
        root.labels = labels
        root.datasets = datasets: [
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
      })
    }
    let map
    onMounted(() => {
      getCategories()
    })
    return {categories, root};
  },
}
</script>
