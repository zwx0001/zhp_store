import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/Index.vue") //logo
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue") //app登录页面
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register.vue") //app注册页面
    },
    {
      path: "/storelist",
      name: "storelist",
      component: () => import("@/views/Storelist.vue") //app店铺列表
    },
    {
      path: "/storeindex",
      name: "storeindex",
      component: () => import("@/views/Storeindex.vue") //app店铺首页客户端
    },
    {
      path: "/classifylist",
      name: "classifylist",
      component: () => import("@/views/Classifylist.vue") //app店铺首页客户端
    },
    {
      path: "/createstore",
      name: "createstore",
      component: () => import("@/views/Createstore.vue") //app创建店铺
    },
    {
      path: "/storesetting",
      name: "storesetting",
      component: () => import("@/views/Storesetting.vue") //app创建店铺
    },
    {
      path: "/mystore",
      name: "mystore",
      component: () => import("@/views/Mystore.vue") //我的店铺
    },
    {
      path: "/addproduct",
      name: "addproduct",
      component: () => import("@/views/Addproduct.vue") //添加商品
    },
    {
      path: "/productlist",
      name: "productlist",
      component: () => import("@/views/Productlist.vue") //商品列表
    },
    {
      path: "/productdetail",
      name: "productdetail",
      component: () => import("@/views/Productdetail.vue") //商品详情页面
    },
    {
      path: "/addplatformpro",
      name: "addplatformpro",
      component: () => import("@/views/Addplatformpro.vue") //添加平台商品
    },
    {
      path: "/applylist",
      name: "applylist",
      component: () => import("@/views/Applylist.vue") //申请列表
    },
    {
      path: "/allproduct",
      name: "allproduct",
      component: () => import("@/views/Allproduct.vue") //所有商品列表
    },
    {
      path: "/report",
      name: "report",
      component: () => import("@/views/Report.vue") //销售报表
    },
    {
      path: "/byuserindex",
      name: "byuserindex",
      component: () => import("@/views/byuser/Index.vue") //用户端首页
    },
    {
      path: "/byuserhome",
      name: "byuserhome",
      component: () => import("@/views/byuser/Home.vue") //app所有店铺列表
    },
    {
      path: "/byuserlogin",
      name: "byuserlogin",
      component: () => import("@/views/byuser/Login.vue") //app登录页面
    },
    {
      path: "/byuserregister",
      name: "byuserregister",
      component: () => import("@/views/byuser/Register.vue") //app注册页面
    },
    {
      path: "/byuserstoreindex",
      name: "byuserstoreindex",
      component: () => import("@/views/byuser/Storeindex.vue") //app店铺
    },
    {
      path: "/productiondetail",
      name: "productiondetail",
      component: () => import("@/views/byuser/Productiondetail.vue") //商品详情
    },
    {
      path: "/byuserprodetail",
      name: "prodetail",
      component: () => import("@/views/byuser/Prodetail.vue") //商品详情
    },
    {
      path: "/byusermine",
      name: "mine",
      component: () => import("@/views/byuser/Mine.vue") //我的
    },
    {
      path: "/byusershopcarlist",
      name: "shopcar",
      component: () => import("@/views/byuser/Shopcar.vue") //购物车展示列表
    },
    {
      path: "/byuserconfirmorder",
      name: "confirmorder",
      component: () => import("@/views/byuser/Confirmorder.vue") //购物车展示列表
    },
    {
      path: "/byusermyorder",
      name: "orderlist",
      component: () => import("@/views/byuser/Myorder.vue") //购物车展示列表
    },
    {
      path: "/byuserpaysuccess",
      name: "paysuccess",
      component: () => import("@/views/byuser/Paysuccess.vue") //支付成功
    },
    {
      path: "/orderlist",
      name: "orderlist",
      component: () => import("@/views/Orderlist.vue") //买家列表
    },
    {
      path: "/getorder",
      name: "Getorder",
      component: () => import("@/views/Getorder.vue") //买家接单
    }
  ]
});
