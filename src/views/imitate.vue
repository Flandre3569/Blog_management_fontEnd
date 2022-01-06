<template>
  <div class="imitate">
    <el-form ref="formRef" :model="blogEntity" label-width="40px">
      <el-form-item>
        <el-input v-model="blogEntity.name" placeholder="博客主题"></el-input>
      </el-form-item>
      <br />
      <editor v-model="content"></editor>
      <br />
      <el-form-item>
        <el-select
          v-model="blogEntity.author.name"
          placeholder="作者"
          @change="currentAuthor($event)"
        >
          <el-option
            v-for="item in blogEntity.author"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>

        <el-select
          v-model="blogEntity.label.name"
          placeholder="标签"
          @change="currentLabel($event)"
        >
          <el-option
            v-for="item in blogEntity.label"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(formRef)"
          >发布博客</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import Editor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import mxRequest from "@/service/index";
import { ElNotification } from "element-plus";

export default defineComponent({
  name: "VueTemplateDemo",
  components: { Editor },
  created() {
    mxRequest
      .get({
        url: "label/selectAll",
      })
      .then((res) => {
        this.blogEntity.label = res.data;
      });
    mxRequest
      .get({
        url: "user/selectAll",
      })
      .then((res) => {
        this.blogEntity.author = res.data;
      });
  },

  data() {
    return {
      blogEntity: reactive({
        name: "",
        author: "",
        label: "",
      }),
      author: "",
      label: "",
      content: ref(""),
    };
  },
  setup() {
    const formRef = ref();
    return {
      formRef,
      size: ref("medium"),
    };
  },
  methods: {
    onSubmit() {
      let blogData = {
        name: this.blogEntity.name,
        content: this.content,
        author: this.author,
        label: this.label,
      };
      console.log(blogData);
      mxRequest
        .post({
          url: "blog/addBlog",
          data: blogData,
        })
        .then((res) => {
          if (res.data === "success") {
            ElNotification({
              title: "Success",
              message: "发布成功",
              type: "success",
            });
          }
        });
    },
    currentAuthor(value) {
      this.author = value;
    },
    currentLabel(value) {
      this.label = value;
    },
  },
});
</script>

<style lang="less">
.about {
  text-align: left;
}
.el-form-item {
  display: flex;
  text-align: left;
  margin: 0;
}
</style>
