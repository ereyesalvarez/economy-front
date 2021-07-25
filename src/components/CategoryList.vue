<template>
  <div class="row">
    <div class="col-sm">
      <h3>Categorias</h3>
    </div>
    <div class="col-sm">
      <button :disabled="selectedCategoryId === ''" class="tertiary">Asignar</button>
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

<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";

const store = useStore()
let categories = computed(() => store.state.category.categories)
let selectedCategoryId = ref("")
let onClickCategory = (categoryId) => {
  if (categoryId === selectedCategoryId.value) {
    selectedCategoryId.value = ""
  } else {
    selectedCategoryId.value = categoryId
  }
}

</script>

<style scoped>

</style>
