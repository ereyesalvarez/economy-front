import {processResponse} from "../service/processResponse";

export const movementsModule = {
  state: () => ({
    movements: [],
  }),
  mutations: {
    setMovements(state, input) {
      state.movements = input
    },
  },
  actions: {
    getMovements(context) {
      const uri = "/movement"
      context.getters.getAxiosInstance.get(uri)
        .then(value => {
          context.commit("setMovements", processResponse(value))
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    },
    setCategoryToMovement(context, categoryId, movementsId) {
      const uri = "/movement/category"
      const payload = {
        movementsId: movementsId,
        categoryId: categoryId
      }
      context.getters.getAxiosInstance.put(uri, payload)
        .then(_ => {
          context.dispatch("getCategories")
          context.dispatch("getMovements")
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    },
    setCategoryToMovements(context, payload) {
      const uri = "/movement/category/batch"

      context.getters.getAxiosInstance.put(uri, payload)
        // eslint-disable-next-line no-unused-vars
        .then(value => {
          context.dispatch("getCategories")
          context.dispatch("getMovements")
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    }
  },
}
