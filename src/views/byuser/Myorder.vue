<template>
  <div class="orderlist">
    <header>全部订单</header>
    <section>
      <div class="tab">
        <p :class="status==='6'?'active':''" @click="handleclick('6')">全部</p>
        <p :class="status==='0'?'active':''" @click="handleclick('0')">未付款</p>
        <p :class="status==='1'?'active':''" @click="handleclick('1')">已付款</p>
        <p :class="status==='2'?'active':''" @click="handleclick('2')">待发货</p>
        <p :class="status==='3'?'active':''" @click="handleclick('3')">已发货</p>
        <p :class="status==='4'?'active':''" @click="handleclick('4')">已收货</p>
        <p :class="status==='5'?'active':''" @click="handleclick('5')">已取消</p>
      </div>
      <div class="content">
        <div class="item" v-for="(i,k) in goodslist" :key="i.item_id">
          <p>订单编号:{{i.order_id}}</p>
          <dl>
            <dt>
              <img :src="i.cart_image" alt="">
            </dt>
            <dd>
              <p>
                {{i.goods_name}}
                <span style="float:right">x{{i.goods_count}}</span>
              </p>
              <p>下单时间 {{new Date().toLocaleDateString()}}</p>
              <p>
                订单状态:
                <span style="color:orange" v-if="status==='0'">未付款</span>
                <span style="color:orange" v-if="status==='1'">已付款</span>
                <span style="color:orange" v-if="status==='2'">待发货</span>
                <span style="color:orange" v-if="status==='3'">已发货</span>
                <span style="color:orange" v-if="status==='4'">已收货</span>
                <span style="color:orange" v-if="status==='5'">已取消</span>
              </p>
            </dd>
          </dl>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Cookie from "../../utils/cookie";
let token = Cookie.get("token");

export default {
  name: "orderlist",
  data() {
    return {
      status: "0",
      goodslist: []
    };
  },

  created() {
    this.getData("0");
  },
  methods: {
    getData(i) {
      //获取数据
      if (i !== "6") {
        this.$http
          .post("/buyer/order/list", {
            token,
            status: i
          })
          .then(data => {
            // console.log(data);
            if (data.code === 1) {
              this.goodslist = data.result.goodslist;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$http
          .post("/buyer/order/order", {
            token,
            status: "0"
          })
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleclick(i) {
      this.status = i;
      this.getData(i);
    }
  }
};
</script>
<style lang="scss" scoped>
.orderlist {
  width: 100%;
  height: 100%;
  .tab {
    display: flex;
    justify-content: space-around;
    line-height: pxTorem(40px);
    border-bottom: solid pxTorem(1px) #ccc;
    font-size: pxTorem(15px);
    .active {
      color: orange;
      border-bottom: solid pxTorem(1px) orange;
    }
  }
  .item {
    > p {
      font-size: pxTorem(17px);
      line-height: pxTorem(40px);
      padding: 0 pxTorem(10px);
      box-sizing: border-box;
    }
    dl {
      display: flex;
      background: #f8f8f8;
      padding: pxTorem(10px);
      box-sizing: border-box;
      img {
        width: pxTorem(100px);
      }
      dd {
        flex: 1;
        margin-left: pxTorem(10px);
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        p:nth-child(1) {
          font-size: pxTorem(16px);
        }
        p:nth-child(2) {
          font-size: pxTorem(14px);
          color: gray;
        }
        p:nth-child(3) {
          font-size: pxTorem(16px);
        }
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
  font-size: pxTorem(18px);
  background: #fff;
}
section {
  flex: 1;
  overflow-y: auto;
}
</style>


