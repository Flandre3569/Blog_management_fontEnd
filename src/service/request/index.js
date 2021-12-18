import axios from 'axios';
// 导入加载实例和实例返回值类型，在最新的element-plus中，类型也可以直接从element-plus包里获取了
import { ElLoading } from 'element-plus';

const DEFAULT_LOADING = true;

// 设置一个构造器，在外部实例化一个MXRequest的时候可以直接传入地址，
// 这样就可以实例多个base_url的请求接口了
class MXRequest {
  // 因为是使用ts进行编写的，所以每个变量需要赋予对应的类型，而axios内置了部分类型
  // 对intance实例进行封装，并通过构造器保存
  instance;
  interceptors;
  showLoading;
  loading;
  constructor(config) {
    // 新建一个axios实例并赋值给instance，则后面使用this.instance就相当于axios
    this.instance = axios.create(config);
    // 接收外部传进来的拦截器，并进行保存
    this.interceptors = config.interceptors;
    // 设置外部传入的加载动画
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    // 使用外部传进来的拦截器
    // 第一个参数是拦截成功时执行的方法，第二个参数是拦截失败时执行的方法
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    // 在此处设置的拦截器，每次实例化的时候都会添加进去
    this.instance.interceptors.request.use(
      (config) => {
        // 设置请求数据时加载动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在拉取数据....',
            background: 'rgba(0,0,0,0.5)'
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        // 当服务器对面响应的时候代表请求已经完成，关闭loading动画
        this.loading?.close();
        const data = res.data;
        if (data.status === '-1001') {
          console.log(`信息错误，请求失败`);
        } else {
          return res;
        }
      },
      (err) => {
        // 请求不到数据的时候也需要关闭loading动画
        this.loading?.close();

        if (err.response.status === 404) {
          console.log(`404错误信息`);
        }
        return err;
      }
    );
  }

  request(config) {
    return new Promise((resolve, reject) => {
      // 设置外部自定义拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 设置外部传入showLoading属性的时候，对类本身的showLoading进行重新赋值,之所以是不显示的时候才重新赋值，是因为如果没有值传入的话，本身就是true
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          console.log(res);
          // 对showLoading属性进行还原
          this.showLoading = DEFAULT_LOADING;
          // 对请求的结果进行返回
          resolve(res);
        })
        .catch((err) => {
          // 请求错误的话也需要对showLoading属性进行还原
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  // 将request方法进行分化，设置为get、post、delete、patch等方法，那么进行使用的时候method属性就确定了，使用也更加方便
  get(config) {
    return this.request({ ...config, method: 'GET' });
  }
  post(config) {
    return this.request({ ...config, method: 'POST' });
  }
  delete(config) {
    return this.request({ ...config, method: 'DELETE' });
  }
  patch(config) {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default MXRequest;
