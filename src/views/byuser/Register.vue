<template>
  <div class="register">
    <div class="box">
      <input
        placeholder="请输入用户名"
        v-valid.string.required
        v-model="username"
        name="username"
        @input="(e)=>handleInput(e)"
      >
      <br>
      <input
        placeholder="请输入手机号"
        v-valid.number.required
        v-model="usertel"
        name="usertel"
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
      <button v-on:click="gohome">注册</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "byuserregister",
  data() {
    return {
      username: "",
      password: "",
      usertel: ""
    };
  },
  methods: {
    handleInput: function(e) {
      this[e.target.name] = e.target.value;
    },
    gohome: function() {
      // console.log(this.username);
      // console.log(this.password);
      if (Array.from(document.getElementsByClassName("errclass")).length > 0) {
        this.$message("请填写正确信息");
        return;
      }
      if (this.username.trim() && this.password.trim()) {
        this.$http
          .post("/buyer/user/register", {
            username: this.username.trim(),
            password: this.password.trim(),
            phone_number: this.usertel.trim()
          })
          .then(data => {
            // console.log(data);
            if (data.code === 1) {
              this.$message(data.msg);
              this.$router.push("/byuserlogin");
            } else {
              this.$message(data.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message("请填写完整信息");
      }
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

