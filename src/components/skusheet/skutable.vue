<template>
    <div class="skutable">
        <table>
            <thead>
                <tr>
                    <th v-for="(i,k) in pro" :key="k">{{i.group}}</th>
                    <th>库存</th>
                    <th>单价</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i,k) in tabledata" :key="k">
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
    array: Array,
    pro: Array,
    tabledata: Array
  }
};
</script>
<style lang="scss" scoped>
.skutable {
  width: 100%;

  table {
    width: 95%;
    border: solid pxTorem(1px) #ccc;
    margin: 0 auto;
    border-collapse: collapse;
    th {
      line-height: pxTorem(30px);
      border: solid pxTorem(1px) #ccc;
      font-weight: bold;
    }
    td {
      text-align: center;
      border: solid pxTorem(1px) #ccc;
    }
  }
}
</style>



