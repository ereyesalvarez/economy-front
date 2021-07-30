import {processResponse} from "../service/processResponse";
import groupBy from "../service/groupBy";


export const categoryModule = {
  state: () => ({
    categories: [],
    categoryAggregates: [],
    categoryAggregatesMonthly: [],
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
    groupedCategories: state => {
      const groupByGroup = groupBy('group');
      let grouped = groupByGroup(state.categories)
      return Object.keys(grouped).sort().reduce(
        (obj, key) => {
          obj[key] = grouped[key];
          return obj;
        },
        {}
      );

    },
    sortedCategoryAggregates: state => {
      let auxCategories = state.categoryAggregates
      auxCategories.sort((a,b) => {
        return b-a
      })
      return auxCategories
    },
    sortedCategoryAggregatesMonthly: state => {
      console.log(state.categoryAggregatesMonthly)
      let auxCategories = state.categoryAggregatesMonthly
      auxCategories.forEach(value => value.dates.sort((a,b) => {
        if(a.year === b.year){
          return a.month - b.month
        }
        return a.year - b.year
      }))
      return auxCategories
    }
  },
  mutations: {
    setCategories(state, input) {
      state.categories = input
    },
    setCategoryAggregates(state, input) {
      state.categoryAggregates = input
    },
    setCategoryAggregatesMonthly(state, input) {
      state.categoryAggregatesMonthly = input
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
      let options = {}
      options.params = context.getters.asParams
      context.getters.getAxiosInstance.get(uri, options)
        .then(value => {
          context.commit("setCategories", processResponse(value))
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    },
    getCategoryAggregates(context) {
      const uri = "/category/aggregate"
      let options = {}
      options.params = context.getters.asParams
      context.getters.getAxiosInstance.get(uri , options)
        .then(value => {
          context.commit("setCategoryAggregates", processResponse(value))
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    },
    getCategoryAggregatesMonthly(context) {
      const uri = "/category/aggregate/monthly/by-category"
      let options = {}
      options.params = context.getters.asParams
      context.getters.getAxiosInstance.get(uri , options)
        .then(value => {
          context.commit("setCategoryAggregatesMonthly", processResponse(value))
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    },

  }
}
