<template>
  <div class="label">
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag.id"
      closable
      :disable-transitions="true"
      @close="handleClose(tag)"
      size="medium"
    >
      {{ tag.name }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="saveTagInput"
      v-model="inputValue.name"
      class="input-new-tag"
      size="medium"
      @keyup.enter="handleInputConfirm"
      @blur="inputVisible = false"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="medium" @click="showInput"
      >+ New Tag</el-button
    >
  </div>
</template>

<script>
import mxRequest from "@/service/index";
import { reactive } from "vue";
export default {
  created() {
    const _this = this;
    mxRequest
      .get({
        url: "label/selectAll",
      })
      .then((res) => {
        _this.dynamicTags = res.data;
      });
  },
  data() {
    return {
      dynamicTags: reactive([]),
      inputVisible: false,
      inputValue: reactive({
        name: "",
      }),
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      mxRequest.delete({
        url: "/label/delete/" + tag.id,
      });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      mxRequest
        .post({
          url: "label/addLabel",
          data: inputValue,
        })
        .then((res) => {
          if (res.status === 200) {
            this.dynamicTags.push(res.data.name);
            this.$router.go(0);
          }
        });
      this.inputVisible = false;
      this.inputValue.name = "";
    },
  },
};
</script>

<style lang ="less" scoped>
.el-tag + .el-tag {
  /* margin-left: 100px; */
  margin: 50px;
}
.button-new-tag {
  margin-left: 100px;
  height: 30px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-tag {
  font-size: 20px;
}
</style>
