import { createStore } from 'vuex';
import login from './login/login.js';

const store = createStore({
  namespaced: 'home',
  state() {
    return {
      name: 'Postgraduate-Completeness'
    };
  },
  mutations: {},
  actions: {},
  modules: {
    login
  }
});

export default store;
