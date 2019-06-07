<template>
  <transition name="confirm" @after-leave="transitionComplete">
    <div class="confirm-mask" v-show="visible">
      <div class="box">
        <p class="tit">提示</p>
        <div class="contentmsg">{{msg}}</div>
        <p class="btn">
          <span v-on:click="cancel">取消</span>
          <span v-on:click="confirm">确定</span>
        </p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "confirm",
  data() {
    return {
      visible: false,
      flag: 0,
      msg: ""
    };
  },
  methods: {
    cancel() {
      this.visible = false;
    },
    confirm() {
      this.visible = false;
      this.flag = 1;
    },
    transitionComplete() {
      this.$emit("afterleave");
    }
  }
};
</script>

<style lang="scss" scoped>
.confirm-mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  z-index: 999;
}
.box {
  width: 70%;
  background: #fff;
  border-radius: pxTorem(10px);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  .tit {
    font-size: pxTorem(20px);
    line-height: pxTorem(40px);
  }
  .btn {
    width: 100%;
    color: #007aff;
    font-weight: bold;
    border-top: solid pxTorem(1px) #ccc;
    height: pxTorem(40px);
    line-height: pxTorem(40px);
    text-align: center;
    font-size: pxTorem(20px);
    margin-top: pxTorem(10px);
    display: flex;
    justify-content: space-between;
    span {
      flex: 1;
    }
  }
  .contentmsg {
    font-size: pxTorem(16px);
    line-height: pxTorem(25px);
  }
}

.confirm-enter {
  opacity: 0;
}
.confirm-enter-to {
  opacity: 1;
}
.confirm-enter-active {
  transition: opacity 0.5s linear;
}

.confirm-leave {
  opacity: 1;
}
.confirm-leave-to {
  opacity: 0;
}
.confirm-leave-active {
  transition: opacity 0.5s linear;
}
</style>

