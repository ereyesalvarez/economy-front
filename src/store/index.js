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
    token: localStorage.getItem('token') || '',
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
          localStorage.setItem('token', value.data.token)
          context.commit("setToken", value.data.token)
        })
        .catch(reason => {
          context.dispatch("handleError", reason).then()
        })
    },
    handleError(context, reason) {
      const processedError = processError(reason)
      if (processedError.clearToken) {
        localStorage.removeItem('token')
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
    concept: conceptModule
  }
})
