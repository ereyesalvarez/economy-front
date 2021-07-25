<template>
  <fieldset>
    <legend>Crear categoría</legend>
    <label for="category">Categoría</label>
    <input id="category" v-model="categoryTitle" placeholder="Categoría" type="text"/>
    <button class="primary" @click="sendCreateCategory">Crear</button>
  </fieldset>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";

const store = useStore()
let categories = computed(() => store.state.movement.categories)

let createCategory = (categoryTitle) => {
  store.dispatch('createCategory', categoryTitle)
}
let categoryTitle = ref("");
let sendCreateCategory = () => {
  if (categoryTitle.value !== "") {
    createCategory(categoryTitle.value)
  }
}
</script>

<style scoped>

</style>
