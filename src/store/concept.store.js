import {processResponse} from "../service/processResponse";
import calculatePercentage from "../service/calculatePercentage";
import groupBy from "../service/groupBy";


export const conceptModule = {
  state: () => ({
    concepts: []
  }),
  getters: {
    sortedConcepts: state => {
      let auxConcepts = state.concepts
      auxConcepts.sort((a, b) => b.amount - a.amount)
      return auxConcepts
    },
    getCategoryProgress: state => {
      let total = state.concepts.length
      let auxConcepts = state.concepts;
      let count = auxConcepts.filter(value => value.categories.length > 0).length
      return Math.round(calculatePercentage(count, total))
    },
    getGrouped: state => {
      return groupBy(state.concepts, concept => concept.group).map(input => {
        return {
          group: input.group,
          categories: input
        }
      })
    },
  },
  mutations: {
    setConcepts(state, input) {
      state.concepts = input
    },
  },
  actions: {
    getConcepts(context) {
      const uri = "/movement/concept"
      let options = {}
      options.params = context.getters.asParams
      console.log(options)
      context.getters.getAxiosInstance.get(uri, options)
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
