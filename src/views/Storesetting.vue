<template>
  <div class="storesetting">
    <header>店铺设置</header>
    <section>
      <div class="logo">店铺LOGO</div>
      <dl class="upload">
        <dt>+</dt>
        <dd>上传logo</dd>
        <img :src="logoUrl" alt="">
        <input type="file" name="files" v-on:change="(e)=>upload(e)">
      </dl>
      <div class="logo">
        店铺banner
        <span style="color:gray">(1-3张)</span>
      </div>
      <div class="uploadbanner">
        <p v-for="(i,k) in bannerUrl" v-bind:key="k">
          <img :src="i" alt="">
          <span v-on:click="closeimg(k)">x</span>
        </p>
        <dl>
          <dt>+</dt>
          <dd>上传banner</dd>
          <!-- <img :src="bannering" alt=""> -->
          <input type="file" name="files" v-on:change="(e)=>uploadbanner(e)">
        </dl>
      </div>
      <div class="main">
        <div class="item">
          <span>店铺名称</span>
          <input type="text" placeholder="请输入店铺名称" v-model="storename">
        </div>
        <div class="item">
          <span>起送价格</span>
          <input type="text" placeholder="请输入起送价格">
        </div>
        <div class="item">
          <span>配送费</span>
          <input type="text" placeholder="请输入配送费" v-model="deliveryfee">
        </div>
        <div class="item">
          <span>联系电话</span>
          <input type="text" placeholder="请输入联系电话" v-model="telnumber">
        </div>
        <div class="checkbox">
          <p>营业周期</p>
          <div>
            <label v-for="(i,k) in datearr" :for="i.id" v-bind:key="k">
              <input type="checkbox" :id="i.id" v-on:change="(e)=>handleChange(e,i.name)">
              <span>{{i.name}}</span>
            </label>
          </div>
        </div>
        <div class="item">
          <span>营业时间</span>
          <div class="time">
            <input type="time" name="start" id="" v-on:change="(e)=>start_time(e)">
            至
            <input type="time" name="end" id="" v-on:change="(e)=>end_time(e)">
          </div>
        </div>
        <div class="item">
          <span>配送时效</span>
          <select name="" id="">
            <option value="15:00">15:00</option>
            <option value="20:00">20:00</option>
            <option value="30:00">30:00</option>
            <option value="40:00">40:00</option>
            <option value="50:00">50:00</option>
            <option value="60:00">60:00</option>
          </select>
        </div>
        <div class="item_style">
          <p>首页风格</p>
          <dl>
            <dt>
              <label for="s1">
                <img src="../assets/images/style1.png" alt="">
                <input type="radio" name="style" v-on:change="(e)=>handleChangestyle(e,1)" id="s1">
              </label>
            </dt>
            <dd>
              <label for="s2">
                <img src="../assets/images/style2.png" alt="">
                <input type="radio" name="style" v-on:change="(e)=>handleChangestyle(e,2)" id="s2">
              </label>
            </dd>
          </dl>
        </div>
      </div>
    </section>
    <footer v-on:click="save">保存</footer>
  </div>
