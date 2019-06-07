/*
 * @Author: mikey.zhang 弹框
 * @Date: 2019-04-12 14:34:20 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2019-04-16 16:17:12
 */

<template>
  <div class="dialog">
    <div class="box">
      <p>{{title}}</p>
      <div class="main">
        <slot></slot>
      </div>
      <div class="btn">
        <div v-on:click="cancel">取消</div>
        <div class="confirm" v-on:click="confirm">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dialog",
  props: {
    title: String,
    isShowFn: Function
  },
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    confirm() {
      this.isShowFn(true);
    },
    cancel() {
      this.isShowFn(false);
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .box {
    width: 80%;
    background: #fff;
    border-radius: pxTorem(8px);
    position: absolute;
    .btn {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      border-top: solid pxTorem(1px) #ccc;
      height: pxTorem(50px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: gray;
      .confirm {
        color: #f2922f;
        border-left: solid pxTorem(1px) #ccc;
      }
      div {
        flex: 1;
        height: 100%;
        font-size: pxTorem(20px);
        text-align: center;
        line-height: pxTorem(50px);
      }
    }
    .main {
      width: 90%;
      margin: 0 auto;
      margin-bottom: pxTorem(80px);
    }
    > p {
      text-align: center;
      font-size: pxTorem(20px);
      line-height: pxTorem(60px);
    }
  }
}
</style>

