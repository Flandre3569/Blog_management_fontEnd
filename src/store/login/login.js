import { loginRequest } from '@/service/login';
import localCache from '@/utils/localCache';
import router from '@/router';
import { ElNotification } from 'element-plus';

const loginModules = {
  namespaced: true,
  state() {
    return {
      token: '',
      name: ''
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token) {
      state.token = token;
    },
    changeName(state, name) {
      state.name = name;
    }
  },
  actions: {
    async userLoginAction({ commit, dispatch }, payload) {
      const loginResult = await loginRequest(payload);
      const { id, token, name } = loginResult.data;
      const errorTips = () => {
        ElNotification({
          title: 'Error',
          message: '账号或密码错误!',
          type: 'error'
        });
      };
      // console.log(id);
      commit('changeToken', token);
      commit('changeName', name);
      if (token) {
        localCache.setCache('token', token);
        localCache.setCache('name', name);
        router.push('/main');
      } else {
        errorTips();
      }
    }
  }
};

export default loginModules;
