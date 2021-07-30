<template>
  <table id="concept-table">
    <caption>Conceptos</caption>
    <thead>
    <tr>
      <th style="max-width:7%">#</th>
      <th>Title</th>
      <th style="max-width:10%">Cantidad</th>
      <th style="max-width:10%">N. mov</th>
      <th>Categorías</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(concept, index) in concepts" :key="index" :class="{ active: concept.title === selectedConceptTitle }"
        @click="addRemoveConcept(concept.title)">
      <td  style="max-width:7%" data-label="#" >{{index}}</td>
      <td data-label="Title">{{ concept.title }}</td>
      <td data-label="Total" style="max-width:10%">{{ concept.amount?.toFixed(2) }}</td>
      <td data-label="Movimientos" style="max-width:10%">{{ concept.count }}</td>
      <td data-label="Categorías">
        <span v-for="(cat, catIndex) in concept.categories" :key="catIndex" class="badge">{{obtainCategoryLabelBy(cat)}}</span>
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


.badge {
  display: inline-block;
  min-width: 16px; /* pixel unit */
  padding: 5px 5px; /* pixel unit */
  border-radius: 50%;
  font-size: 0.8em;
  text-align: center;
}

table th, table td{
  padding: 0.2px
}
</style>
