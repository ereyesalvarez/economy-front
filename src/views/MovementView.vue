<template>
  <div class="row">
    <div class="col-sm-9">
      <movement-table ref="reference"/>
    </div>
    <div class="col-sm-3">
      <create-category-form/>
      <category-list v-on:assignCategory="handleAssignCategory"/>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import MovementTable from "../components/MovementTable.vue";
import CategoryList from "../components/CategoryList.vue";
import CreateCategoryForm from "../components/CreateCategoryForm.vue";
import {ref, onMounted } from "vue";


export default {
  name: "MovementView",
  components: {CreateCategoryForm, CategoryList, MovementTable},
  setup() {
    const store = useStore()
    const reference = ref(null);

    let getMovements = () => {
      store.dispatch('getMovements')
    }
    let getCategories = () => {
      store.dispatch('getCategories')
    }
    let handleAssignCategory= (value)=>{
      let selectedMovementIds = reference.value.getSelectedMovements()
      if(selectedMovementIds == null){
        console.log("Error selectedMovementIds null")
        return
      }
      const payload = {
        categoryId: value,
        movementIdList: selectedMovementIds
      }
      store.dispatch('setCategoryToMovements', payload)
    }
    return {
      getMovements, getCategories, handleAssignCategory, reference
    }
  },
  mounted() {
    this.getMovements()
    this.getCategories()
  }
}
</script>
