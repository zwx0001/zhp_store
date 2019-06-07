<template>
  <div class="addproduct">
    <header>
      添加商品
      <span v-on:click="addplatpro">添加平台商品</span>
    </header>
    <section id="box">
      <div class="item">
        <span>商品名称</span>
        <input type="text" placeholder="选择商品名称" v-model="goods_name">
      </div>
      <div class="item">
        <span>选择分类</span>
        <select name="" id="" v-model="cat_id" @change="selectcatid">
          <option :value="i.cat_id" v-for="(i,k) in catlist" v-bind:key="i.cat_id">{{i.cat_name}}</option>
        </select>
      </div>
      <div class="prodetail">
        <div class="item">
          <span>商品售价</span>
          <input type="text" placeholder="请输入商品售价" v-model="price">
        </div>
        <div class="item">
          <span>商品市场价</span>
          <input type="text" placeholder="请输入商品市场价" v-model="market_price">
        </div>
        <div class="item">
          <span>商品成本价</span>
          <input type="text" placeholder="请输入商品成本价" v-model=" cost_price">
        </div>
        <div class="item">
          <span>商品条码</span>
          <input type="text" placeholder="请输入商品条码(选填)" v-model="code_bar">
        </div>
      </div>
      <div class="proimg">
        <p>
          商品图片
          <span style="font-size:25px">(可以上传多张图片)</span>
        </p>
        <div class="proimg_box">
          <li v-for="(i,k) in proimg" v-bind:key="k">
            <img :src="i.url" alt="">
            <span v-on:click="closeproimg(k)">X</span>
          </li>
        </div>
        <dl class="upload">
          <dt>+</dt>
          <dd>上传图片</dd>
          <input type="file" name="files" v-on:change="(e)=>uploadbanner(e)" multiple>
        </dl>
        <p>购物车图（必选）</p>
        <dl class="upload">
          <dt>+</dt>
          <dd>上传图片</dd>
          <img :src="shopcarimg" alt="">
          <input type="file" name="files" v-on:change="(e)=>uploadshop(e,'car')">
        </dl>
        <p>商品详情</p>
        <dl class="upload" style="width:100%">
          <dt>+</dt>
          <dd>上传图片</dd>
          <img :src="prodetailimg" alt="">
          <input type="file" name="files" v-on:change="(e)=>uploadshop(e,'detail')">
        </dl>
        <textarea name="" id="" placeholder="请对您的商品进行描述" v-model="detail"></textarea>
      </div>
      <div class="option">
        <p style="text-align:center;margin-bottom:50px">销售属性</p>
        <div class="option_con">
          <ul class="item" v-for="(i,k) in pro" :key="k">
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
      <Table :sku="pro" :arr="skuarr"></Table>
    </section>
    <footer v-on:click="applysale">申请上架</footer>
    <Skusheet :flag="skuvisible" :actionsheet="actionsheet" @close="close"></Skusheet>
  </div>
