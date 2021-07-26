<template>
  <div class="row">
    <div class="col-sm">
      <h3>Categorias</h3>
    </div>
    <div class="col-sm">
      <button :disabled="selectedCategoryId === ''" class="tertiary" @click="onAssignCategory">Asignar</button>
    </div>
  </div>
  <div class="row">
    <div class="col-sm">
      <div class="card fluid">
        <div v-for="(category, index) in categories" :key="index" :class="{ dark: category.id===selectedCategoryId }"
             class="section" @click="onClickCategory(category.id)">
          {{ category.title }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import {useStore} from "vuex";
import {computed, ref} from "vue";

export default {
  emits: ['assignCategory'],
  setup(props, context) {
    const store = useStore()
    let categories = computed(() => store.getters.sortedCategories)
    let selectedCategoryId = ref("")
    let onClickCategory = (categoryId) => {
      if (categoryId === selectedCategoryId.value) {
        selectedCategoryId.value = ""
      } else {
        selectedCategoryId.value = categoryId
      }
    }
    let onAssignCategory = () => {
      if(selectedCategoryId.value !== "" ){
        context.emit('assignCategory', selectedCategoryId.value)
      }
    }
    return {categories, selectedCategoryId, onClickCategory, onAssignCategory}
  },
}
</script>


<style scoped>

</style>
