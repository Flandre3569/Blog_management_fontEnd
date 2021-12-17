<template>
  <div>
    <table>
      <ul>
        <li v-for="user in users" :key="user.id">{{ user }}</li>
      </ul>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import mxRequest from "@/service/index";
import { reactive } from "vue";

export default {
  setup() {
    const users = reactive([]);
    const renderUsers = () => {
      mxRequest
        .get({
          url: "users/selectAll",
        })
        .then((res) => {
          this.users = res.data;
        });
    };
    renderUsers();
    return { users };
  },
};
</script>

<style lang="scss" scoped>
</style>
