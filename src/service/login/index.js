import mxRequest from '../index';

// 登录接口
export function loginRequest(user) {
  return mxRequest.post({
    url: 'login/manage',
    data: user
  });
}


