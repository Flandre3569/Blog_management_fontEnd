import mxRequest from '../index';

// 登录接口
export function loginRequest(user) {
  return mxRequest.post({
    url: 'login',
    data: user
  });
}

// 注册接口
export function registerRequest(user) {
  return mxRequest.post({
    url: 'register',
    data: user
  });
}
