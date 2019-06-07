<template>
    <div class="paysuccess">
        <div>
            <img src="../../assets/images/success.png" alt="">
        </div>
        <div>
            <img src="../../assets/images/look.png" alt="" @click="lookorder">
            <img src="../../assets/images/back.png" alt="" @click="gohome">
        </div>
    </div>
</template>
<script>
export default {
  name: "paysuccess",
  methods: {
    lookorder() {
      this.$router.push("/byuserorderlist");
    },
    gohome() {
      this.$router.push("/byuserhome");
    }
  }
};
</script>
<style lang="scss" scoped>
.paysuccess {
  width: 100%;
  height: 100%;
  div:nth-child(1) {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: pxTorem(50px) 0;
    img {
      width: pxTorem(150px);
      height: pxTorem(190px);
    }
  }
  div:nth-child(2) {
    width: 100%;
    display: flex;
    justify-content: space-around;

    img {
      width: pxTorem(130px);
      height: pxTorem(50px);
    }
  }
}
</style>


