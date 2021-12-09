import { registerRequest } from '@/service/login/index';
import { ElNotification } from 'element-plus';

const registerModules = {
  namespaced: true,
  state() {
    return {
      message: ''
    };
  },
  mutations: {
    changeMessage(state, message) {
      state.message = message;
    }
  },
  actions: {
    async registerAction({ commit, dispatch }, payload) {
      const registerResult = await registerRequest(payload);
      const { affectedRows, data } = registerResult.data;
      const errorTips = () => {
        ElNotification({
          title: 'Error',
          message: '用户已存在!',
          type: 'error'
        });
      };
      const successTips = () => {
        ElNotification({
          title: 'Error',
          message: '注册成功!',
          type: 'success'
        });
      };
      if (affectedRows) {
        successTips();
      } else {
        errorTips();
      }
    }
  },
  getters: {}
};

export default registerModules;
