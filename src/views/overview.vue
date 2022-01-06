<template>
  <div class="overview">
    <el-row :gutter="20">
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-card shadow="always" id="userCount">
            <div class="value">用户数:{{ changeUserNumber }}</div>
          </el-card>
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-card shadow="always" id="blogCount">
            <div class="value">博客数:{{ changeBlogNumber }}</div>
          </el-card>
        </div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-card shadow="always" id="labelCount"
            ><div class="value">标签数:{{ changeLabelNumber }}</div></el-card
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
import { TweenLite, Power2, TimelineLite } from "gsap";
export default {
  name: "hello",
  created() {},
  // components: {
  //   countTo,
  // },
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
      userNumber: 0,
      blogNumber: 0,
      labelNumber: 0,
      NumberShow: false, //数字是否显示
    };
  },
  mounted() {
    this.drawLine();
    this.drawPie();
  },
  computed: {
    changeUserNumber() {
      return this.userNumber.toFixed(2);
    },
    changeBlogNumber() {
      return this.blogNumber.toFixed(2);
    },
    changeLabelNumber() {
      return this.labelNumber.toFixed(2);
    },
  },
  methods: {
    formatter: function (num) {
      return num.toFixed(2);
    },
    //动态数字
    DigitalLoad() {
      // 0.5 为变化时间
      TweenLite.to(this.$data, 1, { userNumber: this.userCount });
      TweenLite.to(this.$data, 1, { blogNumber: this.blogCount });
      TweenLite.to(this.$data, 1, { labelNumber: this.labelCount });
    },

    startAnimate: function () {
      this.$refs.myNum.start();
    },
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
      await this.DigitalLoad();
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
// .box {
//   width: 200px;
//   padding: 40px 0;
//   text-align: center;
//   position: absolute;
//   top: calc(50% - 50px);
//   left: calc(50% - 50px);
//   box-shadow: 2px 2px 3px #ccc;
//   .value {
//     font-size: 30px;
//     margin-bottom: 10px;
//     color: #409eff;
//     //   color: #f4f4f4;
//     //  text-shadow: -1px -1px white, 1px 1px rgb(190, 190, 190), 2px 2px #949494, 3px 3px #8d8c8c;
//   }
// }
</style>
