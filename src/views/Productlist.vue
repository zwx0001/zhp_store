<template>
  <div class="productlist">
    <header>商品列表</header>
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
              <span>状态:</span>
              <span v-if="i.status===0" style="color:blue">未上架</span>
              <span v-if="i.status===1" style="color:green">已上架</span>
              <span v-if="i.status===2" style="color:red">已下架</span>
            </p>
            <p>
              <span>售价:</span>
              <span>{{i.price}}.00</span>
            </p>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <label for="ckall">
        <input type="checkbox" id="ckall" v-model="ckall" v-on:change="handleChangeckall">
        <span>全选</span>
      </label>
      <p v-on:click="shelf('0')">下架</p>
      <p v-on:click="shelf('1')">上架</p>
    </footer>
  </div>
</template>

<script>
import formData from "../utils/formdata";
import { Promise } from "q";
export default {
  name: "productlist",
  data() {
    return {
      ckall: false,
      list: []
    };
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
    goproductdetail(val) {
      this.$router.push({
        path: `/productdetail`,
        query: val
      });
    },
    shelf(status) {
      let arr = this.list.filter(item => {
        return item.isTrue;
      });
      if (arr.length === 0) {
        this.$message("请先选择商品");
        return;
      }
      let arrlist = arr.map(item => {
        return item.goods_id;
      });

      this.$http
        .post("/store/goods/shelfInBulk", {
          goods_id_list: JSON.stringify(arrlist),
          status: "1"
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });

      if (status === "1") {
        if (
          arr.every(item => {
            return item.status === 1;
          })
        ) {
          this.$message("该些商品已经全部上架");
        } else {
          this.$http
            .post("/store/goods/shelfInBulk", {
              goods_id_list: JSON.stringify(arrlist),
              status: status
            })
            .then(data => {
              if (data.code === 1) {
                console.log(data);
                this.$message("该商品已上架success!!");
                this.list.forEach(item => {
                  if (item.isTrue) {
                    item.status = 1;
                  }
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        if (
          arr.every(item => {
            return item.status === 0;
          })
        ) {
          this.$message("该写商品已经全部下架");
        } else {
          this.$http
            .post("/store/goods/shelfInBulk", {
              goods_id_list: JSON.stringify(arrlist),
              status: status
            })
            .then(data => {
              if (data.code === 1) {
                console.log(data);
                this.$message("该商品已下架success!!");
                this.list.forEach(item => {
                  if (item.isTrue) {
                    item.status = 0;
                  }
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    onshelf() {
      let arr = this.list.filter(item => {
        return item.isTrue;
      });
      if (arr.length === 0) {
        this.$message("请先选择商品");
        return;
      }
      let arrlist = arr.map(item => {
        return item.goods_id;
      });

      this.$http
        .post("/store/goods/onshelf", {
          goods_id: arrlist[0]
        })
        .then(data => {
          if (data.code === 1) {
            this.$message("该商品已上架success!!");
            this.list.forEach(item => {
              if (item.isTrue) {
                item.status = 1;
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    offshelf() {
      let arr = this.list.filter(item => {
        return item.isTrue;
      });
      if (arr.length === 0) {
        this.$message("请先选择商品");
        return;
      }
      let arrlist = arr.map(item => {
        return item.goods_id;
      });

      this.$http
        .post("/store/goods/offshelf", {
          goods_id: arrlist[0]
        })
        .then(data => {
          if (data.code === 1) {
            this.$message("该商品已下架success!!");
            this.list.forEach(item => {
              if (item.isTrue) {
                item.status = 2;
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
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
        .pic2 {
          height: pxTorem(25px);
        }
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
      width: pxTorem(100px);
      color: #fff;
      background: #dddddd;
    }
    p:nth-child(3) {
      background: #f2922f;
    }
  }
}
</style>

