<template>
  <div class="row">
    <div class="col-sm-9">
      <movement-table/>
    </div>
    <div class="col-sm-3">
      <create-category-form/>
      <category-list/>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import MovementTable from "../components/MovementTable.vue";
import CategoryList from "../components/CategoryList.vue";
import CreateCategoryForm from "../components/CreateCategoryForm.vue";


export default {
  name: "MovementView",
  components: {CreateCategoryForm, CategoryList, MovementTable},
  setup() {
    const store = useStore()
    let getMovements = () => {
      store.dispatch('getMovements')
    }
    let getCategories = () => {
      store.dispatch('getCategories')
    }
    return {
      getMovements, getCategories
    }
  },
  mounted() {
    this.getMovements()
    this.getCategories()
  },
}
</script>
