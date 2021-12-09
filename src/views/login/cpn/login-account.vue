<template>
  <div>
    <el-form :rules="rules" :model="user" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="user.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { rules } from '../rules/accountRules';
import { useStore } from 'vuex';
import { ElForm } from 'element-plus';
import localCache from '@/utils/localCache';

export default defineComponent({
  setup() {
    const user = reactive({
      name: '',
      password: ''
    });
    const store = useStore();
    const formRef = ref<InstanceType<typeof ElForm>>();

    const loginClick = () => {
      const token = localCache.getCache('token');

      formRef.value?.validate((valid: any) => {
        if (valid) {
          store.dispatch('login/userLoginAction', user);
        } else {
          return false;
        }
      });
    };
    return { user, rules, loginClick, formRef };
  }
});
</script>

<style scoped></style>
