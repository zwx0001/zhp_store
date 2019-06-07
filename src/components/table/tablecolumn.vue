<template>
  <tr>
    <td v-if="type==='index'">{{index}}</td>
    <td v-if="type==='select'">
      <Checkbox v-model="selected" class="ck"></Checkbox>
    </td>
    <td v-for="(i,k) in coldata" :key="k">{{i}}</td>
  </tr>
</template>
<script>
import Checkbox from "../checkbox/checkbox";
import bus from "../../../bus";
export default {
  name: "tablecolmun",
  props: ["coldata", "index", "type"],
  data() {
    return {
      selected: false
    };
  },
  watch: {
    selected(n) {}
  },
  created() {
    bus.$on("ckall", data => {
      this.selected = data;
    });
  },
  components: {
    Checkbox
  }
};
</script>

<style lang="scss" scoped>
</style>

