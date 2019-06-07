<template>
  <div class="login">
    <div class="box">
      <input placeholder="请输入账号" v-model="username" name="username" @input="(e)=>handleInput(e)">
      <br>
      <input placeholder="请输入密码" v-model="password" name="password" @input="(e)=>handleInput(e)">
      <br>
      <button v-on:click="gohome">登录</button>
      <span>
        <router-link to="/register">新用户注册</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import Cookie from "../utils/cookie";
import { setTimeout } from "timers";
export default {
  name: "login",
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
      Cookie.set("uid", "asdascxv123asd");

      this.$router.push("/storelist");
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
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
    a {
      line-height: pxTorem(50px);
    }
  }
}
</style>

