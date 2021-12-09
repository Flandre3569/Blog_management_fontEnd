<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import loginPanel from './cpn/login-panel.vue';

export default defineComponent({
  components: {
    loginPanel
  },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('http://mingxuan3569.oss-cn-beijing.aliyuncs.com/image/bg.2cfdbb33.svg')
}
</style>
