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
        :on-preview="handlePreview"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import localCache from "@/utils/localCache";
import { useRouter } from "vue-router";
import mxRequest from "@/service/index";
import axios from "axios";

export default defineComponent({
  setup() {
    const store = useStore();
    const name = localCache.getCache("name");
    const router = useRouter();
    const handleExitClick = () => {
      localCache.deleteCache("loginStatus");
      router.push("/");
    };
    return {
      name,
      handleExitClick,
      drawer: ref(false),
    };
  },

  methods: {
    handlePreview(file) {
      window.open(file.response.url);
    },
    httpHandle(file) {
      mxRequest.post({
        url: "/user/upload",
        data: file,
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