</template>
<script>
import Checkbox from "../components/checkbox/checkbox";
import formData from "../utils/formdata";
export default {
  name: "storesetting",
  components: {
    Checkbox
  },
  data() {
    return {
      logoUrl: "", //logo
      // bannering: "",
      datearr: [
        {
          id: "d1",
          name: "星期一",
          flag: false
        },
        {
          id: "d2",
          name: "星期二",
          flag: false
        },
        {
          id: "d3",
          name: "星期三",
          flag: false
        },
        {
          id: "d4",
          name: "星期四",
          flag: false
        },
        {
          id: "d5",
          name: "星期五",
          flag: false
        },
        {
          id: "d6",
          name: "星期六",
          flag: false
        },
        {
          id: "d7",
          name: "星期日",
          flag: false
        }
      ],
      bannerUrl: [], //banner列表
      obj: {},
      stylecode: "", //风格
      storename: "", //店铺名称
      storeid: "", //店铺id
      brandname: "", //品牌名字
      mainimg: "", //店铺首页
      telnumber: "", //联系电话
      bustime: "", //营业时间
      deliveryfee: "" //配送费
    };
  },
  created() {
    let obj = this.$route.query;
    let { storeid, brandname } = obj;

    this.storeid = storeid;
    this.brandname = decodeURI(brandname);
  },
  methods: {
    upload(e) {
      this.$loading.start();

      let formdata = new FormData();
      formdata.append("files", e.target.files[0]);
      // let url = e.target.files[0].name;
      // let type = url.slice(url.indexOf(".") + 1);
      // let reg = /(png|jpg|jpeg)/;
      // if (reg.test(url)) {
      //   if ((e.target.files[0].size / 1024 / 1024) * 100 < 3) {
      this.$http.post(`/upload?store_id=${this.storeid}`, formdata).then(
        data => {
          // console.log(data);
          if (data.code === 1) {
            this.$message(data.msg);
            this.logoUrl = data.url[0].url;
            this.$loading.end();
          } else {
            this.$message(data.msg);
          }
        },
        err => {
          console.log(err);
        }
      );
      //   } else {
      //     this.$message("您上传的文件格式过大");
      //   }
      // } else {
      //   this.$message("请上传png或jpg格式");
      // }
    },
    closeimg(idx) {
      this.bannerUrl.splice(idx, 1);
    },
    uploadbanner(e) {
      if (this.bannerUrl.length < 3) {
        this.$loading.start();
        let formdata = new FormData();
        formdata.append("files", e.target.files[0]);
        this.$http.post(`/upload?store_id=${this.storeid}`, formdata).then(
          data => {
            // console.log(data);
            if (data.code === 1) {
              this.bannering = data.url[0].url;
              this.bannerUrl.push(data.url[0].url);
              this.mainimg = this.bannerUrl[0];
              this.$loading.end();
            } else {
              this.$message(data.msg);
            }
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.$message("banner只能上传1-3张！");
      }
    },
    start_time(e) {
      //起送时间
      this.str = "";
      Object.entries(this.obj).forEach((item, index) => {
        if (item[1]) {
          this.str += item[0] + ",";
        }
      });
      this.str += e.target.value;
      // console.log(this.str);
    },
    end_time(e) {
      //结束时间
      this.str2 = "";
      Object.entries(this.obj).forEach((item, index) => {
        if (item[1]) {
          this.str2 += item[0] + ",";
        }
      });
      this.str2 += e.target.value;
      // console.log(this.str2);
    },
    handleChange(e, opt) {
      this.obj[opt] = e.target.checked;
    },
    handleChangestyle(e, i) {
      this.stylecode = i;
    },
    save() {
      // console.log();
      // console.log(this.storename);
      // console.log(this.storeid);
      // console.log(this.brandname);
      // console.log(this.mainimg);
      // console.log(this.telnumber);
      // // console.log(this.bustime);
      // console.log(`${this.str};${this.str2}`);
      // console.log(this.stylecode);
      // console.log(Number(this.deliveryfee));
      // console.log(this.logoUrl);

      if (
        this.bannerUrl.join(",") &&
        this.storename &&
        this.storeid &&
        this.brandname &&
        this.mainimg &&
        this.telnumber &&
        `${this.str};${this.str2}` &&
        this.stylecode &&
        Number(this.deliveryfee) &&
        this.logoUrl
      ) {
        this.$loading.start();
        this.$http
          .post("/store/decorate", {
            banner: this.bannerUrl.join(","),
            store_name: this.storename,
            store_id: this.storeid,
            brand_name: this.brandname,
            main_image: this.mainimg,
            contact_number: this.telnumber,
            business_time: `${this.str};${this.str2}`,
            indexstyle_id: this.stylecode,
            delivery_fee: Number(this.deliveryfee),
            logo: this.logoUrl
          })
          .then(data => {
            // console.log(data);
            if (data.code === 1) {
              this.$message("设置店铺" + data.msg);
              this.$loading.end();
              this.$router.push(`/storeindex?storeid=${this.storeid}`);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message("参数不完整,请填写完整信息!!");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.storesetting {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: #fff;
  section {
    flex: 1;
    overflow-y: auto;
    .logo {
      padding: pxTorem(10px);
      font-size: pxTorem(18px);
      span {
        font-size: pxTorem(14px);
        color: gray;
      }
    }
    .upload {
      width: pxTorem(100px);
      height: pxTorem(100px);
      border: dashed pxTorem(1px) #ccc;
      margin-left: pxTorem(10px);
      text-align: center;
      position: relative;
      color: gray;
      dt {
        font-size: pxTorem(50px);
      }
      input {
        display: inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        background: #eee;
      }
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .uploadbanner {
      width: 100%;
      p {
        width: 100%;
        position: relative;
        span {
          background: rgba(0, 0, 0, 0.8);
          border-radius: 50%;
          color: #fff;
          display: inline-block;
          width: pxTorem(16px);
          height: pxTorem(16px);
          font-size: pxTorem(12px);
          text-align: center;
          line-height: pxTorem(16px);
          position: absolute;
          right: pxTorem(5px);
          top: pxTorem(5px);
        }
        img {
          width: 100%;
          height: pxTorem(140px);
        }
      }

      dl {
        width: 100%;
        height: pxTorem(150px);
        text-align: center;
        position: relative;
        color: gray;
        border: dashed pxTorem(1px) #ccc;
        box-sizing: border-box;
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        dt {
          font-size: pxTorem(100px);
        }
        input {
          display: inline-block;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          background: #eee;
        }
      }
    }
    .main {
      width: 100%;
      margin-top: pxTorem(20px);
      font-size: pxTorem(16px);
      .item {
        border-bottom: solid pxTorem(1px) #ccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 pxTorem(10px);
        box-sizing: border-box;
        line-height: pxTorem(40px);
        // input{
        //   background: #fff;
        // }
        .time {
          input {
            width: pxTorem(100px);
          }
        }
        select {
          width: pxTorem(100px);
          display: inline-block;
          height: pxTorem(30px);
          border: solid pxTorem(1px) #ccc;
          font-size: pxTorem(14px);
        }
      }
      .item_style {
        padding: 0 pxTorem(10px);
        box-sizing: border-box;
        > p {
          line-height: pxTorem(40px);
        }
        dl {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          input {
            width: pxTorem(20px);
            height: pxTorem(20px);
          }
          dt {
            width: 50%;
            img {
              width: 100%;
            }
          }
          dd {
            width: 50%;
            img {
              width: 100%;
            }
          }
        }
      }
      .checkbox {
        padding: 0 pxTorem(10px);
        box-sizing: border-box;
        > p {
          line-height: pxTorem(40px);
        }
        input {
          width: pxTorem(15px);
          height: pxTorem(15px);
          margin-right: pxTorem(6px);
        }
        label {
          display: inline-block;
          margin-right: pxTorem(18px);
          margin-bottom: pxTorem(15px);
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
  }
  footer {
    width: 100%;
    height: pxTorem(50px);
    background: #f2922f;
    font-size: pxTorem(18px);
    text-align: center;
    line-height: pxTorem(50px);
    color: #fff;
  }
}
</style>

