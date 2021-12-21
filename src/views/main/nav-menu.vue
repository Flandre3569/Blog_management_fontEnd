<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.png" alt="logo" />
      <span class="title">博客管理系统</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      background-color="#34495e"
      text-color="#ecf0f1"
      active-text-color="#d35400"
      router="true"
    >
      <el-sub-menu index="1">
        <template #title>
          <span>信息展示</span>
        </template>
        <el-menu-item index="/overview">
          <span>总览</span>
        </el-menu-item>
        <el-menu-item index="/technology">
          <span>技术栈</span>
        </el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/users">
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/blog">
          <span>博客管理</span>
        </el-menu-item>
        <el-menu-item index="/check">
          <span>博客审核</span>
        </el-menu-item>
        <el-menu-item index="/label">
          <span>标签管理</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 一级菜单 -->
      <el-menu-item index="/recycleBin">
        <span>操作日志</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <span>关于</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const store = useStore();

    // router
    const router = useRouter();
    const route = useRoute();
    // data
    return {};
  },
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #34495e !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #2c3e50 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #34495e !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #95a5a6 !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
