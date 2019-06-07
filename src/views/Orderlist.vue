<template>
    <div class="orderlist">
        <header>订单列表</header>
        <section></section>
    </div>
</template>
<script>
export default {
  name: "orderlist",
  created(){
     // this.$http.
  }
};
</script>
<style lang="scss" scoped>
.orderlist {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    height: pxTorem(44px);
    border-bottom: solid pxTorem(1px) #ccc;
    text-align: center;
    line-height: pxTorem(44px);
    font-size: pxTorem(18px);
    background: #fff;
  }
  section {
    flex: 1;
  }
}
</style>





