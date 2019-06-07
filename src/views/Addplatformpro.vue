<template>
  <div class="productlist">
    <header>添加平台商品
      <router-link to="/applylist">
        <span>申请列表</span>
      </router-link>
    </header>
    <section>
      <div class="search">
        <input type="text" placeholder="请输入商品名称">
      </div>
      <div class="main">
        <div class="item" v-for="(i,k) in list" v-bind:key="k">
          <div class="item_top">
            <input type="checkbox" :checked="i.isTrue" v-on:change="handleChange(k)">
            <img class="pic1" :src="i.cart_image" alt="">
            <p>{{i.goods_name}}</p>
            <img
              class="pic2"
              src="../assets/images/row_right.png"
              alt=""
              v-on:click="goproductdetail(i)"
            >
          </div>
          <div class="item_bottom">
            <p>
              <span>商品编号:</span>
              <span>{{i.goods_id}}</span>
            </p>
            <p>
              <span>售价:</span>
              <span>{{i.price}}.00</span>
            </p>
          </div>
          <p v-on:click="amend(i.goods_name,i.price,i.goods_id)">修改</p>
        </div>
      </div>
    </section>
    <footer>
      <label for="ckall">
        <input type="checkbox" id="ckall" v-model="ckall" v-on:change="handleChangeckall">
        <span>全选</span>
      </label>
      <p>选择分类</p>
    </footer>
    <!-- 修改商品 -->
    <Dialog class="xg" title="修改商品信息" v-show="isShowxg" :isShowFn="isShowFn">
      <p>
        ☻
        <input placeholder="请输入商品名字" class="ipt" v-model="goodname">
      </p>
      <p>
        ￥
        <input placeholder="请输入销售价格" class="ipt" v-model="price">
      </p>
    </Dialog>
  </div>
</template>

<script>
import formData from "../utils/formdata";
import Dialog from "@/components/Dialog";
let oldname = "";
let oldprice = "";
export default {
  name: "productlist",
  data() {
    return {
      ckall: false,
      list: [],
      isShowxg: false,
      price: "",
      goodname: "",
      goods_id: ""
    };
  },
  components: {
    Dialog
  },
  created() {
    this.$http
      .post("/store/goods/list", {
        store_id: this.$route.query.storeid
      })
      .then(data => {
        // console.log(data);
        if (data.code === 1) {
          data.result.forEach(item => {
            item.isTrue = false;
          });
          this.list = data.result;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleChangeckall() {
      this.list.forEach((item, index) => {
        item.isTrue = this.ckall;
      });
    },
    handleChange(k) {
      this.list[k].isTrue = !this.list[k].isTrue;
      let arr = this.list.filter(item => {
        return !item.isTrue;
      });
      if (arr.length <= 0) {
        this.ckall = true;
      } else {
        this.ckall = false;
      }
    },
    goproductdetail(data) {
      this.$router.push({
        path: "/productdetail",
        query: data
      });
    },
    amend(name, price, id) {
      oldname = name;
      oldprice = price;
      this.price = price;
      this.goodname = name;
      this.goods_id = id;
      this.isShowxg = true;
    },
    isShowFn(flag) {
      this.isShowxg = false;
      if (flag) {
        if (this.price !== oldprice || this.goodname !== oldname) {
          this.$http
            .post("/store/goods/edit", {
              goods_id: this.goods_id,
              goods_name: this.goodname,
              price: this.price
            })
            .then(data => {
              // console.log(data);
              this.list.forEach(item => {
                if (item.goods_id === this.goods_id) {
                  let { goods_name, price, update_time } = data.params;
                  item.goods_name = goods_name;
                  item.price = price;
                  item.update_time = update_time;
                  this.$message(data.msg);
                }
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.productlist {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  section {
    flex: 1;
    overflow-y: auto;
    .search {
      width: 100%;
      height: pxTorem(50px);
      display: flex;
      justify-content: space-around;
      border-bottom: solid pxTorem(1px) #ccc;
      align-items: center;
      input {
        width: 90%;
        height: 70%;
        border: 0;
        border-radius: pxTorem(25px);
        background: #eee;
        padding: 0 pxTorem(10px);
        box-shadow: border-box;
        font-size: pxTorem(14px);
      }
    }
    .main {
      width: 100%;
      .item {
        width: 95%;
        margin: pxTorem(10px) auto;
        box-shadow: 0 0 pxTorem(10px) #ccc;
        border-radius: pxTorem(5px);
        position: relative;
        .item_top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8f8f8;
          padding: pxTorem(5px) pxTorem(10px);
          input {
            width: pxTorem(20px);
            height: pxTorem(20px);
            margin-right: pxTorem(10px);
          }
          .pic1 {
            width: pxTorem(50px);
            height: pxTorem(50px);
            border-radius: pxTorem(3px);
          }
          p {
            flex: 1;
            font-size: pxTorem(16px);
            margin-left: pxTorem(10px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .item_bottom {
          padding: pxTorem(5px) pxTorem(10px);
          font-size: pxTorem(14px);
          p {
            line-height: pxTorem(24px);
            span:nth-child(1) {
              color: gray;
              display: inline-block;
              width: pxTorem(65px);
            }
          }
        }
        > p {
          position: absolute;
          right: pxTorem(10px);
          bottom: pxTorem(10px);
          color: #f2922f;
          font-size: pxTorem(14px);
        }
        .pic2 {
          height: pxTorem(25px);
        }
      }
    }
  }
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
      float: right;
    }
  }
  footer {
    width: 100%;
    height: pxTorem(50px);
    font-size: pxTorem(18px);
    text-align: center;
    line-height: pxTorem(50px);
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 pxTorem(10px) #ccc;
    label {
      flex: 1;
      input {
        display: inline-block;
        width: pxTorem(20px);
        height: pxTorem(20px);
        vertical-align: center;
        margin-right: pxTorem(8px);
      }
    }
    p {
      width: pxTorem(120px);
      color: #fff;
      background: #f2922f;
    }
  }
  .xg {
    p {
      font-size: pxTorem(18px);
      background: #eee;
      margin-bottom: pxTorem(8px);
      padding: pxTorem(10px) 0;
      border-radius: pxTorem(4px);
      input {
        background: #eee;
      }
    }
  }
}
</style>

