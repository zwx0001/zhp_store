<template>
    <div>下面是slot内容:
        <slot name="num" :msg="msg"></slot>
    </div>
</template>
<script>
export default {
  name: "m-slot",
  data() {
    return {
      msg: {
        num: 123
      }
    };
  }
};
</script>

