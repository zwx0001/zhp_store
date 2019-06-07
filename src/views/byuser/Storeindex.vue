/*
 * @Author: mikey.zhang 店铺首页
 * @Date: 2019-04-21 14:35:49 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2019-04-29 23:05:18
 */

<template>
  <div class="byuserstoreindex">
    <header>{{this.$route.query.storename}}</header>
    <div id="box" ref="wrapper">
      <section>
        <p class="down" ref="down">
          <span>下拉刷新……</span>
          <img src="../../assets/images/pic.gif" alt="">
        </p>
        <div class="address">
          <img src="../../assets/images/address.png" alt="">
          <span v-if="loc===''">请选择配送地址</span>
          <span v-if="loc!==''">{{loc}}</span>
          <span v-show="!token" style="float:right" @click="gologin">去登录</span>
        </div>
        <div class="info">
          <div class="info_left">
            <img :src="info.logo" alt="">
            <dl>
              <dt>
                {{this.$route.query.storename}}
                <span v-if="isbusiness">正在营业中</span>
                <span v-if="!isbusiness">已打烊</span>
              </dt>
              <dd>满49包邮</dd>
            </dl>
          </div>
          <div class="info_right">
            <dl v-if="isshow" v-on:click="shows">
              <dt>
                <img src="../../assets/images/a.png" alt="">
              </dt>
              <dd>已关注</dd>
            </dl>
            <dl v-if="!isshow" v-on:click="shows">
              <dt>
                <img src="../../assets/images/b.png" alt="">
              </dt>
              <dd>点击关注</dd>
            </dl>
          </div>
        </div>
        <div id="container">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide class="swiper-slide games">
              <img src="../../assets/images/u=1018545691,1639014916&fm=26&gp=0.jpg" alt="">
            </swiper-slide>
            <swiper-slide class="swiper-slide games">
              <img src="../../assets/images/u=1092981779,1198674757&fm=26&gp=0.jpg" alt="">
            </swiper-slide>
            <swiper-slide class="swiper-slide games">
              <img src="../../assets/images/u=1927452578,751283800&fm=26&gp=0.jpg" alt="">
            </swiper-slide>
            <swiper-slide class="swiper-slide games">
              <img src="../../assets/images/u=3590069947,3609584061&fm=26&gp=0.jpg" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="main">
          <p class="tab">
            <span :class="tabidx===0?'active':''" v-on:click="tabIdx(0)">热卖商品</span>
            <span :class="tabidx===1?'active':''" v-on:click="tabIdx(1)">店家推荐</span>
            <span :class="tabidx===2?'active':''" v-on:click="tabIdx(2)">跳楼促销</span>
          </p>
          <div class="section1" v-show="tabidx===0">
            <dl
              :class="info.indexstyle_id===1?'active':''"
              v-for="(i,k) in list2"
              v-bind:key="i.goods_id"
              v-on:click="goprodetail(i)"
            >
              <dt>
                <img v-lazy="i.cart_image" alt="">
              </dt>
              <dd>
                <p>{{i.goods_name}}</p>
                <p>
                  <span>￥{{i.price}}</span>
                  <span v-on:click.stop="addshopcar(i)"></span>
                </p>
              </dd>
            </dl>
            <dl :class="info.indexstyle_id===1?'active':''" v-for="(i,k) in list" v-bind:key="k">
              <dt>
                <img v-lazy="i.img_url" alt="">
              </dt>
              <dd>
                <p>{{i.product_name}}</p>
                <p>
                  <span>￥{{i.price.dangdang_price}}</span>
                  <span></span>
                </p>
              </dd>
            </dl>
          </div>
          <div class="section2 section1" v-show="tabidx===1">
            <dl
              :class="info.indexstyle_id===1?'active':''"
              v-for="(i,k) in list2"
              v-bind:key="i.goods_id"
              v-on:click="goprodetail(i)"
            >
              <dt>
                <img v-lazy="i.cart_image" alt="">
              </dt>
              <dd>
                <p>{{i.goods_name}}</p>
                <p>
                  <span>￥{{i.price}}</span>
                  <span></span>
                </p>
              </dd>
            </dl>
            <dl :class="info.indexstyle_id===1?'active':''" v-for="(i,k) in list" v-bind:key="k">
              <dt>
                <img v-lazy="i.img_url" alt="">
              </dt>
              <dd>
                <p>{{i.product_name}}</p>
                <p>
                  <span>￥{{i.price.dangdang_price}}</span>
                  <span></span>
                </p>
              </dd>
            </dl>
          </div>
          <div class="section3 section1" v-show="tabidx===2">
            <dl
              :class="info.indexstyle_id===1?'active':''"
              v-for="(i,k) in list2"
              v-bind:key="i.goods_id"
              v-on:click="goprodetail(i)"
            >
              <dt>
                <img v-lazy="i.cart_image" alt="">
              </dt>
              <dd>
                <p>{{i.goods_name}}</p>
                <p>
                  <span>￥{{i.price}}</span>
                  <span></span>
                </p>
              </dd>
            </dl>
            <dl :class="info.indexstyle_id===1?'active':''" v-for="(i,k) in list" v-bind:key="k">
              <dt>
                <img v-lazy="i.img_url" alt="">
              </dt>
              <dd>
                <p>{{i.product_name}}</p>
                <p>
                  <span>￥{{i.price.dangdang_price}}</span>
                  <span></span>
                </p>
              </dd>
            </dl>
          </div>
        </div>
        <p class="up" ref="up">
          <span>上拉加载……</span>
          <img src="../../assets/images/pic.gif" alt="">
        </p>
      </section>
    </div>
    <footer>
      <dl :class="idx===0?'isactive':''" v-on:click="isActive(0)">
        <dt>
          <i class="iconfont icon-home-fill"></i>
        </dt>
        <dd>首页</dd>
      </dl>
      <dl :class="idx===1?'isactive':''" v-on:click="isActive(1)">
        <dt>
          <i class="iconfont icon-gouwucheman"></i>
        </dt>
        <dd>购物车</dd>
      </dl>
      <Router-link to="/byusermine">
        <dl :class="idx===2?'isactive':''" v-on:click="isActive(2)">
          <dt>
            <i class="iconfont icon-wode"></i>
          </dt>
          <dd>我的</dd>
        </dl>
      </Router-link>
    </footer>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Cookie from "../../utils/cookie";
