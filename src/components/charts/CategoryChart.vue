<template>
  <div class="row">
    <doughnut-component v-if="categories != null && categories.length > 0" :categories="categories" />
  </div>
</template>

<script>

import {DoughnutChart} from 'vue-chart-3';
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import DoughnutComponent from './DoughnutComponent.vue'

export default {
  name: "CategoryChart.vue",
  components: {DoughnutChart, DoughnutComponent},
  setup() {
    const store = useStore()

    let categories = computed(() => store.getters.sortedCategoryAggregates)
    let getCategories = () => {
      store.dispatch('getCategoryAggregates')
    }
    onMounted(() => {
      getCategories()
    })
    return {categories};
  },
}
</script>

<style scoped>

</style>
