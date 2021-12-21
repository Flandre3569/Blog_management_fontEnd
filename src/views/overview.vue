<template>
  <div class="overview">
    <el-row :gutter="20">
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-card shadow="always"> Always </el-card>
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-card shadow="always"> Always </el-card>
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-card shadow="always"> Always </el-card>
        </div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <el-card shadow="always"> Always </el-card>
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <el-card shadow="always"> Always </el-card>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {};
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
