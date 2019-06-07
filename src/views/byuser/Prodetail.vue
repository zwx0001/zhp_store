<template>
  <div class="prodetail">
    <header>商品详情</header>
    <section>
      <div id="container">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide class="swiper-slide games" v-for="(i,k) in banner" :key="k">
            <img :src="i.url" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="info">
        <p>
          ￥
          <span>{{info.price}}</span>
        </p>
        <p>{{info.goods_name}}</p>
      </div>
      <div class="specification" v-on:click="ckgg">
        <span>规格选择</span>
        <img src="../../assets/images/right_row.png" alt="">
      </div>
      <img src="../../assets/images/prodetail2.png" alt="">
    </section>
    <footer>
      <p>
        <i class="iconfont icon-gouwucheman"></i>
        <b style="color:red">({{num}})</b>
      </p>
      <p>
        <span v-on:click="addcar">加入购物车</span>
        <span v-on:click="godetail">立即购买</span>
      </p>
    </footer>
    <transition>
      <div class="box-slider" v-show="flag">
        <div class="box-content">
          <span v-on:click="close">X</span>
          <dl>
            <dt>
              <img src="../../assets/images/u=1018545691,1639014916&fm=26&gp=0.jpg" alt="">
            </dt>
            <dd>
              <p>￥{{info.price}}</p>
              <p>{{info.goods_name}}</p>
            </dd>
          </dl>
          <!-- :class="ck[i.join('')]===true?'active':''" -->
          <p style="font-size:35px;margin-top:40px">请选择规格</p>
          <div class="specification">
            <div
              class="item"
              v-for="(i,k) in sku"
              :key="k"
              v-on:click="handleclcik(k)"
              :class="idx===k?'active':''"
            >
              <span v-for="(v,m) in i" :key="m">{{v}}</span>
            </div>
          </div>
          <div class="num">
            <span>购买数量</span>
            <p>
              <button v-on:click="minuscount">-</button>
              <b>{{info.sold_count}}</b>
              <button v-on:click="addcount">+</button>
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Cookie from "../../utils/cookie";
let token = Cookie.get("token") ? Cookie.get("token") : "";

