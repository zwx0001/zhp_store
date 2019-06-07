<template>
  <div class="confirm">
    <header>确认订单</header>
    <section>
      <div class="address">
        <img src="../../assets/images/add1.png" alt="">
        <dl>
          <dt>胡可可 13836946865</dt>
          <dd>{{address}}</dd>
        </dl>
      </div>
      <img src="../../assets/images/border.png" alt="">
      <div class="content">
        <div class="item" v-for="(i,k) in list" :key="k">
          <img :src="i.cart_image" alt="">
          <div class="info">
            <p>{{i.goods_name}}</p>
            <p style="color:gray;font-size:26px">{{i.sku}}</p>
            <p>
              <span>￥{{i.price}}</span>
              <span style="fontSize:50px">x{{i.count}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="msg">
        <span>买家留言</span>
        <input type="text" placeholder="选填项">
      </div>
      <div class="msg">
        <span>买家留言</span>
        <input type="text" placeholder="选填项">
      </div>
      <div class="price">
        <dl>
          <dt>商品总价</dt>
          <dd>￥{{total}}</dd>
        </dl>
        <dl>
          <dt>配送费</dt>
          <dd>￥40</dd>
        </dl>
        <dl>
          <dt>需付款</dt>
          <dd>￥{{total+40}}</dd>
        </dl>
      </div>
    </section>
    <footer @click="pay">支付</footer>
  </div>
</template>
<script>
import Cookie from "../../utils/cookie";
let token = Cookie.get("token");

export default {
  name: "confirmorder",
  data() {
    return {
      address: "",
      list: [],
      total: 0
    };
  },
  created() {
    //获取地址
    if (navigator.geolocation) {
      //获取地理位置
      navigator.geolocation.getCurrentPosition(function(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        console.log(longitude);
        console.log(latitude);
      });
    } else {
      console.log("请开启GPS");
    }

    this.$http
      .get("/location")
      .then(data => {
        // console.log(data);
        if (data.code === 1) {
          this.address = `${data.result.ad_info.nation}${
            data.result.ad_info.province
          }${data.result.ad_info.city}${data.result.ad_info.district}${
            data.result.ad_info.adcode
          }`;
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.list = this.$store.state.order.list;

    this.total = this.$store.state.order.total;
  },
  methods: {
    pay() {
      this.$confirm("确定生成订单嘛？", data => {
        if (data) {
          this.$http
            .post("/buyer/order/create", {
              invoice_title: "",
              invoice_number: "",
              token,
              cart: JSON.stringify(this.list),
              receiver_name: "张三",
              receiver_address: this.address,
              receiver_phone: "15911037672",
              store_id: this.$route.query.storeid
            })
            .then(data => {
              // console.log(data);
              if (data.code === 1) {
                this.$message(data.msg);
                this.$confirm("确认支付嘛？", flag => {
                  if (flag) {
                    this.$http
                      .post("/buyer/order/pay", {
                        order_number: data.order_number,
                        token
                      })
                      .then(data1 => {
                        if (data1.code === 1) {
                          console.log(data1);
                          this.$router.push("/byuserpaysuccess");
                        } else {
                          this.$message(data1.msg);
                        }
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                });
              } else {
                this.$confirm("您有未处理的订单,确定取消订单嘛？", flag => {
                  if (flag) {
                    this.$http
                      .post("/buyer/order/cancel", {
                        order_number: data.error.order[0].order_id
                      })
                      .then(data1 => {
                        if (data1.code === 1) {
                          this.$message("您已经取消订单");
                        }
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.confirm {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  section {
    width: 100%;
    flex: 1;
    background: #f8f8f8;
    overflow-y: auto;
    > img {
      width: 100%;
    }
    .address {
      width: 100%;
      height: pxTorem(60px);
      padding: pxTorem(15px);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background: #fff;
      dl {
        dt {
          font-size: pxTorem(17px);
        }
        dd {
          color: gray;
          line-height: pxTorem(20px);
        }
      }
      img {
        height: 100%;
        margin-right: pxTorem(10px);
      }
    }
    .price {
      background: #fff;
      padding: 0 pxTorem(10px);
      font-size: pxTorem(16px);
      margin-top: pxTorem(10px);
      dl {
        display: flex;
        justify-content: space-between;
        line-height: pxTorem(40px);
        dd {
          color: red;
        }
      }
    }
    .msg {
      width: 100%;
      background: #fff;
      line-height: pxTorem(50px);
      margin-top: pxTorem(10px);
      padding: 0 pxTorem(10px);
      box-sizing: border-box;
      font-size: pxTorem(16px);
      display: flex;
      input {
        flex: 1;
        margin-left: pxTorem(10px);
      }
    }
    .content {
      padding: 0 pxTorem(10px);
      box-sizing: border-box;
      background: #fff;
      .item {
        display: flex;
        justify-content: space-between;
        border-bottom: solid pxTorem(1px) #ccc;
        padding: pxTorem(10px) 0;
        img {
          width: pxTorem(80px);
          height: pxTorem(80px);
        }
        .info {
          flex: 1;
          margin-left: pxTorem(10px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p {
            font-size: pxTorem(16px);
          }
          p:nth-child(3) {
            display: flex;
            justify-content: space-between;
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
  footer {
    width: 100%;
    height: pxTorem(50px);
    border-top: solid pxTorem(1px) #ccc;
    background: #f2922f;
    color: #fff;
    font-size: pxTorem(18px);
    text-align: center;
    line-height: pxTorem(50px);
  }
}
</style>


