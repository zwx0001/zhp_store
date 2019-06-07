<template>
  <div :class="checked?'checkbox':'check'" @click="togglecheck"></div>
</template>
<script>
export default {
  name: "checkboxs",
  model: {
    event: "change",
    prop: "checked"
  },
  props: {
    checked: {
      type: Boolean,
      // required: true,
      default: false
    }
  },

  methods: {
    togglecheck() {
      this.$emit("change", !this.checked);
    }
  }
};
</script>

<style lang="scss" scoped>
.check {
  width: pxTorem(20px);
  height: pxTorem(20px);
  border: solid pxTorem(1px) #ccc;
  box-shadow: 0 0 pxTore(10px) #ccc;
  border-radius: pxTorem(3px);
  display: inline-block;
  overflow: hidden;
}
.checkbox {
  width: pxTorem(20px);
  height: pxTorem(20px);
  background: green;
  box-shadow: 0 0 pxTore(10px) #ccc;
  border-radius: pxTorem(3px);
  position: relative;
  border: solid pxTorem(1px) #ccc;
  display: inline-block;
  overflow: hidden;
}
.checkbox:after {
  content: "";
  display: inline-block;
  width: pxTorem(15px);
  height: pxTorem(10px);
  border-left: solid pxTorem(4px) #fff;
  border-bottom: solid pxTorem(4px) #fff;
  position: absolute;
  transform: rotate(-45deg);
}
</style>

