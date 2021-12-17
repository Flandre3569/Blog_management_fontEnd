import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: '9999',
    open: false,
    proxy: {
      '/api': {
        // 在此填写后端接口API
        target: 'http://127.0.0.1:9000',
        changeOrigin: true, // target是域名的话，需要这个参数，
        secure: false, // 设置支持https协议的代理
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
