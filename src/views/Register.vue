<template>
  <div class="register">
    <div class="box">
      <input placeholder="请输入账号" v-model="username" name="username" @input="(e)=>handleInput(e)">
      <br>
      <input placeholder="请输入密码" v-model="password" name="password" @input="(e)=>handleInput(e)">
      <br>
      <button v-on:click="gohome">注册</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    handleInput: function(e) {
      this[e.target.name] = e.target.value;
    },
    gohome: function() {
      console.log(this.username);
      console.log(this.password);
      this.$router.push("/storelist");
    }
  }
};
</script>
<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  background: #f2922f;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .box {
    width: 80%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    input {
      width: 100%;
      height: pxTorem(40px);
      border: solid pxTorem(1px) #ccc;
      padding-left: pxTorem(10px);
      box-sizing: border-box;
      border-radius: pxTorem(10px);
      font-size: pxTorem(15px);
    }
    button {
      width: 100%;
      height: pxTorem(40px);
      font-size: pxTorem(15px);
      border-radius: pxTorem(10px);
      background: cornflowerblue;
    }
  }
}
</style>