export default {
  name: "prodetail",
  data() {
    return {
      flag: false,
      banner: [],
      swiperOption: {
        autoplay: {
          disableOnInteraction: false, //用户操作后是否禁止自动循环
          delay: 3000 //自自动循环时间
        }, //可选选项，自动滑动
        speed: 2000, //切换速度，即slider自动滑动开始到结束的时间（单位ms）
        loop: true, //循环切换
        grabCursor: true, //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        // setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
        scrollbar: ".swiper-scrollbar",
        mousewheelControl: true, //设置为true时，能使用鼠标滚轮控制slide滑动
        observeParents: true, //当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
        pagination: {
          el: ".swiper-pagination"
        }
      },
      info: {},
      sku: [],
      ck: {},
      num: 1,
      storeid: "",
      idx: 0
    };
  },
  created() {
    let inf = this.$router.history.current.query;
    this.storeid = inf.store_id;
    this.$http
      .get(`/buyer/detail?goods_id=${inf.goods_id}`)
      .then(data => {
        if (data.code === 1) {
          this.info = data.result;
          this.banner = JSON.parse(data.result.image);
          this.sku = JSON.parse(data.result.sku);
          // console.log(this.sku);
          // console.log(this.info);
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.$store.state.pros.forEach(element => {
      this.num += element.sold_count;
    });
  },
  methods: {
    godetail() {
      if (token) {
        this.$router.push({
          path: "/byusershopcarlist",
          query: {
            storeid: this.storeid
          }
        });
      } else {
        this.$message("请先登录");
      }
    },
    handleclcik(k) {
      this.idx = k;
    },
    addcount() {
      this.info.sold_count++;
    },
    minuscount() {
      this.info.sold_count--;
      if (this.info.sold_count <= 0) {
        this.info.sold_count = 0;
      }
    },
    addcar() {
      if (token) {
        let inf = this.$router.history.current.query;
        this.$store.commit("addcar", this.info);
        this.flag = false;
        this.num = 0;
        this.$store.state.pros.forEach(element => {
          this.num += element.sold_count;
        });
        // console.log(this.info);
        this.$http
          .post("/buyer/cart/add", {
            token,
            goods_id: inf.goods_id,
            price: Number(inf.price),
            count: this.info.sold_count,
            sku: JSON.stringify(this.sku[this.idx])
          })
          .then(data => {
            // console.log(data);
            if (data.code === 1) {
              this.$message(data.msg);
            } else {
              this.$message(data.error);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message("请先登录");
      }
    },
    ckgg() {
      this.flag = true;
    },
    close() {
      this.flag = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.prodetail {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  section {
    width: 100%;
    flex: 1;
    background: #f7f7f7;
    overflow-y: auto;
    #container {
      width: 100%;
      height: pxTorem(250px);
      position: relative;
      .swiper-container {
        width: 100%;
        height: 100%;
      }
      .swiper-slide {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .info {
      padding: pxTorem(5px) pxTorem(10px);
      box-sizing: border-box;
      background: #fff;
      p:nth-child(1) {
        color: #f2922f;
        span {
          font-size: pxTorem(28px);
        }
      }
      p:nth-child(2) {
        font-size: pxTorem(15px);
        line-height: pxTorem(25px);
      }
    }
    .specification {
      width: 100%;
      height: pxTorem(40px);
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: pxTorem(10px);
      box-sizing: border-box;
      margin: pxTorem(10px) 0;
      font-size: pxTorem(14px);
      img {
        height: 80%;
      }
    }
    > img {
      width: 100%;
    }
  }
  header {
    width: 100%;
    height: pxTorem(44px);
    border-bottom: solid pxTorem(1px) #ccc;
    text-align: center;
    line-height: pxTorem(44px);
    font-size: pxTorem(18px);
    background: #fff;
  }
  footer {
    width: 100%;
    height: pxTorem(50px);
    border-top: solid pxTorem(1px) #ccc;
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;
    align-items: center;
    i {
      font-size: pxTorem(25px);
      margin-left: pxTorem(20px);
    }
    span {
      height: pxTorem(50px);
      color: #fff;
      display: inline-block;
      font-size: pxTorem(16px);
      line-height: pxTorem(50px);
      padding: 0 pxTorem(15px);
    }
    span:nth-child(1) {
      background: #5adad0;
    }
    span:nth-child(2) {
      background: #f2922f;
    }
  }
  .box-slider {
    width: 100%;
    height: 93%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;

    .box-content {
      width: 100%;
      background: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 99;
      border-top-left-radius: pxTorem(20px);
      border-top-right-radius: pxTorem(20px);
      padding: pxTorem(10px);
      box-sizing: border-box;
      > span {
        display: block;
        width: pxTorem(20px);
        height: pxTorem(20px);
        color: #fff;
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
        line-height: pxTorem(20px);
        border-radius: 50%;
        position: absolute;
        top: pxTorem(10px);
        right: pxTorem(10px);
      }
      dl {
        display: flex;
        img {
          width: pxTorem(100px);
          border-radius: pxTorem(10px);
        }
        dd {
          margin-left: pxTorem(10px);
          p:nth-child(1) {
            font-size: pxTorem(20px);
            color: orange;
          }
          p:nth-child(2) {
            font-size: pxTorem(18px);
          }
        }
      }
      .num {
        display: flex;
        justify-content: space-between;
        font-size: pxTorem(18px);
        margin-top: pxTorem(20px);
        p {
          button {
            display: inline-block;
            width: pxTorem(50px);
            height: pxTorem(30px);
            font-size: pxTorem(18px);
          }
        }
        b {
          margin: 0 pxTorem(20px);
          font-weight: bold;
        }
      }
      .specification {
        display: flex;
        justify-content: space-between;
        margin-top: pxTorem(10px);
        flex-wrap: wrap;
        .item {
          padding: pxTorem(6px) pxTorem(15px);
          color: #000;
          background: #eee;
          border-radius: pxTorem(5px);
          margin-bottom: pxTorem(20px);
        }
        .item.active {
          color: #fff;
          background: #5adad0;
        }
      }
    }
  }
}
</style>


