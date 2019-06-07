<template>
  <table class="table">
    <thead class="thead">
      <slot name="thead"></slot>
    </thead>
    <tbody class="tbody">
      <Tablecolumn v-for="(i,k) in newarr" :key="k" :coldata="i" :index="k+1" :type="type"></Tablecolumn>
    </tbody>
  </table>
</template>
<script>
import Tablecolumn from "./tablecolumn";
import bus from "../../../bus";
export default {
  name: "tables",
  props: ["data", "theaddata"],
  components: {
    Tablecolumn
  },
  data() {
    return {
      arr: [],
      newarr: [],
      type: ""
    };
  },
  // created() {
  //   this.newarr = [];
  //   this.data.map((item, index) => {
  //     let obj = {};
  //     this.arr.map((i, k) => {
  //       obj[i.key] = item[i.key];
  //     });
  //     this.newarr[index] = obj;
  //   });
  //   console.log(this.arr);
  // }

  mounted() {
    this.newarr = [];
    this.data.map((item, index) => {
      let obj = {};
      this.arr.map((i, k) => {
        if (i.key) {
          obj[i.key] = item[i.key];
        }
      });
      this.newarr[index] = obj;
    });
    let type = this.arr.filter((item, index) => {
      return item.type;
    });

    if (type[0]) this.type = type[0].type;
  }
};
</script>
<style lang="scss" scoped>
.table {
  width: 95%;
  box-shadow: 0 0 pxTorem(10px) #ccc;
  margin: 0 auto;
  text-align: center;
  font-size: pxTorem(14px);
  tr {
    line-height: pxTorem(30px);
  }
}
</style>


