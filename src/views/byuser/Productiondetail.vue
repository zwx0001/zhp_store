<template>
  <div class="productiondetail">
    手机号:
    <input type="text" placeholder="请输入手机号" v-valid.number.required data-id="0">
    <!-- {{valid[0].err}}{{valid[0].success}} -->
    <br>用户名:
    <input type="text" placeholder="请输入用户名" v-valid.string.required data-id="1">
    <!-- {{valid[1].err}}{{valid[1].success}} -->
    <br>邮箱名:
    <input type="text" placeholder="请输入邮箱地址" v-valid.email.required data-id="2">
    <div>
      <p>复选框</p>
      <Checkbox v-model="value"></Checkbox>
    </div>
    <div class="createsku">
      <p>生成sku</p>
      <span style="marginRight:20px">请先选择分类:</span>
      <select v-model="cat_id" name="" id="" @change="(e)=>handlechange(e)">
        <option :value="i.cat_id" v-for="(i,k) in cat" v-bind:key="i.cat_id">{{i.cat_name}}</option>
      </select>
      <div class="option">
        <p>销售属性</p>
        <div class="option_con">
          <ul class="item" v-for="(i,k) in sku" :key="k">
            <div class="group">{{i.group}}</div>
            <li v-for="(v,m) in i.params" :key="m">
              <Checkbox v-model="v.flag"></Checkbox>
              <span>{{v.type}}</span>
            </li>
          </ul>
        </div>
        <div class="btn">
          <span @click="createsku">生成sku</span>
          <span>保存</span>
        </div>
      </div>
      <Table :sku="sku" :arr="skuarr"></Table>
    </div>
    <div class="mytable">
      <p style="text-align:center;font-size:30px;line-height:50px">我的表格</p>
      <Tables :data="tableData">
        <!-- <Tablehead type="index" label="#" slot="thead"></Tablehead> -->
        <Tablehead type="select" slot="thead">
          <Checkbox v-model="checked"></Checkbox>
        </Tablehead>
        <Tablehead prop="date" label="日期" slot="thead"></Tablehead>
        <Tablehead prop="name" label="姓名" slot="thead"></Tablehead>
        <Tablehead prop="address" label="地址" slot="thead"></Tablehead>
      </Tables>
    </div>
    <div class="slot">
      <Myslot>
        <template v-slot:num="{msg}">
          <span>{{msg.num}}</span>
        </template>
      </Myslot>
    </div>
  </div>
</template>
<script>
import Checkbox from "../../components/checkbox/checkbox";
import Table from "../../components/sku/skutable";
import { Tables, Tablehead } from "../../components/table/index";
import Myslot from "../../components/slot/slot";
import bus from "../../../bus.js";

export default {
  name: "productiondetail",
  data() {
    return {
      checked: false,
      telnumber: "",
      username: "",
      value: false,
      cat: [],
      cat_id: "",
      sku: [],
      skuarr: [],
      theaddata: [
        {
          key: "date",
          label: "日期"
        },
        {
          key: "name",
          label: "姓名"
        },
        {
          key: "address",
          label: "地址"
        }
      ],
      tableData: [
        {
          name: "张三",
          address: "北京",
          date: "2016"
        },
        {
          date: "2018",
          name: "李四",
          address: "天津"
        },
        {
          date: "2017",
          name: "王小虎",
          address: "山西"
        },
        {
          date: "2019",
          name: "王五",
          address: "河北"
        }
      ]
    };
  },
  watch: {
    value(n) {
      console.log(n);
    },
    checked(n) {
      bus.$emit("ckall", n);
    }
  },
  components: {
    Checkbox,
    Table,
    Tables,
    Tablehead,
    Myslot
  },
  created() {
    // console.log(this.$store.state);
    this.$http //获取分类
      .post("/store/goods/cat.list", {
        store_id: "b4f01938b537768d5b4637bc5a8f842b"
      })
      .then(data => {
        // console.log(data);
        if (data.code === 1) {
          // console.log(this.cat);
          this.cat = data.result;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handlechange(e) {
      //请求sku模板
      this.$http
        .post("/store/goods/sku.get", {
          store_id: "b4f01938b537768d5b4637bc5a8f842b",
          cat_id: this.cat_id
        })
        .then(data => {
          if (data.code === 1) {
            this.sku = JSON.parse(data.sku.sku_json_tpl);
            // console.log(data);
            this.sku = this.sku.map(item => {
              item.params = item.params.map(i => {
                i = {
                  type: i,
                  flag: false
                };
                return i;
              });
              return item;
            });
            // console.log(this.sku);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    createsku() {
      let arr = [];
      this.sku.map((item, index) => {
        arr[index] = [];
        item.params.map((i, v) => {
          if (i.flag) {
            arr[index].push(i.type);
          }
        });
      });
      this.skuarr = [];
      this.skuarr = descartes(arr);
      function descartes(array) {
        if (array.length < 2) return array[0] || [];
        return [].reduce.call(array, function(col, set) {
          var res = [];
          col.forEach(function(c) {
            set.forEach(function(s) {
              var t = [].concat(Array.isArray(c) ? c : [c]);
              t.push(s);
              res.push(t);
            });
          });
          return res;
        });
      }

      // console.log(this.skuarr);
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  display: inline-block;
  padding: pxTorem(10px);
  border: solid pxTorem(1px) #ccc;
}
.errclass {
  border: solid pxTorem(1px) red;
}
.successclass {
  border: solid pxTorem(1px) green;
}

select {
  display: inline-block;
  width: pxTorem(200px);
  height: pxTorem(30px);
  font-size: pxTorem(20px);
}
.createsku {
  font-size: pxTorem(16px);
  p {
    text-align: center;
    line-height: pxTorem(30px);
  }
  .option {
    width: 90%;

    box-shadow: 0 0 pxTorem(10px) #ccc;
    padding: pxTorem(10px);
    margin: pxTorem(20px) auto;
    .btn {
      width: 100%;
      display: flex;
      justify-content: space-around;

      span {
        background: green;
        color: #fff;
        border-radius: pxTorem(10px);
        padding: pxTorem(5px) pxTorem(20px);
      }
    }
    .item {
      width: 100%;
      display: flex;
      margin-bottom: pxTorem(20px);
      flex-wrap: wrap;
      div.group {
        margin-right: pxTorem(20px);
        flex-shrink: 0;
      }
      li {
        margin-right: pxTorem(10px);
        display: flex;

        span {
          margin-left: pxTorem(6px);
        }
      }
    }
  }
}
.mytable {
  margin-top: pxTorem(20px);
}
</style>

