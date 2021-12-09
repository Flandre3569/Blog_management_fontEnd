<template>
  <div class="login">
    <el-card class="box-card login-panel">
      <template #header>
        <div class="card-header">
          <span>博客管理系统</span>
          <el-button class="button" type="primary" plain @click="loginClick"
            >登录</el-button
          >
        </div>
      </template>
      <div class="text item">
        <el-form :rules="rules" :model="user">
          <el-form-item label="账号" prop="name">
            <el-input v-model="user.name" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" show-password />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { rules } from "./rules/accountRules";
import { useStore } from "vuex";
import { ElForm } from "element-plus";
import localCache from "@/utils/localCache";

export default defineComponent({
  components: {},
  setup() {
    const user = reactive({
      name: "",
      password: "",
    });
    const store = useStore();
    const formRef = ref<InstanceType<typeof ElForm>>();

    const loginClick = () => {
      const token = localCache.getCache("token");

      formRef.value?.validate((valid: any) => {
        if (valid) {
          store.dispatch("login/userLoginAction", user);
        } else {
          return false;
        }
      });
    };
    return { user, rules, loginClick, formRef };
  },
});
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("http://mingxuan3569.oss-cn-beijing.aliyuncs.com/image/bg.2cfdbb33.svg");
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

.login-panel {
  margin-top: -100px;
  width: 500px;
}

span {
  font-size: 20px;
}
</style>
