<template>
  <transition name="alert" @after-leave="transitionComplete">
    <div class="alert-mask" v-show="visible">
      <div class="box">
        <p class="tit">提示</p>
        <div class="contentmsg">{{opt}}</div>
        <p class="btn" v-on:click="cancel">确定</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "alert",
  data() {
    return {
      visible: false,
      opt: ""
    };
  },
  methods: {
    cancel() {
      this.visible = false;
    },
    transitionComplete() {
      this.$emit("afterleave");
    }
  }
};
</script>

<style lang="scss" scoped>
.alert-mask {
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
    height: pxTorem(50px);
    line-height: pxTorem(50px);
    text-align: center;
    font-size: pxTorem(20px);
    margin-top: pxTorem(10px);
  }
  .contentmsg {
    font-size: pxTorem(16px);
    line-height: pxTorem(25px);
  }
}

.alert-enter {
  opacity: 0;
}
.alert-enter-to {
  opacity: 1;
}
.alert-enter-active {
  transition: opacity 0.5s linear;
}

.alert-leave {
  opacity: 1;
}
.alert-leave-to {
  opacity: 0;
}
.alert-leave-active {
  transition: opacity 0.5s linear;
}
</style>

