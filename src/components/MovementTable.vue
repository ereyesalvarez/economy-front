<template>
  <table id="movement-table">
    <caption>Conceptos</caption>
    <thead>
    <tr>
      <th>Title</th>
      <th>Fecha</th>
      <th>Cantidad</th>
      <th>Categoría</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(movement, index) in movements" :key="index" :class="{ active: movementIsAdded(movement.id) }"
        @click="addRemoveMovement(movement.id)">
      <td data-label="Title">{{ movement.title }}</td>
      <td data-label="Fecha">{{ movement.date }}</td>
      <td data-label="Cantidad">{{ movement.amount }}</td>
      <td data-label="Categoría">{{ obtainCategoryNameById(movement.categoryId) }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {useStore} from "vuex";
import {computed, ref} from "vue";

export default {

  setup() {
    const store = useStore()
    let movements = computed(() => store.state.movement.movements)
    let categories = computed(() => store.state.category.categories)
    let selectedMovements = ref([])
    let addMovement = (movementId) => {
      selectedMovements.value.push(movementId)
    }
    let removeMovement = (movementId) => {
      let index = selectedMovements.value.indexOf(movementId);
      if (index !== -1) {
        selectedMovements.value.splice(index, 1);
      }
    }
    let addRemoveMovement = (movementId) => {
      const position = selectedMovements.value.indexOf(movementId)
      if (position !== -1) {
        removeMovement(movementId)
      } else {
        addMovement(movementId)
      }
    }
    const getSelectedMovements = () => {
      return selectedMovements.value
    }
    let movementIsAdded = (movementId) => {
      return selectedMovements.value.indexOf(movementId) !== -1
    }
    let obtainCategoryNameById = (categoryId) => {
      if (!categoryId) {
        return ""
      }
      const found = categories.value.find(category => category.id === categoryId);
      if (found) {
        return found.title
      }
      return "categoryNotFound"
    }
    return {
      movements,
      categories,
      selectedMovements,
      addRemoveMovement,
      getSelectedMovements,
      movementIsAdded,
      obtainCategoryNameById
    }
  }
}
</script>


<style scoped>
.active td {
  background-color: #1976d2;
}

#movement-table {
  max-height: 90vh;
}
</style>
