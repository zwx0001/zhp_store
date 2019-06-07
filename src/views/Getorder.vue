<template>
    <div class="getorder">
        <header>待发货</header>
    </div>
</template>
<script>
export default {
  name: "getorder",
  created() {
    this.$http
      .post("/store/order/list", {
        //store_id:,
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="scss" scoped>
.getorder {
  width: 100%;
  height: 100%;
  header {
    width: 100%;
    height: pxTorem(44px);
    border-bottom: solid pxTorem(1px) #ccc;
    text-align: center;
    line-height: pxTorem(44px);
    font-size: pxTorem(18px);
    background: #fff;
  }
}
</style>


