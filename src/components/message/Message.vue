<template>
  <transition name="msg" @after-leave="transitionComplete">
    <span class="messagebox" v-show="visible">{{msg}}</span>
  </transition>
</template>
<script>
export default {
  name: "message",
  data() {
    return {
      visible: false,
      msg: "我是弹框"
    };
  },
  mounted() {
    setTimeout(() => {
      this.visible = false;
    }, 3000);
  },
  methods: {
    transitionComplete() {
      this.$emit("afterleave", "动画结束");
    }
  }
};
</script>
<style lang="scss" scoped>
.messagebox {
  border: solid pxTorem(1px) #ccc;
  padding: pxTorem(5px) pxTorem(10px);
  font-size: pxTorem(16px);
  border-radius: pxTorem(5px);
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate3d(-50%, 0, 0);
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
.msg-enter {
  top: 0;
}
.msg-enter-to {
  top: 20%;
}
.msg-enter-active {
  transition: top 1s linear;
}

.msg-leave {
  opacity: 1;
}
.msg-leave-to {
  opacity: 0;
}
.msg-leave-active {
  transition: opacity 1s linear;
}
</style>


