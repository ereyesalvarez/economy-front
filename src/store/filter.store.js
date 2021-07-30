export const filterModule = {
  state: () => ({
    income: true,
    startDate: "2021-01-01",
    endDateDate: null
  }),
  getters: {
    asParams: (state) => {
      let params = {}
      if (state.income)
        params.income = true;
      if (state.startDate != null) {
        params.startDate = state.startDate
      }
      if (state.endDate != null) {
        params.endDate = state.endDateDate
      }
      return params
    }
  }
}

