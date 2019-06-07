/*
 * @Author: mikey.zhang  店铺首页
 * @Date: 2019-04-12 13:27:54 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2019-04-28 18:21:37
 */

<template>
  <div class="storelist">
    <div class="info">
      <p>
        海淀区社区配件
        <i class="iconfont icon-angle-right"></i>
      </p>
      <dl class="userinfo">
        <dt>13835946865</dt>
        <dd>超级管理员</dd>
      </dl>
    </div>
    <ul>
      <li>
        <img src="../assets/images/pic1.png" alt="接单">
      </li>
      <li>
        <img src="../assets/images/pic2.png" alt="扫码">
      </li>
      <li>
        <img src="../assets/images/pic3.png" alt="退款">
      </li>
      <li v-on:click="gostoresetting">
        <img src="../assets/images/pic4.png" alt="店铺设置">
      </li>
      <li v-on:click="goclassifylist">
        <img src="../assets/images/pic5.png" alt="分类管理">
      </li>
      <li v-on:click="goaddproduct">
        <img src="../assets/images/pic6.png" alt="添加商品">
      </li>
      <li v-on:click="goproductlist">
        <img src="../assets/images/pic7.png" alt="商品列表">
      </li>
      <li v-on:click="goreport">
        <img src="../assets/images/pic8.png" alt="收益报表">
      </li>
      <li class="mystore">
        <router-link to="/mystore">
          <p>我的店铺</p>
        </router-link>
      </li>
      <li class="mystore">
        <router-link to="/allproduct">
          <p>查看所有商品</p>
        </router-link>
      </li>
    </ul>
    <div class="mask" v-if="stemp===1" v-on:click="nextstemp">
      <img src="../assets/images/step1.png" alt="" class="step1">
    </div>
    <div class="mask" v-if="stemp===2" v-on:click="nextstemp">
      <img src="../assets/images/step2.png" alt="" class="step1">
    </div>
    <div class="mask" v-if="stemp===3" v-on:click="nextstemp">
      <img src="../assets/images/step3.png" alt="" class="step1">
    </div>
  </div>
</template>
<script>
import formData from "../utils/formdata";
export default {
  name: "storelist",
  data() {
    return {
      stemp: "",
      search: ""
    };
  },
  created() {
    let that = this;

    let isNew = window.localStorage.getItem("isNew")
      ? window.localStorage.getItem("isNew")
      : 0;
    if (!isNew) {
      setTimeout(() => {
        that.stemp = 1;
      }, 800);
    }
  },
  methods: {
    nextstemp() {
      let stemp = this.stemp;
      stemp++;
      this.stemp = stemp;
      if (this.stemp > 3) {
        window.localStorage.setItem("isNew", 1);
      }
    },
    gostoresetting() {
      this.$router.push({
        path: "/storesetting",
        query: this.$route.query
      });
    },
    goclassifylist() {
      this.$router.push({
        path: "/classifylist",
        query: this.$route.query
      });
    },
    goaddproduct() {
      this.$router.push({
        path: "/addproduct",
        query: this.$route.query
      });
    },
    goproductlist() {
      this.$router.push({
        path: "/productlist",
        query: this.$route.query
      });
    },
    goreport() {
      this.$router.push({
        path: "/report",
        query: this.$route.query
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.storelist {
  width: 100%;
  height: 100%;
  background: url("../assets/images/store.jpg");
  background-size: 100%;
  position: relative;
  .info {
    color: #fff;
    > p {
      text-align: center;
      font-size: pxTorem(20px);

      position: relative;
      top: pxTorem(28px);
    }
    dl {
      font-size: pxTorem(18px);
      margin-top: pxTorem(52px);
      margin-left: pxTorem(80px);
      dd {
        font-size: pxTorem(14px);
      }
    }
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: pxTorem(66px);
    .mystore {
      height: pxTorem(94px);
      background: url("../assets/images/pic4(1).png");
      background-size: 100% 100%;
      position: relative;
      p {
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: pxTorem(22px);
        z-index: 9999;
        color: #7f7f7f;
        font-size: pxTorem(12px);
      }
    }
    li {
      width: 33%;
      font-size: 0;

      img {
        width: 100%;
      }
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
  }
  .step1 {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>

