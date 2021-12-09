import { createStore } from 'vuex';
import login from './login/login.js';
import register from './register/register.js';

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
    login,
    register
  }
});

export default store;
