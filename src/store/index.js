import {createStore} from 'vuex'
import api from '../service/axiosInstance';
import processError from "../service/processError";
import axios from "axios";
import {movementsModule} from './movement.store'
import {categoryModule} from "./categories.store";
import {conceptModule} from "./concept.store";

export default createStore({
  state: {
    alertMessage: {
      show: false,
      message: "",
      type: 0
    },
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VyZXllc2FsdmFyZXouY29tIiwidXBuIjoiZXJleWVzYWx2YXJlekBnbWFpbC5jb20iLCJncm91cHMiOlsiQURNSU4iLCJVU0VSIl0sImlhdCI6MTYyNzE2ODc5OSwiZXhwIjoxNjI3MTcyMzk5LCJlbWFpbCI6ImVyZXllc2FsdmFyZXpAZ21haWwuY29tIiwianRpIjoiYWZkNTExODItM2QzOS00NjQ1LTlkYzMtYzI2OTM4NTViYmFjIn0.KkCM8dT_hjuH3eza9AVyqJuk_Yz6V67bJmTbDvBBNSQZ60RrlqfB3oN0k6NIEHmb437g3G8oDAkEzfOCc88djYL-_NE5_YJQv9BIalOWGj6POtoeHyP3ScScG0wbP_VectzprQG_fcTVQgxBukH6QzkL1KxhseeCDTS_qIgyFfDlVZiId0iPZp_yZVNwptuzF7_PQVh5jJIaawZr7EQcmYEVeBfwwdsYHC1XgInoc2IRaJmoLmC4baN1j5SJozHkOk5j9tlMiZzF_M1Qg_I1i3B3lN3eWw8Uk--stGq8MvP8IcB3Teb0h8cAvG_0GdiaCH3s6f4PFpdS-kIe_NZLvw"

  },
  mutations: {
    setAlertMsg(state, input) {
      state.alertMsg = input
    },
    setShow(state, show) {
      state.alertMsg.show = show
    },
    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = ""
    }
  },
  actions: {
    setError(context, message) {
      let alertMsg = {
        type: 1,
        show: true,
        message: message
      }
      context.commit("setAlertMsg", alertMsg)
      setTimeout(function () {
        context.commit("setShow", false);
      }, 3000);
    },
    login(context, payload) {
      const basePath = import.meta.env.VITE_APP_API_URL
      const uri = "/auth/login"

      axios.post(basePath + uri, payload)
        .then(value => {
          context.commit("setToken", value.data.token)
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    },
    handleError(context, reason) {
      const processedError = processError(reason)
      if (processedError.clearToken) {
        context.commit("clearToken");
      }
      context.dispatch("setError", processedError.errorMessage).then();
    }
  },
  getters: {
    isLogged: state => {
      return state.token !== ""
    },
    getAxiosInstance: state => {
      return api(state.token)
    }
  },
  modules: {
    movement: movementsModule,
    category: categoryModule,
    concepts: conceptModule
  }
})
