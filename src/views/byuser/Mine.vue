<template>
  <div class="mine">
    <div class="mine-title">
      <p>
        <i class="iconfont icon-angle-left"></i>返回
      </p>
      <p>我的</p>
      <p class="iconfont icon-gengduo"></p>
    </div>
    <div class="mine-content">
      <div class="mine-desc">
        <h5 class="mine-header">
          <img src="" alt="">
        </h5>
        <p class="mine-name">程小云</p>
        <p class="iconfont icon-set"></p>
      </div>
      <router-link tag="div" to="/byusermyorder" class="mine-p">
        <h4>我的订单</h4>
        <p class="iconfont icon-chevron-thin-right"></p>
      </router-link>
      <div class="mine-option">
        <router-link
          tag="dl"
          :to="{path:item.path,query:{currTitle:item.currTitle}}"
          v-for="(item,index) in mine_option"
          :key="index"
        >
          <dt :class="item.iconfont"></dt>
          <dd>{{item.title}}</dd>
        </router-link>
      </div>
      <div class="mine-p">
        <h4>地址管理</h4>
        <p class="iconfont icon-chevron-thin-right"></p>
      </div>
      <div class="mine-p">
        <h4>我的快递</h4>
        <p class="iconfont icon-chevron-thin-right"></p>
      </div>
      <div class="mine-p">
        <h4>收藏店铺</h4>
        <p class="iconfont icon-chevron-thin-right"></p>
      </div>
      <div class="mine-hint">
        <div class="mine-p">
          <h4>客服电话</h4>
          <p>400-135-2403</p>
        </div>
        <div class="mine-p">
          <h4>在线客服</h4>
          <p class="iconfont icon-erji"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Mine",
  props: {},
  components: {},
  data() {
    return {
      mine_option: [
        {
          title: "待付款",
          iconfont: "iconfont icon-tian",
          path: "/myorder",
          currTitle: 1
        },
        {
          title: "待发货",
          iconfont: "iconfont icon-tianmao2",
          path: "/myorder",
          currTitle: 2
        },
        {
          title: "待收货",
          iconfont: "iconfont icon-daishouhuo-01",
          path: "/myorder",
          currTitle: 3
        },
        {
          title: "已完成",
          iconfont: "iconfont icon-31",
          path: "/myorder",
          currTitle: 4
        },
        {
          title: "退货/售后",
          iconfont: "iconfont icon-zixun",
          path: "/myorder",
          currTitle: 5
        }
      ]
    };
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.mine {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .mine-title {
    padding: 0 pxTorem(10px);
    box-sizing: border-box;
    width: 100%;
    height: pxTorem(44px);
    background: #333;
    color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: pxTorem(18px);
    .iconfont {
      font-size: pxTorem(22px);
    }
  }
  .mine-content {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    background: #f5f5f5;
    .mine-desc {
      padding: pxTorem(10px);
      margin-bottom: pxTorem(10px);
      box-sizing: border-box;
      width: 100%;
      height: pxTorem(100px);
      background: #fff;
      display: flex;
      align-items: center;
      .mine-header {
        width: pxTorem(60px);
        height: pxTorem(60px);
        border-radius: 50%;
        background: lightblue;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .mine-name {
        flex: 1;
        padding: 0 pxTorem(20px);
        font-size: pxTorem(18px);
      }
      .iconfont {
        padding: 0 pxTorem(20px);
      }
    }
    .mine-p {
      padding: 0 pxTorem(20px);
      box-sizing: border-box;
      width: 100%;
      height: pxTorem(50px);
      border-bottom: pxTorem(1px) solid #f5f5f5;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .mine-option {
      margin-bottom: pxTorem(10px);
      width: 100%;
      display: flex;
      justify-content: space-around;
      dl {
        width: 100%;
        height: pxTorem(80px);
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        color: #333;
        dt {
          &.iconfont {
            font-size: pxTorem(26px);
            color: #333;
          }
        }
      }
    }
    .mine-hint {
      margin: pxTorem(10px) 0;
    }
  }
}
</style>