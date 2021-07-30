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
    <div class="col-sm" >

      <div class="collapse">
        <template  v-for="(group, key) in grouped" :key="key">
          <input :id="'accordion-section' + key"
                 aria-hidden="true" checked name="accordion" type="radio">
          <label aria-hidden="true" :for="'accordion-section' + key"> {{ key }}</label>
            <div class="card fluid">
              <div v-for="(category, index) in group" :key="index" :class="{ dark: category.id===selectedCategoryId }"
                   class="section" @click="onClickCategory(category.id)">
                <b>{{ category.group }}</b> {{ category.title }}
              </div>
            </div>
        </template >
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
    let grouped = computed(() => store.getters.groupedCategories)
    let selectedCategoryId = ref("")
    let onClickCategory = (categoryId) => {
      if (categoryId === selectedCategoryId.value) {
        selectedCategoryId.value = ""
      } else {
        selectedCategoryId.value = categoryId
      }
    }
    let onAssignCategory = () => {
      if (selectedCategoryId.value !== "") {
        context.emit('assignCategory', selectedCategoryId.value)
      }
    }
    return {categories, selectedCategoryId, onClickCategory, onAssignCategory, grouped}
  },
}
</script>


<style scoped>

</style>
