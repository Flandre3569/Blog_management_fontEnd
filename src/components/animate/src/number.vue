<template>
  <div class="scroll-number">
    <transition-group class="scroll-number-box" name="list" tag="p">
      <div
        v-for="(item, index) in numList"
        :style="{
          left: index * marginBetween + 'px',
          'transition-delay': 0.1 * index + 's',
        }"
        :key="item + index"
      >
        {{ item }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
export default {
  props: {
    numList: {
      type: Array,
      default: [],
      require: true,
    },
    marginBetween: {
      type: Number,
      default: 20,
    },
  },
};
</script>

<style lang="less" scoped>
.scroll-number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &-box {
    position: relative;

    > div {
      position: absolute;
      display: inline-block;
    }
  }

  .list-enter-active,
  .list-leave-active {
    transition: transform 1s ease, opacity 1s ease;
  }

  .list-enter-from {
    opacity: 0;
    transform: translateY(50%);
  }

  .list-leave-to {
    opacity: 0;
    transform: translateY(-50%);
  }
}
</style>
