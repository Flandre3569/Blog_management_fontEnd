import { createApp } from 'vue'
import App from './App.vue'

// global style
import './assets/css/index.less';
// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// vue-router
import router from './router';
// vuex
import store from './store';


const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);

app.mount('#app');

