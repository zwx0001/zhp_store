<template>
    <div class="index" :class="{'ani':isActive}">
        <p @click="goHome">欢迎进入指尖杂货店</p>
    </div>
</template>

<script>
export default {
  name: "byuserindex",
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    goHome() {
      let that = this;
      this.isActive = true;
      setTimeout(() => {
        that.$router.push({ path: "/buyuserlogin" });
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  background: #f2922f;
  color: #fff;
  font-size: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.ani {
  transition: 1s;
  transform: translateY(-1334px);
}
</style>

