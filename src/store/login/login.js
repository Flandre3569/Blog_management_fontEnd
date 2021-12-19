import { loginRequest } from '@/service/login';
import localCache from '@/utils/localCache';
import router from '@/router';
import { ElNotification } from 'element-plus';

const loginModules = {
  namespaced: true,
  state() {
    return {
      loginStatus: ''
    };
  },
  getters: {},
  mutations: {
    changeStatus(state, loginStatus) {
      state.loginStatus = loginStatus;
    },

  },
  actions: {
    async userLoginAction({ commit, dispatch }, payload) {
      const loginResult = await loginRequest(payload);
      const { data } = loginResult;
      console.log(loginResult);
      const errorTips = () => {
        ElNotification({
          title: 'Error',
          message: '账号或密码错误!',
          type: 'error'
        });
      };

      commit('changeStatus', data);

      if (data) {
        localCache.setCache('loginStatus', data);
        router.push('/main');
      } else {
        errorTips();
      }
    }
  }
};

export default loginModules;
