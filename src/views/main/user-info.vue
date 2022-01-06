<template>
  <div class="userInfo">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <span class="avatar-name">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item @click="drawer = true">文件管理</el-dropdown-item>

          <el-dropdown-item @click="activate('bottom')">反馈</el-dropdown-item>

          <el-dropdown-item
            divided
            icon="el-icon-circle-close"
            @click="handleExitClick"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <el-upload
        class="upload-demo"
        drag
        action="#"
        :http-request="httpHandle"
        multiple
        :limit="10"
        accept=".pdf"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">pdf files with a size less than 10MB</div>
        </template>
      </el-upload>
    </el-drawer>
    <n-drawer
      v-model:show="active"
      :width="502"
      :placement="placement"
      height="400px"
    >
      <n-drawer-content title="遇到的问题请及时向开发人员反馈哦~">
        <el-form
          ref="formRef"
          :model="email"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="address"
            prop="address"
            :rules="[{ required: true, message: 'address is required' }]"
          >
            <el-input
              v-model="email.address"
              type="text"
              autocomplete="off"
              placeholder="请输入您的邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="subject"
            prop="subject"
            :rules="[{ required: true, message: 'subject is required' }]"
          >
            <el-input
              v-model="email.subject"
              type="text"
              autocomplete="off"
              placeholder="反馈主题"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="body"
            prop="body"
            :rules="[{ required: true, message: 'body is required' }]"
          >
            <el-input
              v-model="email.body"
              type="textarea"
              autocomplete="off"
              placeholder="反馈内容"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)"
              >Submit</el-button
            >
            <el-button @click="resetForm(formRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { ElForm, ElNotification } from "element-plus";
import localCache from "@/utils/localCache";
import { useRouter } from "vue-router";
import mxRequest from "@/service/index";
import axios from "axios";

export default defineComponent({
  setup() {
    const store = useStore();
    const name = localCache.getCache("name");
    const router = useRouter();
    const active = ref(false);
    const placement = ref("right");
    const handleExitClick = () => {
      localCache.deleteCache("loginStatus");
      router.push("/");
    };
    const formRef = ref<InstanceType<typeof ElForm>>();

    const email = reactive({
      address: "",
      subject: "",
      body: "",
    });
    const activate = (place) => {
      active.value = true;
      placement.value = place;
    };
    return {
      name,
      handleExitClick,
      drawer: ref(false),
      active,
      placement,
      activate,
      email,
    };
  },

  methods: {
    httpHandle(file) {
      axios({
        url: "http://localhost:9000/user/upload", //****: 你的ip地址
        data: file,
        method: "post",
        headers: {
          "Access-Control-Allow-Origin": "http://127.0.0.1:9000",
          //这里是为了解决跨域问题，但是博主并没有用这种方式解决。后面会给出解决方案
        },
      }).then((res) => {
        console.log(res.data);
      }); // 发送请求
    },
    submitForm(form) {
      mxRequest
        .post({
          url: "email/sendEmail",
          data: this.email,
        })
        .then((res) => {
          if (res.data === 1) {
            ElNotification({
              title: "Success",
              message: "反馈成功",
              type: "success",
            });
            this.active = false;
          }
        });
    },
  },
});
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
  .avatar-name {
    padding: 0 10px;
  }
}
</style>
