/*
 * @Author: mikey.zhang 分类列表，添加分类
 * @Date: 2019-04-12 13:27:27 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2019-04-29 22:58:55
 */

<template>
  <div class="classifylist">
    <header>分类列表</header>
    <section>
      <div class="item" v-for="(i,k) in list" v-bind:key="i.cat_id">
        <dl>
          <dt>分类名称: {{i.cat_name}}</dt>
          <dd>添加时间:2018-06-21</dd>
        </dl>
        <div>
          <img
            src="../assets/images/write.png"
            alt=""
            style="margin-right:10px"
            v-on:click="bj(i.cat_name,i.cat_id)"
          >
          <img src="../assets/images/delete.png" alt="" v-on:click="del(i.cat_id)">
          <span
            class="iconfont icon-ai-list"
            v-on:click="()=>{
              catid=i.cat_id;
              isShowsku=true
            }"
          ></span>
        </div>
      </div>
    </section>
    <footer v-on:click="addclassify">添加分类</footer>
    <!-- 添加sku -->
    <Createsku :setsku="setsku" v-if="isShowsku"></Createsku>
    <!-- 添加分类 -->
    <Dialog title="填写分类名称" v-show="isShow" :isShowFn="isShowFn">
      <input placeholder="填写分类名称" class="ipt" v-model="addclassifylist">
    </Dialog>
    <!-- 编辑分类 -->
    <Dialog title="编辑分类名称" v-show="isShowbj" :isShowFn="isShowFnedit">
      <input placeholder="填写分类名称" class="ipt" v-model="addclassifylist">
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog.vue";
import formData from "../utils/formdata";
import Createsku from "@/components/sku/sku.vue";
let oldval = "";
export default {
  name: "classifylist",
  components: {
    Dialog,
    Createsku
  },
  data() {
    return {
      isShow: false,
      isShowbj: false,
      isShowsku: false,
      list: [],
      addclassifylist: "",
      catid: ""
    };
  },

  created() {
    this.getcatlist();
  },

  methods: {
    getcatlist() {
      this.$http
        .post("/store/goods/cat.list", {
          store_id: this.$route.query.storeid
        })
        .then(data => {
          if (data.code === 1) {
            this.list = data.result;
          }
          // console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    bj(catname, catid) {
      this.addclassifylist = catname;
      this.catid = catid;
      this.isShowbj = true;
      oldval = this.addclassifylist;
    },
    addclassify() {
      this.isShow = true;
    },
    isShowFn(flag) {
      this.isShow = false;
      //添加
      if (flag && this.addclassifylist.trim()) {
        this.$http
          .put("/store/goods/cat.add", {
            store_id: this.$route.query.storeid,
            cat_name: this.addclassifylist
          })
          .then(data => {
            if (data.code === 1) {
              this.$message(data.msg);
              this.$alert("请添加sku,点击最右侧按钮");
            } else {
              this.$message(data.msg);
            }
            // console.log(data);
          })
          .catch(err => {
            console.log(err);
          });

        this.getcatlist();
      }
      this.addclassifylist = "";
    },
    isShowFnedit(flag) {
      this.isShowbj = false;
      //编辑
      if (flag && oldval !== this.addclassifylist) {
        this.$http
          .post("/store/goods/cat.edit", {
            cat_id: this.catid,
            cat_name: this.addclassifylist
          })
          .then(data => {
            if (data.code === 1) {
              this.$message(data.msg);
            }
            // console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
        this.getcatlist();
      }
      this.addclassifylist = "";
    },
    del(catid) {
      //删除
      this.$confirm("确定删除嘛???", flag => {
        // console.log(catid);
        if (flag) {
          this.$http
            .delete(`/store/goods/cat.delete`, {
              data: { cat_id: catid }
            })
            .then(data => {
              if (data.code === 1) {
                this.$message(data.msg);
              }
              // console.log(data);
            })
            .catch(err => {
              console.log(err);
            });
          this.getcatlist();
        }
      });
    },
    setsku(flag, data) {
      this.isShowsku = false;
      if (flag) {
        //确定
        this.$http
          .post("/store/goods/sku.set", {
            sku: JSON.stringify(data),
            store_id: this.$route.query.storeid,
            cat_id: this.catid
          })
          .then(data => {
            // console.log(data);
            if (data.code === 1) {
              this.$message(data.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.classifylist {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  section {
    flex: 1;
    overflow-y: auto;
    .item {
      width: 90%;
      margin: pxTorem(15px) auto;
      box-shadow: 0 0 pxTorem(3px) pxTorem(3px) #eee;
      border-radius: pxTorem(5px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: pxTorem(5px) pxTorem(10px);
      dt {
        font-size: pxTorem(18px);
      }
      dd {
        font-size: pxTorem(15px);
        color: #ccc;
        line-height: pxTorem(30px);
      }
      img {
        width: pxTorem(30px);
      }
      .icon-ai-list {
        font-size: pxTorem(28px);
        margin-left: pxTorem(8px);
        color: gray;
        position: relative;
        top: pxTorem(-3px);
      }
    }
  }

  .ipt {
    width: 100%;
    height: pxTorem(50px);
    background: #eee;
    border-radius: pxTorem(6px);
    padding: 0 pxTorem(10px);
    box-sizing: border-box;
    font-size: pxTorem(15px);
  }
}
header {
  width: 100%;
  height: pxTorem(50px);
  border-bottom: solid pxTorem(1px) #ccc;
  text-align: center;
  line-height: pxTorem(50px);
  font-size: pxTorem(20px);
  padding: 0 pxTorem(10px);
  box-sizing: border-box;
  a {
    float: left;
  }
}
footer {
  width: 100%;
  height: pxTorem(50px);
  background: #f2922f;
  text-align: center;
  line-height: pxTorem(50px);
  font-size: pxTorem(18px);
  color: #fff;
}
</style>


