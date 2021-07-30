<template>
  <div class="row">
    <div class="col-sm">
      <progress class="inline primary" max="100" style="background-color: antiquewhite; width: 100%" :value="calculated"></progress>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-9">
      <concept-table ref="reference"/>
    </div>
    <div class="col-sm-3">
      <create-category-form/>
      <category-list v-on:assignCategory="handleAssignCategory"/>
    </div>
  </div>
</template>

<script>
import CategoryList from "../components/CategoryList.vue";
import CreateCategoryForm from "../components/CreateCategoryForm.vue";
import ConceptTable from "../components/ConceptTable.vue";
import {useStore} from "vuex";
import {computed, ref} from "vue";

export default {
  name: "ConceptView",
  components: {ConceptTable, CategoryList, CreateCategoryForm},
  setup() {
    const store = useStore()
    const reference = ref(null);
    let calculated = computed(() => store.getters.getCategoryProgress)

    let getConcepts = () => {
      store.dispatch('getConcepts')
    }
    let getCategories = () => {
      store.dispatch('getCategories')
    }
    let handleAssignCategory = (value) => {
      let selectedConceptTitle = reference.value.getSelectedConcept()
      if (selectedConceptTitle == null || selectedConceptTitle === "") {
        console.log("Error selectedConceptTitle null")
        return
      }
      const payload = {
        categoryId: value,
        concept: selectedConceptTitle
      }
      store.dispatch('setCategoryToConcept', payload)
    }
    return {
      getConcepts, getCategories, handleAssignCategory, reference, calculated
    }
  },
  mounted() {
    this.getConcepts()
    this.getCategories()
  }
}
</script>
