<template>
  <div class="index" :class="{'ani':isActive}">
    <p @click="goHome">我要开店</p>
    <p @click="goByuser">欢迎进入指尖杂货店</p>
  </div>
</template>

<script>
export default {
  name: "index",
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
        that.$router.push({ path: "/login" });
      }, 1000);
    },
    goByuser() {
      let that = this;
      this.isActive = true;
      setTimeout(() => {
        that.$router.push({ path: "/byuserhome" });
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
  flex-direction: column;
}
.ani {
  transition: 1s;
  transform: translateY(-1334px);
}
</style>

