import MXRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';
import localCache from '@/utils/localCache';

const mxRequest = new MXRequest({
  // 因为在request/index.ts中对MXRequest封装了AxiosInstance实例属性和interceptors拦截器属性，所以在新建的时候都需要对这两个属性进行传值
  // instance可以传入baseURL、timeout等，interceptors中传入定义的那四个变量
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 对拦截器携带token的设定
      const token = localCache.getCache('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // console.log(`request拦截成功的响应`);
      return config;
    },
    requestInterceptorCatch: (err) => {
      // console.log(`request拦截失败的响应`);
      return err;
    },
    responseInterceptor: (res) => {
      // console.log(`response拦截成功的响应`);
      return res;
    },
    responseInterceptorCatch: (err) => {
      // console.log(`response拦截失败的响应`);
      return err;
    }
  }
});
export default mxRequest;
