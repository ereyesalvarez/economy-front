<template>
  <table id="concept-table">
    <caption>Conceptos</caption>
    <thead>
    <tr>
      <th>Title</th>
      <th>Cantidad</th>
      <th>N. movimientos</th>
      <th>Categorías</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(concept, index) in concepts" :key="index" :class="{ active: concept.title === selectedConceptTitle }"
        @click="addRemoveConcept(concept.title)">
      <td data-label="Title">{{ concept.title }}</td>
      <td data-label="Fecha">{{ concept.amount }}</td>
      <td data-label="Movimientos">{{ concept.count }}</td>
      <td data-label="Categorías">
        <span v-for="(cat, catIndex) in concept.categories" :key="catIndex">{{obtainCategoryLabelBy(cat)}}</span>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {useStore} from "vuex";
import {computed, ref} from "vue";

export default {
  name: "ConceptTable",
  setup() {
    const store = useStore()
    let concepts = computed(() => store.getters.sortedConcepts)
    let categories = computed(() => store.state.category.categories)
    let selectedConceptTitle = ref("")
    const getSelectedConcept = () => {
      return selectedConceptTitle.value
    }

    let obtainCategoryById = (categoryId) => {
      if (!categoryId) {
        return null
      }
      const found = categories.value.find(category => category.id === categoryId);
      if (found) {
        return found
      }
      return null
    }
    let obtainCategoryLabelBy = (categoryId) => {
      if(categoryId == null){
        return null
      } else {
        let category = obtainCategoryById(categoryId)
        if(category !== null){
          return category.title + " " + category.group
        }
        return "CategoryNotFound"
      }
    }
    let addRemoveConcept = (conceptTitle) => {
      if(selectedConceptTitle.value === conceptTitle){
        selectedConceptTitle.value = ""
      }else {
        selectedConceptTitle.value = conceptTitle
      }
    }
    return {
      concepts, categories, selectedConceptTitle, getSelectedConcept, obtainCategoryLabelBy, addRemoveConcept
    }
  }
}
</script>

<style scoped>
.active td {
  background-color: #1976d2;
}

#concept-table {
  max-height: 90vh;
}
</style>
