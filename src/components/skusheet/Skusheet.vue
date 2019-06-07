<template>
    <div class="skusheet">
        <transition name="ani_mask">
            <div class="mask" v-on:click="close()" v-show="flag"></div>
        </transition>
        <transition name="ani_sheet">
            <div class="sheet" v-show="flag">
                <p v-for="(i,k) in actionsheet" v-bind:key="k" v-on:click="close(i)">{{i}}</p>
                <p v-on:click="close()">取消</p>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
  name: "skusheet",
  props: {
    flag: {
      type: Boolean,
      required: true
    },
    actionsheet: {
      type: Array,
      required: true
    }
  },
  methods: {
    close(i) {
      if (i) {
        this.$emit("close", i);
      } else {
        this.$emit("close");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.sheet {
  width: 100%;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  p {
    height: pxTorem(50px);
    line-height: pxTorem(50px);
    box-shadow: 0 0 pxTorem(10px) #ccc;
    text-align: center;
    border-bottom: solid pxTorem(1px) #ccc;
  }
}
.ani_mask-enter {
  opacity: 0;
}
.ani_mask-enter-to {
  opacity: 1;
}
.ani_mask-leave {
  opacity: 1;
}
.ani_mask-leave-to {
  opacity: 0;
}
.ani_mask-enter-active,
.ani-mask-leave-active {
  transition: opacity 0.5s linear;
}
.ani_sheet-enter {
  transform: translate3d(0, 100%, 0);
}
.ani_sheet-enter-to {
  transform: translate3d(0, 0, 0);
}
.ani_sheet-leave {
  transform: translate3d(0, 0, 0);
}
.ani_sheet-leave-to {
  transform: translate3d(0, 100%, 0);
}
.ani_sheet-enter-active,
.ani_sheet-leave-active {
  transition: transform 0.5s linear;
}
</style>


