// 方式一：手动的切换不同的环境
// 根据要求手段更改环境
// const BASE_URL = 'http://httpbin.org/dev';
// const BASE_NAME = 'mx';

// const BASE_URL = 'http://httpbin.org/prod';
// const BASE_NAME = 'mm';

// const BASE_URL = 'http://httpbin.org/test';
// const BASE_NAME = 'xx';

// 方式二：根据process.env.NODE_ENV
// process.env.NODE_ENV在不同的环境下会显示不同的值
console.log(process.env.NODE_ENV);

let BASE_URL = '';
const TIME_OUT = 10000;

// 这里api进行了反向代理，解决跨域问题。
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api';
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '/api';
} else {
  BASE_URL = '/api';
}

export { BASE_URL, TIME_OUT };
