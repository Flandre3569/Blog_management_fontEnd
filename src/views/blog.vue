<template>
  <div class="blog">
    <el-row :gutter="20">
      <el-col :span="24" v-for="blog in blogData" :key="blog.id"
        ><el-card shadow="hover">
          <el-descriptions
            :title="blog.name"
            class="margin-top"
            :column="3"
            :size="size"
            border
          >
            <template #extra>
              <el-button type="primary" size="small" @click="deleteBlog(blog)"
                >删除博客</el-button
              >
            </template>
            <el-descriptions-item label="id:">{{
              blog.id
            }}</el-descriptions-item>
            <el-descriptions-item label="author:">{{
              blog.author.name
            }}</el-descriptions-item>

            <el-descriptions-item label="label:">
              <el-tag size="small">{{ blog.label.name }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="content:">{{
              blog.content
            }}</el-descriptions-item>
          </el-descriptions></el-card
        ></el-col
      >
    </el-row>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="5"
      :total="total"
      @current-change="pageChange"
    >
      >
    </el-pagination>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
import mxRequest from "@/service/index";
import { ref } from "vue";

export default {
  created() {
    const _this = this;
    mxRequest
      .get({
        url: "blog/selectAll/1/5",
      })
      .then((res) => {
        _this.blogData = res.data.content;
        _this.total = res.data.totalElements;
        _this.numberOfElements = res.data.totalElements;
      });
  },
  data() {
    return {
      blogData: [],
      numberOfElements: ref(0),
      total: ref(0),
      size: ref(""),
    };
  },
  methods: {
    pageChange(currentPage) {
      const _this = this;
      mxRequest
        .get({
          url: "blog/selectAll/" + currentPage + "/5",
        })
        .then((res) => {
          _this.blogData = res.data.content;
          _this.total = res.data.totalElements;
          _this.numberOfElements = res.data.totalElements;
        });
    },
    deleteBlog(blog) {
      mxRequest
        .delete({
          url: "blog/delete/" + blog.id,
        })
        .then((res) => {
          if (res.status === 200) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(blog), 1);
            ElNotification({
              title: "Success",
              message: "删除成功",
              type: "success",
            });
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
