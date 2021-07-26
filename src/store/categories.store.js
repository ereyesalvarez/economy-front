import {processResponse} from "../service/processResponse";


export const categoryModule = {
  state: () => ({
    categories: []
  }),
  getters: {
    sortedCategories: state => {
      let auxCategories = state.categories

      auxCategories.sort((a,b) => {
        const textA = a.title.toUpperCase();
        const textB = b.title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
      return auxCategories
    }
  },
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
          context.dispatch("getCategories").then()
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
