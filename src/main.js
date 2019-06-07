import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/js/flexible.js";
//swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
//懒加载
import VueLazyload from "vue-lazyload";
//引入echarts
import echarts from "echarts"; //引入echarts
Vue.prototype.$echarts = echarts; //引入组件
//引入日期插件
import Calendar from "vue-mobile-calendar";
Vue.use(Calendar);
//引入vconsole
import Vconsole from "vconsole";
let vConsole = new Vconsole();
export default vConsole;

Vue.use(Calendar);
Vue.use(VueAwesomeSwiper);
Vue.use(VueLazyload, {
  preLoad: 2,
  loading: require("./assets/images/pic.gif"),
  listenEvents: ["scroll"]
});

//自定义指令
import Vuevalid from "./plugins/valid";
Vue.use(Vuevalid, {
  errclass: "err-active",
  successclass: "success-active",
  // event: "input",
  validmodif: [
    {
      modifiers: "email",
      msg: "邮箱验证错误",
      valid(val) {
        return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
          val
        );
      }
    }
  ]
});

import http from "./utils/http";
import loading from "./components/loading";
import createMessage from "./components/message/index";
import createAlert from "./components/alert/index";
import createConfirm from "./components/confirm/index";

Vue.config.productionTip = false;
Vue.use(http); //axios
Vue.use(loading); //loging组件
Vue.use(createMessage); //消息提示框
Vue.use(createAlert); //alert提示框
Vue.use(createConfirm); //confirm 确认框

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