let token = Cookie.get("token") ? Cookie.get("token") : "";
import BScroll from "better-scroll";
let longitude = "";
let latitude = "";
let index = 1;
let week = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日"
];
let day = week[new Date().getDay() - 1];
export default {
  name: "byuserstoreindex",
  data() {
    return {
      _y: 0,
      token: "",
      isbusiness: true,
      info: [],
      idx: 0,
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
          el: ".swiper-pagination",
          type: "fraction"
        }
      },
      tabidx: 0,
      list: [],
      list2: [],
      loc: "",
      isshow: false
    };
  },

  created() {
    this.token = Cookie.get("token") ? Cookie.get("token") : "";
    let { storeid, storename } = this.$route.query;

    this.getdata(0);
    this.$http
      .get("/location", {
        lat: latitude,
        lng: longitude
      })
      .then(data => {
        // console.log(data);
        if (data.code === 1) {
          this.loc = data.result.ad_info.city;
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.$http
      .get(`/store/getstore?store_id=${storeid}`)
      .then(data => {
        if (data.code === 1) {
          // console.log(data);
          this.info = data.result[0];
          // console.log(data);
          if (this.info.business_time.indexOf(day) === -1) {
            this.isbusiness = false;
          }
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.$http
      .get(`/buyer/homelist?type=0&pagesize=5&page=1&store_id=${storeid}`)
      .then(data => {
        // console.log(data);
        if (data.code === 1) {
          this.list2 = data.result;
        }
      })
      .catch(err => {
        consoe.log(err);
      });
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    let that = this;
    let box = this.$refs.wrapper;
    let up = this.$refs.up;
    let down = this.$refs.down;
    const myBScroll = new BScroll(box);

    this.scroll = new BScroll(this.$refs.wrapper, {
      //startY: this.$store.state.y,
      click: true,
      // 上拉加载
      pullUpLoad: {
        // 当上拉距离超过30px时触发 pullingUp 事件
        threshold: -30
      },
      // 下拉刷新
      pullDownRefresh: {
        // 下拉距离超过30px触发pullingDown事件
        threshold: 30,
        // 回弹停留在距离顶部20px的位置
        stop: 20
      }
    });

    this.scroll.on("scroll", function() {
      that._y = this.y;
    });

    this.scroll.on("pullingUp", () => {
      console.log("处理上拉加载操作");
      index++;
      console.log(index);
      this.getdata(index);
      //this.$loading();
      setTimeout(() => {
        // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次

        this.scroll.finishPullUp();
      }, 4000);
    });

    this.scroll.on("pullingDown", () => {
      console.log("处理下拉刷新操作");
      index = 0;
      this.getdata(0);
      setTimeout(() => {
        // console.log("asfsaf");
        this.$message("刷新完成");
        // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
        this.scroll.finishPullDown();
      }, 2000);
    });

    if (navigator.geolocation) {
      //获取地理位置
      navigator.geolocation.getCurrentPosition(function(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        console.log(longitude);
        console.log(latitude);
      });
    } else {
      console.log("请开启GPS");
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("savestate", this._y);
    next();
  },
  methods: {
    gologin() {
      this.$router.push("/byuserlogin");
    },
    addshopcar(i) {
      if (token) {
        i.count = 1;
        i.sku = "[]";
        this.$http
          .post("/buyer/cart/add", {
            token,
            goods_id: i.goods_id,
            price: i.price,
            count: i.count,
            sku: i.sku
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
    isActive(idx) {
      this.idx = idx;
      if (idx === 1) {
        this.$router.push({
          path: "/byusershopcarlist",
          query: this.$route.query
        });
      }
    },
    tabIdx(idx) {
      let { storeid, storename } = this.$route.query;
      this.tabidx = idx;
      this.$http
        .get(
          `/buyer/homelist?type=${idx}&pagesize=5&page=1&store_id=${storeid}`
        )
        .then(data => {
          // console.log(data);
          if (data.code === 1) {
            this.list2 = data.result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getdata(idx) {
      this.$store.dispatch("getdata", idx);
      this.$http
        .get("/store/goods/goodslist", {
          page: idx
        })
        .then(data => {
          // console.log(data);
          if (data.code === 1) {
            if (idx === 0) {
              this.list = data.data;
            } else {
              this.list = [...this.list, ...data.data];
            }
            // console.log(this.list);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    shows() {
      //console.log(idx);
      if (!token) {
        this.$message("请先登录");
        return;
      }
      if (this.isshow) {
        this.$http
          .post("/buyer/user/store.collect.add", {
            token,
            store_id: this.$route.query.storeid
          })
          .then(data => {
            // console.log(data);
            this.$message("已关注");
            this.isshow = !this.isshow;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$http
          .post("/buyer/user/store.collect.remove", {
            token,
            store_id: this.$route.query.storeid
          })
          .then(data => {
            // console.log(data);
            this.$message("取消关注");
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    goprodetail(i) {
      this.$router.push({
        path: "/byuserprodetail",
        query: i
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.byuserstoreindex {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
#box {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;
}
section {
  width: 100%;
  position: relative;

  > p {
    width: 100%;
    height: pxTorem(40px);
    line-height: pxTorem(40px);
    font-size: pxTorem(18px);
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    position: absolute;
    img {
      width: pxTorem(25px);
      vertical-align: middle;
    }
  }
  .up {
    left: 0;
    bottom: pxTorem(-40px);
  }
  .down {
    left: 0;
    top: pxTorem(-40px);
  }
  .address {
    width: 100%;
    height: pxTorem(40px);
    background: #333333;
    color: #fff;
    line-height: pxTorem(40px);
    padding: 0 pxTorem(20px);
    box-sizing: border-box;
    font-size: pxTorem(13px);
    img {
      height: 100%;
      vertical-align: top;
    }
    span {
      margin-left: pxTorem(6px);
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: pxTorem(10px);
    box-sizing: border-box;
    .info_left {
      img {
        width: pxTorem(50px);
        height: pxTorem(50px);
        border-radius: pxTorem(5px);
        margin-right: pxTorem(10px);
      }
      display: flex;
      dl {
        dt {
          font-size: pxTorem(14px);
        }
        dd {
          color: gray;
          line-height: pxTorem(25px);
        }
      }
    }
    .info_right {
      dl {
        text-align: center;
        dd {
          color: gray;
        }
      }
      img {
        width: pxTorem(30px);
      }
    }
  }
  #container {
    width: 100%;
    height: pxTorem(150px);
    position: relative;
    .swiper-container {
      width: 100%;
      height: pxTorem(150px);
    }
    .swiper-slide {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper-pagination {
      color: #fff;
      background: rgba(0, 0, 0, 0.6);
      border-radius: pxTorem(10px);
      width: pxTorem(40px);
      height: pxTorem(20px);
      line-height: pxTorem(20px);
      margin-left: pxTorem(320px);
    }
  }
  .main {
    .tab {
      width: 100%;
      height: pxTorem(40px);
      border-bottom: solid pxTorem(1px) #ccc;
      display: flex;
      justify-content: space-around;
      font-size: pxTorem(15px);
      span {
        padding: 0 pxTorem(10px);
        line-height: pxTorem(40px);
      }
      .active {
        color: #f2922f;
        border-bottom: solid pxTorem(2px) #f2922f;
      }
    }
    .section1 {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: pxTorem(8px);
      box-sizing: border-box;

      dl {
        width: 100%;
        padding: pxTorem(10px);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: solid pxTorem(1px) #ccc;
      }
      dl.active {
        width: 47%;
        overflow-x: auto;
        margin-bottom: pxTorem(10px);
        margin-right: pxTorem(10px);
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
      }

      dt {
        width: 30%;
        img {
          width: pxTorem(80px);
          height: pxTorem(80px);
          border-radius: pxTorem(6px);
          margin: 0 auto;
        }
      }
      dd {
        width: 70%;
        flex: 1;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        p:nth-child(1) {
          width: 100%;
          font-size: pxTorem(16px);
          overflow: hidden;
          white-space: nowrap;
          line-height: pxTorem(35px);
          text-overflow: ellipsis;
        }
        p:nth-child(2) {
          font-size: pxTorem(18px);
          display: flex;
          justify-content: space-between;
          align-items: center;

          span:nth-child(2) {
            display: inline-block;
            width: pxTorem(30px);
            height: pxTorem(30px);
            background: url("../../assets/images/add.png") no-repeat;
            background-size: 100% 100%;
          }
        }
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
  font-size: pxTorem(18px);
  background: #fff;
}
footer {
  width: 100%;
  height: pxTorem(50px);
  border-top: solid pxTorem(1px) #ccc;
  display: flex;
  justify-content: space-around;
  flex-shrink: 0;
  align-items: center;
  dl {
    text-align: center;
    .iconfont {
      font-size: pxTorem(20px);
    }
  }
  dl.isactive {
    color: #f2922f;
  }
}
</style>


