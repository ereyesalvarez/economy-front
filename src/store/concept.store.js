import {processResponse} from "../service/processResponse";


export const conceptModule = {
  state: () => ({
    concepts: []
  }),

  mutations: {
    setConcepts(state, input) {
      state.concepts = input
    },
  },
  actions: {
    getConcepts(context){
      const uri = "/movement/concept"
      context.getters.getAxiosInstance.get(uri)
        .then(value => {
          context.commit("setConcepts", processResponse(value))
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    },
    setCategoryToConcept(context, categoryId, conceptString) {
      const uri = "/movement/concept/category"
      const payload = {
        categoryId: categoryId,
        concept: conceptString
      }
      context.getters.getAxiosInstance.put(uri, payload)
        .then(_ => {
          context.dispatch("getCategories")
          context.dispatch("getConcepts")
          context.dispatch("getMovements")
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    },

  }
}
