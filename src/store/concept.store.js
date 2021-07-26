import {processResponse} from "../service/processResponse";


export const conceptModule = {
  state: () => ({
    concepts: []
  }),
  getters: {
    sortedConcepts: state => {
      let auxConcepts = state.concepts
      auxConcepts.sort((a,b) => b.count - a.count)
      return auxConcepts
    },
  },
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
    setCategoryToConcept(context, payload) {
      const uri = "/movement/concept/category"
      context.getters.getAxiosInstance.put(uri, payload)
        .then(_ => {
          context.dispatch("getCategories").then()
          context.dispatch("getConcepts").then()
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    },

  }
}
