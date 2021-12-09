<template>
  <div>
    <el-form :rules="rules" :model="register" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="register.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="register.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { rules } from '../rules/accountRules';
import { ElForm } from 'element-plus';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const register = reactive({
      username: '',
      password: ''
    });
    const store = useStore();
    const formRef = ref<InstanceType<typeof ElForm>>();
    const registerClick = () => {
      formRef.value?.validate((valid: any) => {
        if (valid) {
          store.dispatch('register/registerAction', register);
        } else {
          return false;
        }
      });
    };
    return {
      register,
      rules,
      formRef,
      registerClick
    };
  }
});
</script>

<style scoped></style>
