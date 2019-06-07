/*
 * @Author: mikey.zhang 店铺列表
 * @Date: 2019-04-12 13:27:27 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2019-04-22 21:54:23
 */

<template>
  <div class="storeindex">
    <header>店铺列表</header>
    <section>
      <dl
        v-for="(i,k) in storelist"
        v-bind:key="i.store_id"
        v-on:click="gostoreindex(i.store_id,i.store_name)"
      >
        <dt>
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555239268391&di=845b5d67c7c125167e0b2211ae6a9741&imgtype=0&src=http%3A%2F%2Fpic2.to8to.com%2Fcase%2Fday_130407%2F20130407_5fda81c9373b987ab994WM29Vll1BwFJ_sp.jpg"
            alt=""
          >
        </dt>
        <dd>
          <p>{{i.store_name}}</p>
          <p>
            店铺类型:
            <span>{{i.catagory}}</span>
          </p>
          <p>
            店铺专卖:
            <span v-for="(item,v) in i.sub_catagory" v-bind:key="v">{{item}}</span>
          </p>
        </dd>
      </dl>
    </section>
  </div>
</template>

<script>
export default {
  name: "byuserhome",

  data() {
    return {
      storelist: [],
      admittance: []
    };
  },
  created() {
    this.$http
      .get("/buyer/storelist")
      .then(data => {
        // console.log(data);
        if (data.code === 1) {
          this.storelist = data.result;
        } else {
          alert(data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    gostoreindex(storeid, storename) {
      this.$router.push(
        `/byuserstoreindex?storeid=${storeid}&storename=${storename}`
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.storeindex {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  section {
    width: 100%;
    flex: 1;
    overflow-y: auto;
    dl {
      width: 90%;
      padding: pxTorem(5px);
      margin: pxTorem(10px) auto;
      box-shadow: 0 0 pxTorem(6px) #ccc;
      border-radius: pxTorem(5px);
      display: flex;
      dt {
        width: pxTorem(90px);
        height: pxTorem(90px);
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    dd {
      flex: 1;
      margin-left: pxTorem(10px);
      p {
        width: pxTorem(230px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: pxTorem(14px);
        color: gray;
        line-height: pxTorem(30px);
      }
      p:nth-child(1) {
        font-size: pxTorem(20px);
        color: #000;
      }
    }
  }
  header {
    width: 100%;
    height: pxTorem(44px);
    text-align: center;
    line-height: pxTorem(44px);
    font-size: pxTorem(16px);
    padding: 0 pxTorem(10px);
    box-sizing: border-box;
    border-bottom: solid pxTorem(1px) #eee;
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
  .admittance {
    p {
      font-size: pxTorem(14px);
    }
  }
}
</style>


