import Alert from "./Alert.vue";
import Vue from "vue";
let Alertcontructor = Vue.extend(Alert);
Alertcontructor.contructor = Alertcontructor;
const createAlert = (opt, callback) => {
  let instance = new Alertcontructor();
  instance.$mount(document.createElement("div"));

  instance.$on("afterleave", () => {
    instance.$destroy();
    document.body.removeChild(instance.$el);
    typeof callback === "function" && callback();
  });

  instance.opt = opt;
  instance.visible = true;
  document.body.appendChild(instance.$el);
};
export default Vue => {
  Vue.prototype.$alert = (opt, callback) => {
    return createAlert(opt, callback);
  };
};
