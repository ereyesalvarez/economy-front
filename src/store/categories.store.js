import {processResponse} from "../service/processResponse";


export const categoryModule = {
  state: () => ({
    categories: []
  }),
  mutations: {
    setCategories(state, input) {
      state.categories = input
    }
  },
  actions: {
    createCategory(context, categoryTitle) {
      const uri = "/category"
      const payload = {}
      payload.categoryTitle = categoryTitle
      context.getters.getAxiosInstance.post(uri, payload)
        .then(_ => {
          context.dispatch("getCategories")
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    },
    getCategories(context) {
      const uri = "/category"
      context.getters.getAxiosInstance.get(uri)
        .then(value => {
          context.commit("setCategories", processResponse(value))
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    },

  }
}
