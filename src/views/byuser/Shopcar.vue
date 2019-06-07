<template>
  <div class="shopcar">
    <header>购物车</header>
    <section>
      <div class="item" v-for="(i,k) in list" :key="i.goods_id">
        <Checkbox v-model="i.status" @change="handlechange"></Checkbox>
        <div class="con">
          <img :src="i.cart_image" alt="">
          <div>
            <p>{{i.goods_name}}</p>
            <p style="font-size:30px;color:gray" v-if="i.sku">{{JSON.parse(i.sku).toString()}}</p>
            <p>￥{{i.price}}</p>
          </div>
        </div>
        <dl>
          <img src="../../assets/images/delete.png" alt="" @click="del(i.goods_id)">
          <div class="btn">
            <button v-on:click="minus(i)">-</button>
            <span style="font-size:30px">{{i.count}}</span>
            <button v-on:click="add(i)">+</button>
          </div>
        </dl>
      </div>
    </section>
    <footer>
      <p>
        <Checkbox v-model="bool" @change="boolchange"></Checkbox>
        <span>全选</span>
        <span>
          总价:￥
          <b>{{sum}}</b>
        </span>
      </p>
      <span @click="goorder">去结算</span>
    </footer>
  </div>
</template>
<script>
import Checkbox from "../../components/checkbox/checkbox";
import Cookie from "../../utils/cookie";
let token = Cookie.get("token");

export default {
  name: "shopcar",
  data() {
    return {
      list: [],
      bool: false,
      sum: 0
    };
  },
  components: {
    Checkbox
  },

  created() {
    if (!token) {
      this.$message("请先登录");
      return;
    }
    this.$http
      .post("/buyer/cart/list", {
        token
      })
      .then(data => {
        // console.log(data);
        if (data.code === 1) {
          this.list = data.result;
          this.list.map(item => {
            if (item.status === 0) {
              item.status = false;
            } else {
              item.status = true;
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goorder() {
      let arr = this.list.filter(item => {
        return item.status;
      });
      if (arr.length) {
        this.$store.commit("addorder", {
          list: arr,
          total: this.sum
        });
        this.$router.push({
          path: "/byuserconfirmorder",
          query: this.$route.query
        });
      } else {
        this.$message("请先选择要买的商品");
      }
    },
    boolchange() {
      this.sum = 0;
      this.list.map(item => {
        item.status = this.bool;
        if (item.status) {
          this.sum += item.price * item.count;
        }
      });
    },
    editcar(goods_id, count) {
      this.$http
        .post("/buyer/cart/edit", {
          token,
          goods_id,
          count
        })
        .then(data => {
          // console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handlechange() {
      if (
        this.list.every(item => {
          return item.status;
        })
      ) {
        this.bool = true;
      } else {
        this.bool = false;
      }
      this.total();
    },
    total() {
      this.sum = 0;
      this.list.map(item => {
        if (item.status) {
          this.sum += item.price * item.count;
        }
      });
    },
    add(i) {
      this.list.map(item => {
        if (item.goods_id === i.goods_id) {
          item.count++;
          this.editcar(i.goods_id, String(item.count));
        }
      });
      this.total();
      //this.$store.commit("car", this.list);
    },
    minus(i) {
      this.list.map(item => {
        if (item.goods_id === i.goods_id) {
          item.count--;
          if (item.count < 0) {
            item.count = 0;
          }
          this.editcar(i.goods_id, String(item.count));
        }
      });
      this.total();
      //this.$store.commit("car", this.lsit);
    },
    del(id) {
      this.$confirm("确定删除嘛？？？", flag => {
        if (flag) {
          this.list.map((item, index) => {
            if (item.goods_id === id) {
              this.$http
                .post("/buyer/cart/delete", {
                  token,
                  goods_id: id
                })
                .then(data => {
                  // console.log(data);
                  if (data.code === 1) {
                    this.list.splice(index, 1);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
          });

          this.total();
          //this.$store.commit("car", this.lsit);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.shopcar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  section {
    width: 100%;
    flex: 1;
    .item {
      display: flex;
      justify-content: space-between;
      border-bottom: solid pxTorem(1px) #ccc;
      padding: pxTorem(10px);
      box-sizing: border-box;
      .con {
        display: flex;
        flex: 1;
        margin-left: pxTorem(10px);
        img {
          width: pxTorem(100px);
          height: pxTorem(100px);
          margin-right: pxTorem(10px);
        }
        div {
          font-size: pxTorem(18px);
          display: flex;
          justify-content: space-between;
          flex-direction: column;
        }
      }
      dl {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img {
          width: 30%;
          margin-left: pxTorem(30px);
        }
      }
      .btn {
        button {
          display: inline-block;
          width: pxTorem(30px);
          height: pxTorem(30px);
          font-size: pxTorem(16px);
        }
        span {
          margin: 0 pxTorem(10px);
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span {
      background: orange;
      color: #fff;
      height: 100%;
      line-height: pxTorem(50px);
      padding: 0 pxTorem(20px);
      font-size: pxTorem(16px);
    }
    > p {
      margin-left: pxTorem(15px);
      span {
        position: relative;
        top: pxTorem(-5px);
        margin: 0 pxTorem(10px);
        b {
          font-size: pxTorem(16px);
          color: red;
        }
      }
    }
  }
}
</style>

