import Message from "./Message.vue";
import Vue from "vue";
let Messageconstructor = Vue.extend(Message);
Messageconstructor.constructor = Messageconstructor;
let createMessage = opt => {
  let instance = new Messageconstructor();
  let div = document.createElement("div");
  instance.$mount(div);
  instance.$on("afterleave", data => {
    instance.$destroy();
    document.body.removeChild(instance.$el);
  });
  instance.msg = opt;
  instance.visible = true;
  document.body.append(instance.$el);
  return instance;
};

export default Vue => {
  Vue.prototype.$message = opt => {
    return createMessage(opt);
  };
};
