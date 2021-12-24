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
      <el-table-column label="CreateAt" prop="createAt" />
      <el-table-column label="UpdateAt" prop="updateAt" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="Search by name" />
        </template>
        <template #default="scope">
          <el-button size="mini" @click="edit(scope.row)">Edit</el-button>

          <el-popconfirm
            confirm-button-text="OK"
            cancel-button-text="No, Thanks"
            icon-color="red"
            title="Are you sure to delete this?"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button size="mini" type="danger">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户 -->
    <div class="footer">
      <!-- Form -->
      <el-button type="text" @click="dialogFormVisible = true"
        >点击添加用户</el-button
      >

      <!-- 添加用户消息弹窗内容 -->
      <el-dialog v-model="dialogFormVisible" title="添加用户">
        <el-form
          ref="userForm"
          :model="userForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="username" prop="name">
            <el-input
              v-model="userForm.name"
              type="text"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input
              v-model="userForm.password"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')"
              >Submit</el-button
            >
            <el-button @click="resetForm('userForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 修改用户弹窗内容 -->
      <el-dialog v-model="dialogUpdateForm" title="修改用户信息">
        <el-form
          ref="updateForm"
          :model="updateForm"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="username" prop="name">
            <el-input
              v-model="updateForm.name"
              type="text"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input
              v-model="updateForm.password"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="editForm()">Submit</el-button>
            <el-button @click="resetForm('updateForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mxRequest from "@/service/index";
import { reactive, toRefs, ref } from "vue";
import { ElNotification } from "element-plus";

export default {
  setup() {
    return {};
  },
  // 页面初始化渲染
  created() {
    const _this = this;
    mxRequest
      .get({
        url: "user/selectAll",
      })
      .then((res) => {
        _this.usersData = res.data;
      });
  },
  data() {
    name: "users";
    // 添加用户弹窗配置
    // 用户名
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the username"));
      } else {
        callback();
      }
    };
    // 密码
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.userForm.password !== "") {
          this.$refs.userForm.validateField("password");
        }
        callback();
      }
    };

    const state = reactive({
      dialogFormVisible: false,
      dialogUpdateForm: false,
      formLabelWidth: "120px",
    });
    return {
      usersData: reactive([]),
      ...toRefs(state),
      search: "",
      userForm: {
        name: "",
        password: "",
      },
      updateForm: {
        id: "",
        name: "",
        password: "",
      },
      // 添加用户规则配置
      rules: {
        name: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 添加用户弹窗设置
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          mxRequest
            .post({
              url: "users/addUser",
              data: _this.userForm,
            })
            .then((res) => {
              if (res.data === "success") {
                this.$router.go(0);
                ElNotification({
                  title: "Success",
                  message: "add successfully",
                  type: "success",
                });
              }
            });
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 修改用户信息
    edit(row) {
      const _this = this;
      mxRequest
        .get({
          url: "users/select/" + row.id,
        })
        .then((res) => {
          _this.updateForm = res.data;
        });
      this.dialogUpdateForm = true;
    },
    editForm() {
      const _this = this;
      mxRequest
        .patch({
          url: "users/update",
          data: _this.updateForm,
        })
        .then((res) => {
          if (res.data === "success") {
            ElNotification({
              title: "Success",
              message: "update successfully",
              type: "success",
            });
          }
        });
      this.dialogUpdateForm = false;
      this.$router.go(0);
    },
    // 删除用户
    handleDelete(row) {
      const _this = this;
      mxRequest
        .delete({
          url: "users/delete/" + row.id,
        })
        .then((res) => {
          if (res.status === 200) {
            this.usersData.splice(this.usersData.indexOf(row), 1);
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

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
}
</style>
