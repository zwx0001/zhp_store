<template>
    <div class="applylist">
        <header>申请列表</header>
        <section>
            <div class="main">
                <div class="item" v-for="(i,k) in list" v-bind:key="k">
                    <div class="item_top">
                        <img
                            class="pic1"
                            src="../assets/images/u=234634259,4236876085&fm=26&gp=0.jpg"
                            alt=""
                        >
                        <p>毛掌柜的小干儿子</p>
                    </div>
                    <div class="item_bottom">
                        <p>
                            <span>重量:</span>
                            <span>40G</span>
                        </p>
                        <p>
                            <span>售价:</span>
                            <span>2.00</span>
                        </p>
                        <p>
                            <span>状态:</span>
                            <span>审核中</span>
                        </p>
                        <p>
                            <span>申请时间:</span>
                            <span>2018-02-12</span>
                        </p>
                    </div>
                    <p>修改</p>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
  name: "applylist",
  data() {
    return {
      ckall: false,
      list: [
        {
          isTrue: false
        },
        {
          isTrue: false
        },
        {
          isTrue: false
        }
      ]
    };
  },
  methods: {
    handleChangeckall() {
      this.list.forEach((item, index) => {
        item.isTrue = this.ckall;
      });
    },
    handleChange(k) {
      this.list[k].isTrue = !this.list[k].isTrue;
      let arr = this.list.filter(item => {
        return !item.isTrue;
      });
      if (arr.length <= 0) {
        this.ckall = true;
      } else {
        this.ckall = false;
      }
    },
    goproductdetail() {
      this.$router.push("/productdetail");
    }
  }
};
</script>

<style lang="scss" scoped>
.applylist {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
section {
  flex: 1;
  .main {
    width: 100%;
    .item {
      width: 95%;
      margin: pxTorem(10px) auto;
      box-shadow: 0 0 pxTorem(10px) #ccc;
      border-radius: pxTorem(5px);
      position: relative;
      .pic2 {
        height: pxTorem(25px);
      }
      .item_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f8f8f8;
        padding: pxTorem(5px) pxTorem(10px);
        input {
          width: pxTorem(20px);
          height: pxTorem(20px);
          margin-right: pxTorem(10px);
        }
        .pic1 {
          width: pxTorem(50px);
          height: pxTorem(50px);
          border-radius: pxTorem(3px);
        }
        p {
          flex: 1;
          font-size: pxTorem(16px);
          margin-left: pxTorem(10px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .item_bottom {
        padding: pxTorem(5px) pxTorem(10px);
        font-size: pxTorem(14px);
        p {
          line-height: pxTorem(24px);
          span:nth-child(1) {
            color: gray;
            display: inline-block;
            width: pxTorem(65px);
          }
        }
      }
      > p {
        position: absolute;
        right: pxTorem(10px);
        bottom: pxTorem(10px);
        color: #f2922f;
        font-size: pxTorem(14px);
      }
    }
  }
}
header {
  width: 100%;
  height: pxTorem(44px);
  border-bottom: solid pxTorem(1px) #ccc;
  text-align: center;
  line-height: pxTorem(44px);
  font-size: pxTorem(16px);
  padding: 0 pxTorem(10px);
  box-sizing: border-box;
}
</style>

