import {processResponse} from "../service/processResponse";


export const categoryModule = {
  state: () => ({
    categories: [],
    categoryAggregates: [],
  }),
  getters: {
    sortedCategories: state => {
      let auxCategories = state.categories

      auxCategories.sort((a,b) => {
        const textA = a.group.toUpperCase();
        const textB = b.group.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
      return auxCategories
    },
    sortedCategoryAggregates: state => {
      let auxCategories = state.categoryAggregates
      auxCategories.sort((a,b) => {
        return b-a
      })
      return auxCategories
    }
  },
  mutations: {
    setCategories(state, input) {
      state.categories = input
    },
    setCategoryAggregates(state, input) {
      state.categoryAggregates = input
    }
  },
  actions: {
    createCategory(context, payload) {
      const uri = "/category"
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
    getCategoryAggregates(context) {
      const uri = "/category/aggregate"
      context.getters.getAxiosInstance.get(uri)
        .then(value => {
          context.commit("setCategoryAggregates", processResponse(value))
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    },

  }
}
