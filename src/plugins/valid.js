let Vuevalid = (Vue, options) => {
  let { errclass, successclass, event = "blur", validmodif } = options;
  let defaults = [
    {
      modifiers: "number",
      msg: "手机号验证错误",
      valid(val) {
        return /^[0-9]*$/.test(val);
      }
    },
    {
      modifiers: "required",
      msg: "这是必填项",
      valid(val) {
        return val !== "";
      }
    },
    {
      modifiers: "string",
      msg: "用户名只能是字母和数字",
      valid(val) {
        return /^[a-zA-Z\d]+$/.test(val);
      }
    }
  ];
  //自定义规则的合并
  let defaultvalid = defaults.concat(validmodif);
  let handlebind = function(el, binding, vnode) {
    let id = el.getAttribute("data-id");
    let { modifiers } = binding;
    let result = Object.keys(modifiers).map(item => {
      if (defaultvalid.find(i => i.modifiers === item)) {
        let { msg } = defaultvalid.find(i => i.modifiers === item);
        return {
          msg,
          bool: defaultvalid.find(i => i.modifiers === item).valid(this.value)
        };
      }
      return {
        msg: "暂无校验规则",
        bool: true
      };
    });
    // console.log(result);
    let err = result.filter(item => {
      return item.bool === false;
    });
    if (err.length === 0) {
      //通过校验
      el.classList.remove("errclass");
      el.classList.add("successclass");
      //   Vue.set(vnode.context.$data.valid[id], "success", "✔");
      //   Vue.set(vnode.context.$data.valid[id], "err", "");

      document.querySelector(".valid") &&
        el.parentNode.removeChild(document.querySelector(".valid"));
    } else {
      //检验失败

      el.classList.remove("successclass");
      el.classList.add("errclass");
      //   Vue.set(vnode.context.$data.valid[id], "err", "❌");
      //   Vue.set(vnode.context.$data.valid[id], "success", "");

      err.forEach(item => {
        document.querySelector(".valid") &&
          el.parentNode.removeChild(document.querySelector(".valid"));
        let span = document.createElement("span");
        span.style.cssText = "color:red";
        span.className = "valid";

        el.insertAdjacentElement("afterEnd", span);

        span.innerHTML = item.msg;
        return;
        //   el.insert​Adjacent​HTML()
        //   insertAdjacentText()
      });
    }
  };
  Vue.directive("valid", {
    bind: function(el, binding, vnode) {
      el.addEventListener(event, function() {
        handlebind.apply(el, [el, binding, vnode]);
      });
    },
    inserted: function() {
      //   console.log("inserted");
    },
    update: function() {
      //   console.log("update");
    },
    componentUpdated: function() {
      //   console.log("componentUpdated");
    },
    unbind: function(el) {
      //   console.log("unbind");
      el.removeEventListener(event, handlebind);
    }
  });
};

export default Vuevalid;
