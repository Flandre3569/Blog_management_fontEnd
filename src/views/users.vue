<template>
  <div class="users">
    <el-table
      :data="
        usersData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="Id" prop="id" />
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Password" prop="password" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户 -->
    <div class="footer">
      <!-- Form -->
      <el-button type="text" @click="dialogFormVisible = true"
        >点击添加用户</el-button
      >

      <!-- 消息弹窗内容 -->
      <el-dialog v-model="dialogFormVisible" title="添加用户">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="username" prop="pass">
            <el-input
              v-model="ruleForm.pass"
              type="text"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="password" prop="checkPass">
            <el-input
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >Submit</el-button
            >
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="15"
        :total="total"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import mxRequest from "@/service/index";
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
    });
    return {
      ...toRefs(state),
    };
  },
  created() {
    const _this = this;
    mxRequest
      .get({
        url: "users/selectAll/1/15",
      })
      .then((res) => {
        _this.usersData = res.data.content;
        _this.total = res.data.totalElements;
      });
  },
  data() {
    name: "users";
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the age"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please input digits"));
        } else {
          if (value < 18) {
            callback(new Error("Age must be greater than 18"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      usersData: [],
      search: "",
      total: null,
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    pageChange(currentPage) {
      const _this = this;
      mxRequest
        .get({
          url: "users/selectAll/" + currentPage + "/15",
        })
        .then((res) => {
          _this.usersData = res.data.content;
          _this.total = res.data.totalElements;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogTableVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
}
</style>