</template>
<script>
import formData from "../utils/formdata";
import Skusheet from "../components/skusheet/Skusheet";
import Skutable from "../components/skusheet/skutable";
import Table from "../components/sku/skutable";
import Checkbox from "../components/checkbox/checkbox";
export default {
  name: "addproduct",
  components: {
    Skusheet,
    Skutable,
    Table,
    Checkbox
  },
  data() {
    return {
      skuarr: [],
      arr: [],
      idx: "",
      tabledata: [],
      skuvisible: false,
      imgUrl: [],
      listlen: [],
      shopcarimg: "", //cart_image
      proimg: [], //image
      prodetailimg: "",
      pro: [],
      addskupro: [
        {
          pro: "",
          type: ""
        }
      ],
      catlist: [],
      goods_name: "",
      cat: "",
      price: "",
      detail: "",
      sku: "",
      cat_id: "",
      market_price: "",
      cost_price: "",
      code_bar: "",
      actionsheet: []
    };
  },
  created() {
    this.$http
      .post("/store/goods/cat.list", {
        store_id: this.$route.query.storeid
      })
      .then(data => {
        if (!data.result.length) {
          this.$alert("请先去分类管理填写分类");
          this.$router.back();
          return;
        }
        if (data.code === 1) {
          this.catlist = data.result;
        }
        // console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    selectcatid() {
      let pro = this.catlist.filter(item => {
        return item.cat_id === this.cat_id;
      });
      this.cat = pro[0].cat_name;
      // console.log(this.cat_id);
      this.$http
        .post("/store/goods/sku.get", {
          store_id: this.$route.query.storeid,
          cat_id: this.cat_id
        })
        .then(data => {
          if (data.code === 1) {
            // console.log(data);
            let sku = JSON.parse(data.sku.sku_json_tpl);
            this.pro = sku;
            this.pro = this.pro.map(item => {
              item.params = item.params.map(i => {
                i = {
                  type: i,
                  flag: false
                };
                return i;
              });
              return item;
            });
          }
          // console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeimg(id) {
      let arr = this.imgUrl.map((item, index) => {
        if (item.id === id) {
          item.isTrue = false;
        }
        return item;
      });

      this.imgUrl = arr;
    },
    addsku() {
      this.addskupro.push({
        pro: "",
        type: ""
      });
    },
    cancelweight(k) {
      let arr = this.listlen;
      arr.forEach((item, index) => {
        if (index === k) {
          arr.splice(index, 1);
        }
      });
    },
    uploadbanner(e) {
      let formdata = new FormData();
      for (let i in e.target.files) {
        formdata.append("files", e.target.files[i]);
      }

      this.$http
        .post(`/upload?store_id=${this.$route.query.storeid}`, formdata)
        .then(data => {
          if (data.code === 1) {
            this.proimg = [...this.proimg, ...data.url];
          } else {
            alert(data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeproimg(k) {
      this.proimg.splice(k, 1);
    },
    uploadshop(e, style) {
      let formdata = new FormData();
      formdata.append("files", e.target.files[0]);
      this.$http
        .post(`/upload?store_id=${this.$route.query.storeid}`, formdata)
        .then(data => {
          if (data.code === 1) {
            if (style === "car") {
              this.shopcarimg = data.url[0].url;
            } else {
              this.prodetailimg = data.url[0].url;
            }
          } else {
            alert(data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    applysale() {
      if (
        this.$route.query.storeid &&
        this.goods_name &&
        this.cat &&
        this.price &&
        JSON.stringify(this.proimg) &&
        this.detail &&
        this.cat_id &&
        this.shopcarimg
      ) {
        this.$loading.start();
        this.$http
          .post("/store/goods/create", {
            store_id: this.$route.query.storeid,
            goods_name: this.goods_name,
            cat: this.cat,
            price: this.price,
            image: JSON.stringify(this.proimg),
            detail: this.detail,
            cat_id: this.cat_id,
            cart_image: this.shopcarimg,
            sku: JSON.stringify(this.skuarr),
            market_price: this.market_price,
            cost_price: this.cost_price,
            code_bar: this.code_bar,
            type: "0"
          })
          .then(data => {
            if (data.code === 1) {
              this.$message("添加成功");
              this.$loading.end();
              this.$router.push({
                path: "/storeindex",
                query: this.$route.query
              });
            }
            // console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message("请填写完整信息");
      }
    },
    addplatpro() {
      this.$router.push({
        path: "/addplatformpro",
        query: this.$route.query
      });
    },
    handlechangesheet(i, idx) {
      this.skuvisible = true;
      this.actionsheet = i.params;
      this.idx = idx;
    },
    close(d) {
      this.skuvisible = false;
      if (d) {
        this.arr[this.idx] = d;
      }
    },
    addsure() {
      for (let i = 0; i < this.arr.length; i++) {
        if (!this.arr[i]) {
          this.$message("请填写完整信息");
          return;
        }
      }
      if (this.arr.length < this.pro.length) {
        this.$message("请填写完整信息");
        return;
      }

      this.tabledata.push(this.arr);
      this.arr = [];
    },
    createsku() {
      let arr = [];
      this.pro.map((item, index) => {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.addproduct {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: #fff;
  header {
    width: 100%;
    height: pxTorem(44px);
    border-bottom: solid pxTorem(1px) #ccc;
    text-align: center;
    line-height: pxTorem(44px);
    font-size: pxTorem(16px);
    padding: 0 pxTorem(10px);
    box-sizing: border-box;
    span {
      font-size: pxTorem(13px);
      float: right;
    }
  }
  footer {
    width: 100%;
    height: pxTorem(50px);
    background: #f2922f;
    font-size: pxTorem(18px);
    text-align: center;
    line-height: pxTorem(50px);
    color: #fff;
  }
  section {
    flex: 1;
    font-size: pxTorem(16px);
    overflow-y: auto;
    padding-bottom: pxTorem(10px);
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
          position: relative;
          top: pxTorem(-8px);
        }
        li {
          margin-right: pxTorem(10px);
          display: flex;
          span {
            margin-left: pxTorem(6px);
            position: relative;
            top: pxTorem(-8px);
          }
        }
      }
    }
    textarea {
      width: 100%;
      font-size: pxTorem(20px);
      height: pxTorem(150px);
      border: solid pxTorem(1px) #ccc;
    }
    .upload {
      width: pxTorem(100px);
      height: pxTorem(100px);
      border: dashed pxTorem(1px) #ccc;
      text-align: center;
      position: relative;
      color: gray;
      margin: pxTorem(8px) 0;
      dt {
        font-size: pxTorem(50px);
      }
      input {
        display: inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    h3 {
      margin-left: 30%;
      display: inline-block;
      padding: pxTorem(5px) pxTorem(10px);
      background: #5adad0;
      color: #fff;
      font-size: pxTorem(12px);
      border-radius: pxTorem(6px);
    }
    .prodetail {
      width: 90%;
      margin: pxTorem(10px) auto;
      box-shadow: 0 0 pxTorem(10px) #ccc;
      border-radius: pxTorem(5px);
      position: relative;
      padding: pxTorem(6px);
      .type {
        display: flex;
        justify-content: space-between;
      }
      > b {
        line-height: pxTorem(35px);
      }
      select {
        display: inline-block;
        width: pxTorem(150px);
        height: pxTorem(30px);
        font-size: pxTorem(16px);
      }
      > span {
        background: rgba(0, 0, 0, 0.8);
        border-radius: 50%;
        color: #fff;
        display: inline-block;
        width: pxTorem(16px);
        height: pxTorem(16px);
        font-size: pxTorem(12px);
        text-align: center;
        line-height: pxTorem(16px);
        position: absolute;
        right: pxTorem(-5px);
        top: pxTorem(-5px);
      }
      h3 {
        margin-left: 40%;
        display: inline-block;
        padding: pxTorem(5px) pxTorem(10px);
        background: #5adad0;
        color: #fff;
        font-size: pxTorem(12px);
        border-radius: pxTorem(6px);
      }

      .weight {
        display: flex;
        justify-content: space-around;
        span {
          flex-shrink: 0;
          margin-right: pxTorem(10px);
        }
      }
      > p {
        line-height: pxTorem(30px);
        padding: 0 pxTorem(10px);
        box-sizing: border-box;
      }
      .upload {
        margin-left: pxTorem(10px);
        margin-bottom: pxTorem(10px);
      }
    }
    .item {
      border-bottom: solid pxTorem(1px) #ccc;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 pxTorem(10px);
      box-sizing: border-box;
      line-height: pxTorem(40px);
      .time {
        input {
          width: pxTorem(100px);
        }
      }
      select {
        width: pxTorem(100px);
        display: inline-block;
        height: pxTorem(30px);
        border: solid pxTorem(1px) #ccc;
        font-size: pxTorem(14px);
      }
    }
  }
  .proimg {
    width: 100%;
    padding: pxTorem(10px);
    box-sizing: border-box;

    > p {
      line-height: pxTorem(30px);
    }
    .proimg_box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 32%;
        list-style: none;
        position: relative;
        span {
          background: rgba(0, 0, 0, 0.8);
          border-radius: 50%;
          color: #fff;
          display: inline-block;
          width: pxTorem(16px);
          height: pxTorem(16px);
          font-size: pxTorem(12px);
          text-align: center;
          line-height: pxTorem(16px);
          position: absolute;
          right: pxTorem(5px);
          top: pxTorem(5px);
        }
      }
      img {
        width: 100%;
        height: pxTorem(100px);
      }
    }
  }
}
</style>

