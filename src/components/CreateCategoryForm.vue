<template>
  <fieldset>
    <legend>Crear categoría</legend>
    <label for="category">Categoría</label>
    <input id="category" v-model="categoryTitle" placeholder="Categoría" type="text"/>
    <input id="category-group" v-model="categoryGroup" placeholder="Grupo" type="text"/>
    <button class="primary" @click="sendCreateCategory">Crear</button>
  </fieldset>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";

const store = useStore()
let categories = computed(() => store.state.movement.categories)

let createCategory = (payload) => {
  return store.dispatch('createCategory', payload)
}
let categoryTitle = ref("");
let categoryGroup = ref("");
let sendCreateCategory = () => {
  if (categoryTitle.value !== "") {
    const payload = {}
    payload.categoryTitle = categoryTitle.value
    payload.categoryGroup = categoryGroup.value
    createCategory(payload).then(_ => {
      categoryTitle.value = "";
      categoryGroup.value = "";
    })
  }
}
</script>

<style scoped>

</style>
