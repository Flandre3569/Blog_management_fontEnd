import { loginRequest } from '@/service/login';
import localCache from '@/utils/localCache';
import router from '@/router';
import { ElNotification } from 'element-plus';

const loginModules = {
  namespaced: true,
  state() {
    return {
      id: '',
      name: '',
      loginStatus: ''
    };
  },
  getters: {},
  mutations: {
    changeId(state, id) {
      state.id = id;
    },
    changeStatus(state, loginStatus) {
      state.loginStatus = loginStatus;
    },
    changeName(state, name) {
      state.name = name;
    }
  },
  actions: {
    async userLoginAction({ commit, dispatch }, payload) {
      const loginResult = await loginRequest(payload);
      const { id,name } = loginResult.data;
      console.log(loginResult);
      const errorTips = () => {
        ElNotification({
          title: 'Error',
          message: '账号或密码错误!',
          type: 'error'
        });
      };

      commit('changeStatus', "success");
      commit('changeId', id);
      commit('changeName', name);

      if (id) {
        localCache.setCache('loginStatus', "success");
        localCache.setCache('name', name);
        localCache.setCache('id', id);
        router.push('/main');
      } else {
        errorTips();
      }
    }
  }
};

export default loginModules;
