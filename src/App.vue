<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <transition name="cartoon" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="less">
.app {
  height: 100%;
}
.change {
  display: inline-block;
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
  transition: opacity 1s ease;
}
/* 通过animation实现动画效果 */
// .btn-enter-active {
//   animation: animationChange 1s ease;
// }
// .btn-leave-active {
//   animation: animationChange 1s ease reverse;
// }

// /* 通过帧动画和缩放实现 显隐切换效果 */
// @keyframes animationChange {
//   0% {
//     transform: scale(0);
//   }
//   50% {
//     transform: scale(1.2);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
</style>
