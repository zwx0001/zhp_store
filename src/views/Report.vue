<template>
  <div class="report">
    <header>收益报表</header>
    <section>
      <div class="timepick">
        <span v-on:click="ckdate">
          请点击此处选择查询日期:
          <i class="iconfont icon-dianpu" style="fontSize:60px"></i>
        </span>
        <!-- <date-picker v-model="time1" range></date-picker> -->
        <calendar
          mode="during"
          closeByClickMask
          :show.sync="calendarShow"
          v-model="calendarShow"
          @change="handelChange"
        ></calendar>
      </div>
      <div class="tab">
        <p :class="idx===0?'active':''" v-on:click="tabindex(0)">销售</p>
        <p :class="idx===1?'active':''" v-on:click="tabindex(1)">利润</p>
        <p :class="idx===2?'active':''" v-on:click="tabindex(2)">支出</p>
      </div>
      <div v-if="idx===0" id="myChart" :style="{width:'700px',height:'700px'}"></div>
      <div v-if="idx===1" id="myChart" :style="{width:'700px',height:'700px'}"></div>
      <div v-if="idx===2" id="myChart" :style="{width:'700px',height:'700px'}"></div>
    </section>
  </div>
</template>
<script>
import DatePicker from "vue2-datepicker";

export default {
  name: "report",
  components: {
    DatePicker
  },
  data() {
    return {
      calendarShow: false,
      defaultDate: new Date(),
      time1: "",
      storeid: "",
      start_val: "",
      end_val: "",
      idx: 0,
      shortcuts: [
        {
          text: "Today",
          onClick: () => {
            this.time3 = [new Date(), new Date()];
          }
        }
      ],
      timePickerOptions: {
        start: "00:00",
        step: "00:30",
        end: "23:30"
      }
    };
  },
  created() {
    this.storeid = this.$router.history.current.query.storeid;
  },
  watch: {
    time1(n) {
      this.start_time = this.addZero(n[0].toLocaleDateString());
      this.end_time = this.addZero(n[1].toLocaleDateString());
      this.start_val = "2019-05-10";
      this.end_val = "2019-05-20";
    }
  },
  methods: {
    ckdate() {
      this.calendarShow = true;
    },
    handelChange(data) {
      if (data.length === 2) {
        this.start_val = data[0].format("YYYY-MM-DD");
        this.end_val = data[1].format("YYYY-MM-DD");
      }
    },
    addZero(str) {
      return str
        .split("/")
        .map(item => {
          if (item.length < 2) {
            return "0" + item;
          } else {
            return item;
          }
        })
        .join("-");
    },
    drawLine(data1, data2) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "销售报表",
          x: "center"
        },
        tooltip: {},
        xAxis: {
          data: data2
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: data1
          }
        ]
      });
    },
    drawCir(data1, data2) {
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: {
          text: "收益统计",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: data1
        },
        series: [
          {
            name: "收益",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: data2,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    drawZline(data, data1) {
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        xAxis: {
          type: "category",
          data: data1
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: data,
            type: "line"
          }
        ]
      });
    },
    submit() {
      //销售请求
      if (this.idx === 0 && this.start_val && this.end_val) {
        this.$http
          .get(
            `/store/statistics/count?from=${this.start_val}&to=${
              this.end_val
            }&store_id=${this.storeid}`
          )
          .then(data => {
            // console.log(data);
            if (data.code === 1) {
              let arr = data.result.map(item => {
                return Number(item.count);
              });

              let arr1 = data.result.map(item => {
                return item.date;
              });

              this.drawLine(arr, arr1);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.idx === 1 && this.start_val && this.end_val) {
        this.$http
          .get(
            `/store/statistics/profit?from=${this.start_val}&to=${
              this.end_val
            }&store_id=${this.storeid}`
          )
          .then(data => {
            // console.log(data);
            if (data.code === 1) {
              let arr = data.result.map(item => {
                return {
                  value: item.count,
                  name: item.date
                };
              });

              let arr1 = data.result.map(item => {
                return item.date;
              });

              this.drawCir(arr1, arr);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.idx === 2 && this.start_val && this.end_val) {
        this.$http
          .get(
            `/store/statistics/catcount?from=${this.start_val}&to=${
              this.end_val
            }&store_id=${this.storeid}`
          )
          .then(data => {
            // console.log(data);
            if (data.code === 1) {
              let arr = data.result.map(item => {
                return Number(item.value);
              });

              let arr1 = data.result.map(item => {
                return item.name;
              });

              this.drawZline(arr, arr1);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$alert("请选择日期");
      }
    },
    tabindex(i) {
      this.idx = i;
      this.submit();
    }
  }
};
</script>
<style lang="scss" scoped>
.report {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  section {
    flex: 1;
    overflow-y: auto;
    select {
      width: pxTorem(120px);
      height: pxTorem(30px);
      font-size: pxTorem(16px);
    }

    #myChart {
      margin: pxTorem(30px) auto;
    }
    .tab {
      width: 80%;
      height: pxTorem(40px);
      display: flex;
      justify-content: space-around;
      box-sizing: border-box;
      box-shadow: 0 0 pxTorem(10px) #ccc;
      font-size: pxTorem(16px);
      margin: 0 auto;
      align-items: center;
      margin-top: pxTorem(10px);
      p {
        height: 100%;
        text-align: center;
        flex: 1;
        line-height: pxTorem(40px);
      }
      .active {
        height: 100%;
        color: #fff;
        background: #fd7172;
      }
    }

    .timepick {
      font-size: pxTorem(16px);
      padding: pxTorem(10px);
      box-sizing: border-box;
      span {
        margin-right: pxTorem(20px);
      }
    }
  }
  header {
    width: 100%;
    height: pxTorem(44px);
    border-bottom: solid pxTorem(1px) #ccc;
    text-align: center;
    line-height: pxTorem(44px);
    font-size: pxTorem(18px);
    background: #fff;
  }
  footer {
    width: 100%;
    height: pxTorem(50px);
    border-top: solid pxTorem(1px) #ccc;
    font-size: pxTorem(18px);
    color: #fff;
    background: #f2922f;
    text-align: center;
    line-height: pxTorem(50px);
  }
}
</style>


