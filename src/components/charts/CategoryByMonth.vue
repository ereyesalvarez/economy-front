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
        root.labels = range(maxYear - minYear + 1, minYear)
      })
    }
    let map
    onMounted(() => {
      getCategories()
    })
    return {categories};
  },
}
</script>
