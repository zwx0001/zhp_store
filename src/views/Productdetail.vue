<template>
  <div class="productlist">
    <header>商品详情</header>
    <section>
      <div class="item">
        <p>
          <span>商品信息</span>
          <img src="../assets/images/row_up.png" alt="" v-on:click="isShowFn('商品信息')">
        </p>
        <div class="content" v-if="isShow['商品信息']">
          <p>
            <span>商品编号:</span>
            <span>{{msg.code_bar}}</span>
          </p>
          <p>
            <span>商品名字:</span>
            <span>{{msg.goods_name}}</span>
          </p>
          <p>
            <span>添加时间:</span>
            <span>{{new Date(msg.create_time*1).toLocaleString()}}</span>
          </p>
        </div>
      </div>
      <div class="item">
        <p>
          <span>价格信息</span>
          <img src="../assets/images/row_up.png" alt="" v-on:click="isShowFn('价格信息')">
        </p>
        <div class="content" v-if="isShow['价格信息']">
          <p>
            <span>销售价:</span>
            <span>￥{{msg.price}}</span>
          </p>
          <p>
            <span>市场价:</span>
            <span>￥{{msg.price}}</span>
          </p>
          <p>
            <span>成本价:</span>
            <span>￥{{msg.price}}</span>
          </p>
          <h3 v-on:click="amend">修改</h3>
        </div>
      </div>
      <div class="item">
        <p>
          <span>规格信息</span>
          <img src="../assets/images/row_up.png" alt="" v-on:click="isShowFn('规格信息')">
        </p>
        <div class="content" v-if="isShow['规格信息']">
          <p>
            <span>详情:</span>
            <span>10克</span>
          </p>
          <p>
            <span>库存:</span>
            <span>299</span>
          </p>
        </div>
      </div>
      <div class="item">
        <p>
          <span>商品图片</span>
          <img src="../assets/images/row_up.png" alt="" v-on:click="isShowFn('商品图片')">
        </p>
        <div class="content" v-if="isShow['商品图片']">
          <span class="bigimg">商品大图</span>
          <br>
          <div class="content_img">
            <img :src="i.url" alt="" v-for="(i,k) in JSON.parse(this.msg.image)" v-bind:key="k">
          </div>
          <span>购物车图</span>
          <br>
          <div class="content_img">
            <img :src="msg.cart_image" alt="">
          </div>
        </div>
      </div>
      <div class="item">
        <p>
          <span>商品详情</span>
          <img src="../assets/images/row_up.png" alt="" v-on:click="isShowFn('商品详情')">
        </p>
        <div class="content" v-if="isShow['商品详情']">
          <p style="line-height:60px">{{msg.detail}}</p>
          <img class="productdetail" src="../assets/images/prodetail.png" alt="">
        </div>
      </div>
    </section>
    <Dialog title="修改销售价格" v-show="visible" :isShowFn="isShowfn">
      <div class="ipt">
        ￥
        <input placeholder="请输入销售价格" v-model="price">
      </div>
    </Dialog>
  </div>
</template>
<script>
import Dialog from "@/components/Dialog.vue";
import formData from "../utils/formdata";
let oldprice = "";
export default {
  name: "productlist",
  components: {
    Dialog
  },
  data() {
    return {
      price: "",
      msg: {},
      visible: false,
      isShow: {
        商品信息: true,
        价格信息: true,
        规格信息: true,
        商品图片: true,
        商品详情: true
      }
    };
  },

  created() {
    this.msg = this.$route.query;
    this.price = this.msg.price;
  },
  methods: {
    isShowFn(params) {
      this.isShow[params] = !this.isShow[params];
    },
    amend() {
      this.visible = true;
      oldprice = this.price;
    },
    isShowfn(flag) {
      this.visible = false;
      if (flag && oldprice !== this.price) {
        this.$http
          .post("/store/goods/edit", {
            goods_id: this.msg.goods_id,
            price: this.price
          })
          .then(data => {
            // console.log(data);
            if (data.code === 1) {
              this.msg.price = data.params.price;
            }
          })
          .catch(err => {
            console.log(err);
          });
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
    .item {
      border-bottom: solid pxTorem(1px) #ccc;
      > span {
        font-size: pxTorem(14px);
        line-height: pxTorem(30px);
        padding-left: pxTorem(10px);
      }
      > p {
        align-items: center;
        border-bottom: solid pxTorem(1px) #ccc;
        display: flex;
        height: pxTorem(40px);
        justify-content: space-between;
        font-size: pxTorem(16px);
        padding: 0 pxTorem(10px);
        box-sizing: border-box;
        span:nth-child(1) {
          border-left: solid pxTorem(2px) #5adad0;
          padding-left: pxTorem(10px);
        }

        img {
          width: pxTorem(22px);
        }
      }
      .content_img {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        img {
          width: 32%;
          height: pxTorem(120px);
          margin-bottom: pxTorem(8px);
        }
      }
      .content {
        padding: pxTorem(5px) pxTorem(10px);
        box-sizing: border-box;
        font-size: pxTorem(15px);
        position: relative;
        > span {
          color: #000;
          line-height: pxTorem(30px);
        }
        p {
          line-height: pxTorem(25px);
          span:nth-child(2) {
            font-size: pxTorem(18px);
            margin-left: pxTorem(5px);
          }
          span:nth-child(1) {
            color: gray;
          }
        }
        h3 {
          color: orange;
          font-size: pxTorem(16px);
          position: absolute;
          right: pxTorem(10px);
          top: pxTorem(10px);
        }
        .productdetail {
          width: 100%;
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
  }
  .ipt {
    width: 100%;
    height: pxTorem(40px);
    background: #eee;
    margin: 0 auto;
    border-radius: pxTorem(5px);
    padding: 0 pxTorem(10px);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: pxTorem(18px);
    input {
      flex: 1;
      margin-left: pxTorem(5px);
      background: #eee;
    }
  }
}
</style>


