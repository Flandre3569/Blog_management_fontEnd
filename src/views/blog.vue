<template>
  <div class="blog">
    <el-row :gutter="20">
      <el-col :span="24" v-for="blog in blogData" :key="blog.id"
        ><el-card shadow="hover">
          <el-descriptions title="BlogName">
            <el-descriptions-item label="Id">{{
              blog.id
            }}</el-descriptions-item>
            <el-descriptions-item label="author">{{
              blog.author_id
            }}</el-descriptions-item>

            <el-descriptions-item label="Label">
              <el-tag size="small">{{ blog.label_id }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="content">{{
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
      :page-size="15"
      :total="total"
    >
      >
    </el-pagination>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
import mxRequest from "@/service/index";
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
      numberOfElements: 0,
    };
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
</style>
