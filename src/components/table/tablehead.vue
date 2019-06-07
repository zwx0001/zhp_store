<template>
  <th class="tablehead"><slot></slot>{{label}}</th>
</template>
<script>
export default {
  name: "tablehead",
  props: ["prop", "label", "type", "width"],

  created() {
    if (this.type) {
      this.$parent.arr.push({
        type: this.type
      });
    } else {
      this.$parent.arr.push({
        key: this.prop,
        label: this.label
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>


