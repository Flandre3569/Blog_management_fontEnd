<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="210px">
        <nav-menu></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <el-page-header :content="this.$route.name" @back="goBack" />
          <user-info />
        </el-header>
        <el-main class="page-content">
          <div class="page-router">
            <router-view v-slot="{ Component }">
              <transition name="cartoon" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import navMenu from "./nav-menu.vue";
import userInfo from "./user-info.vue";

export default defineComponent({
  components: {
    navMenu,
    userInfo,
  },
  setup() {
    return {
      visible: ref(false),
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
});
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
  .page-router {
    background-color: #f5f6fa;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}

.el-avatar {
  margin-right: 20px;
  cursor: pointer;
}

/* 实现淡入淡出动画 */
.cartoon-enter-from,
.cartoon-leave-to {
  opacity: 0;
}

.cartoon-enter-to,
.cartoon-leave-from {
  opacity: 1;
}

.cartoon-enter-active,
.cartoon-leave-active {
  transition: opacity 0.5s ease;
}
</style>
