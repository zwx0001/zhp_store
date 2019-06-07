<template>
  <transition name="log" @after-leave="transitionComplete">
    <div v-show="visible" class="loging-mask">
      <p>
        <img src="../../assets/images/loading.gif" alt="">
      </p>
    </div>
  </transition>
</template>
<script>
import createLoging from "./index";
export default {
  name: "loging",
  data() {
    return {
      visible: false,
      //opt: "Loading..."
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.visible = false;
    // }, 2000);
  },
  methods: {
    transitionComplete() {
      this.$emit("afterleave", "动画结束");
    }
  }
};
</script>

<style lang="scss">
.loging-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;
  > p {
    color: #fff;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate3d(-50%, -50%, 0);
    font-size: pxTorem(20px);
  }
  img {
    border-radius: pxTorem(10px);
  }
}
.log-enter {
  opacity: 0;
}
.log-enter-to {
  opacity: 1;
}
.log-enter-active {
  transition: all 2s linear;
}
.log-leave {
  opacity: 1;
}
.log-leave-to {
  opacity: 0;
}
.log-leave-active {
  transition: opacity 2s linear;
}
</style>

