import Confirm from "./Confirm.vue";
import Vue from "vue";
let Confirmcontructor = Vue.extend(Confirm);
Confirmcontructor.contructor = Confirmcontructor;
const createConfirm = (opt, callback) => {
  let instance = new Confirmcontructor();
  instance.$mount(document.createElement("div"));

  instance.$on("afterleave", () => {
    instance.$destroy();
    document.body.removeChild(instance.$el);
    typeof callback === "function" && callback(instance.flag);
  });
  instance.msg = opt;
  instance.visible = true;

  document.body.appendChild(instance.$el);
};
export default Vue => {
  Vue.prototype.$confirm = (opt, callback) => {
    return createConfirm(opt, callback);
  };
};
