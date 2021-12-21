<template>
  <div class="check">
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template #default="props">
          <p>ID: {{ props.row.id }}</p>
          <p>Author: {{ props.row.author }}</p>
          <p>label: {{ props.row.label }}</p>
          <p>content: {{ props.row.content }}</p>
        </template>
      </el-table-column>
      <el-table-column label="createTime" prop="createAt" />
      <el-table-column label="blogName" prop="name" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="Search by name" />
        </template>
        <template #default="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            >通过</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >不通过</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
        url: "/check/selectAll",
      })
      .then((res) => {
        this.tableData = res.data;
      });
  },
  data() {
    return {
      tableData: [],
      search: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      mxRequest
        .delete({
          url: "check/delete/" + row.id,
        })
        .then((res) => {
          if (res.data === "success") {
            this.tableData.splice(this.tableData.indexOf(row), 1);
            ElNotification({
              title: "Success",
              message: "删除成功",
              type: "success",
            });
          } else {
            ElNotification({
              title: "Failure",
              message: "审核失败",
              type: "failure",
            });
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
p {
  margin-left: 40px;
}
</style>
