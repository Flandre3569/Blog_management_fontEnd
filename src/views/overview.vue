<template>
  <div class="overview">
    <el-row :gutter="20">
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-card shadow="always" id="userCount">
            <h2>用户数:{{ userCount }}</h2>
          </el-card>
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-card shadow="always" id="blogCount">
            <h2>博客数:{{ blogCount }}</h2>
          </el-card>
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-card shadow="always" id="labelCount"
            ><h2>标签数:{{ labelCount }}</h2></el-card
          >
        </div></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <el-card shadow="always" id="lineChart"> Always </el-card>
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <el-card shadow="always" id="pieChart"> Always </el-card>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import * as echarts from "echarts";
import { overviewPie, overviewLine } from "./p-config/overviewPie";
import mxRequest from "@/service/index";
export default {
  name: "hello",
  created() {},
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      overviewPie,
      overviewLine,
      userCount: ref(0),
      blogCount: ref(0),
      checkCount: ref(0),
      labelCount: ref(0),
      classifyBlog: reactive([]),
    };
  },
  mounted() {
    this.drawLine();
    this.drawPie();
  },
  methods: {
    async drawLine() {
      const _this = this;
      await mxRequest
        .get({
          url: "/user/countUser",
        })
        .then((res) => {
          _this.userCount = res.data;
        });
      await mxRequest
        .get({
          url: "/blog/countBlog",
        })
        .then((res) => {
          _this.blogCount = res.data;
        });
      await mxRequest
        .get({
          url: "/check/countCheck",
        })
        .then((res) => {
          _this.checkCount = res.data;
        });
      await mxRequest
        .get({
          url: "/label/countLabel",
        })
        .then((res) => {
          _this.labelCount = res.data;
        });
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("lineChart"));
      // 绘制图表
      await setTimeout(() => {
        myChart.setOption({
          title: { text: "数据统计" },
          tooltip: {},
          xAxis: {
            data: ["用户", "博客", "待审核博客", "标签"],
          },
          yAxis: {},
          series: [
            {
              name: "数量",
              type: "bar",
              data: [
                this.userCount,
                this.blogCount,
                this.checkCount,
                this.labelCount,
              ],
            },
          ],
        });
      }, 0);
    },
    async drawPie() {
      await mxRequest
        .get({
          url: "/blog/classify",
        })
        .then((res) => {
          this.classifyBlog = res.data;
        });

      const piePatternSrc = overviewLine;
      const bgPatternSrc = overviewPie;
      const piePatternImg = new Image();
      piePatternImg.src = piePatternSrc;
      const bgPatternImg = new Image();
      bgPatternImg.src = bgPatternSrc;

      let myChart = echarts.init(document.getElementById("pieChart"));
      setTimeout(() => {
        myChart.setOption({
          backgroundColor: {
            image: bgPatternImg,
            repeat: "repeat",
          },
          title: {
            text: "博客分类统计",
            textStyle: {
              color: "#235894",
            },
          },
          tooltip: {},
          series: [
            {
              name: "pie",
              type: "pie",
              selectedMode: "single",
              selectedOffset: 30,
              clockwise: true,
              label: {
                fontSize: 18,
                color: "#235894",
              },
              labelLine: {
                lineStyle: {
                  color: "#235894",
                },
              },
              data: this.classifyBlog,
              itemStyle: {
                opacity: 0.7,
                color: {
                  image: piePatternImg,
                  repeat: "repeat",
                },
                borderWidth: 3,
                borderColor: "#235894",
              },
            },
          ],
        });
      }, 0);
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

#lineChart,
#pieChart {
  height: 500px;
}
#userCount,
#blogCount,
#labelCount {
  height: 200px;
  font-size: 50px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: cornflowerblue;
  display: flex;
  align-items: center;
}
</style>
