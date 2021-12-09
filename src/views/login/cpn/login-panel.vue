<template>
  <div class="login-panel">
    <el-tabs type="border-card" stretch v-model="currentTabs">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user"></i> 账号登入</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="register">
        <template #label>
          <span><i class="el-icon-edit-outline"></i> 账号注册</span>
        </template>
        <login-register ref="registerRef" />
      </el-tab-pane>
    </el-tabs>
    <el-button
      class="login-btn"
      type="primary"
      @click="loginController"
      v-if="currentTabs === 'account'"
      plain
    >
      立即登录
    </el-button>
    <el-button
      class="login-btn"
      type="primary"
      @click="loginController"
      v-if="currentTabs === 'register'"
      plain
    >
      立即注册
    </el-button>
  </div>
</template>

<script scoped lang="ts">
import { defineComponent, reactive, ref } from "vue";
import loginAccount from "./login-account.vue";
import loginRegister from "./login-register.vue";
import router from "@/router/index";

export default defineComponent({
  components: {
    loginAccount,
    loginRegister,
  },
  setup() {
    const currentTabs = ref("account");
    const accountRef = ref<InstanceType<typeof loginAccount>>();
    const registerRef = ref<InstanceType<typeof loginRegister>>();
    const loginController = () => {
      if (currentTabs.value === "account") {
        accountRef.value?.loginClick();
      } else if (currentTabs.value === "register") {
        registerRef.value?.registerClick();
      }
    };
    return {
      currentTabs,
      loginController,
      accountRef,
      registerRef,
    };
  },
});
</script>

<style lang="less">
.login-panel {
  margin-top: -10px;
  width: 500px;
  height: 400px;
}
.submitBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}
// 头像
.demo-avatar {
  justify-content: center;
}
.demo-shadow {
  height: 100px;
  width: 50%;
  border: 1px solid var(--el-border-color-base);
}
// 登录按钮
.login-btn {
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
</style>
