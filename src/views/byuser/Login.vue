<template>
  <div class="login">
    <div class="box">
      <input
        placeholder="请输入账号"
        v-model="username"
        v-valid.string.required
        name="username"
        @input="(e)=>handleInput(e)"
      >
      <br>
      <input
        placeholder="请输入密码"
        v-valid.required
        v-model="password"
        name="password"
        @input="(e)=>handleInput(e)"
      >
      <br>
      <div class="yzm">
        <input placeholder="请输入验证码" v-model="yzm" name="yzm" @input="(e)=>handleInput(e)">
        <span ref="yzm" v-on:click="getcaptcha"></span>
      </div>
      <br>
      <button v-on:click="gohome">登录</button>
      <span>
        <Router-link to="/byuserregister">新用户注册</Router-link>
      </span>
    </div>
  </div>
</template>

<script>
import Cookie from "../../utils/cookie";
import { setTimeout } from "timers";
export default {
  name: "byuserlogin",
  data() {
    return {
      username: "",
      password: "",
      yzm: ""
    };
  },
  mounted() {
    this.getcaptcha();
  },
  methods: {
    getcaptcha() {
      this.$http
        .get("/buyer/user/captcha")
        .then(data => {
          if (data.code === 1) {
            this.$refs.yzm.innerHTML = data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleInput: function(e) {
      this[e.target.name] = e.target.value;
    },
    gohome: function() {
      Cookie.set("uid", "asdascxv123asd");
      if (this.username.trim() && this.password.trim() && this.yzm.trim()) {
        this.$loading.start();
        this.$http
          .post("/buyer/user/login", {
            username: this.username.trim(),
            password: this.password.trim(),
            captcha: this.yzm.trim()
          })
          .then(data => {
            if (data.code === 1) {
              Cookie.set("token", data.token);
              this.$loading.end();
              this.$router.push("/byuserhome");
            } else {
              this.$message(data.msg);
              this.getcaptcha();
              setTimeout(() => {
                this.$loading.end();
              }, 3000);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message("请填写完整信息");
        this.getcaptcha();
      }
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
  .errclass {
    border: solid pxTorem(1px) red !important;
  }
  .successclass {
    border: solid pxTorem(1px) green !important;
  }
  .box {
    width: 80%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    .yzm {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin-left: pxTorem(10px);
      }
    }
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

