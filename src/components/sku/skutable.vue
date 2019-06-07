<template>
  <div class="sku_tab">
    <p>信息表</p>
    <table>
      <thead>
        <tr>
          <th v-for="(i,k) in sku" :key="k">{{i.group}}</th>
          <th>库存</th>
          <th>单价</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i,k) in arr" :key="k">
          <td v-for="(v,m) in i" :key="m">{{v}}</td>
          <td>0</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "skutable",
  props: {
    sku: Array,
    arr: Array
  }
};
</script>
<style lang="scss" scoped>
.sku_tab {
  width: 95%;
  box-shadow: 0 0 pxTorem(10px) #ccc;
  margin: 0 auto;
  text-align: center;
  > p {
    line-height: pxTorem(30px);
  }
  table {
    width: 100%;
    text-align: center;
    border: solid pxTorem(1px) #ccc;
    th {
      line-height: pxTorem(30px);
    }
    td {
      line-height: pxTorem(30px);
    }
  }
}
</style>

