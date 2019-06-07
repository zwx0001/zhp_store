import Loging from "./Loging.vue";
import Vue from "vue";
let Logingcontructor = Vue.extend(Loging);
Logingcontructor.constructor = Logingcontructor;
let instance = new Logingcontructor({
  el: document.createElement("div")
});
let createLoging = {
  start: function() {
    instance.visible = true;
    document.body.appendChild(instance.$el);
  },
  end: function() {
    instance.visible = false;
    instance.$on("afterleave", data => {
      instance.$destroy();
      document.body.removeChild(instance.$el);
    });
  }
};

export default Vue => {
  Vue.prototype.$loading = createLoging;
};
