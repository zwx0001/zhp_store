<template>
  <div class="sku-mask">
    <div class="sku">
      <dl class="item" v-for="(i,k) in array" v-bind:key="k">
        <b style="padding:0 10px" v-on:click="delsku(k)" v-if="k!==array.length-1">-</b>
        <dt>
          <input type="text" placeholder="请输入sku-group" v-model="i.group">
        </dt>
        <b>→</b>
        <dd>
          <span v-for="(v,m) in i.params" v-bind:key="m">
            <input type="text" placeholder="请输入sku-item" v-model="i.params[m]">
            <b v-if="m!==i.params.length-1" v-on:click="delitemsku(k,m)">-</b>
          </span>
          <b v-on:click="additem(i.params)">+</b>
        </dd>
      </dl>
      <span v-on:click="addsku">+增加sku</span>
      <button v-on:click="confirm(false)">取消</button>
      <button v-on:click="confirm(true)" style="marginLeft:10px">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "sku",
  props: {
    setsku: Function
  },
  data() {
    return {
      array: [
        {
          group: "",
          params: [""]
        }
      ]
    };
  },
  methods: {
    additem(params) {
      params.push("");
    },
    addsku() {
      this.array.push({
        group: "",
        params: [""]
      });
    },
    delitemsku(k, m) {
      this.array[k].params.splice(m, 1);
    },
    delsku(k) {
      this.array.splice(k, 1);
    },
    confirm(flag) {
      this.setsku(flag, this.array);
    }
  }
};
</script>
<style lang="scss" scoped>
.sku-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  .sku {
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    padding: pxTorem(10px);
    position: relative;
    button {
      width: pxTorem(50px);
      height: pxTorem(20px);
    }
    > span {
      padding: pxTorem(4px) pxTorem(10px);
      background: #007aff;
      position: absolute;
      bottom: pxTorem(5px);
      display: inline-block;
      left: 45%;
      margin-top: pxTorem(50px);
      color: #fff;
    }
    .item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: pxTorem(20px);
      > b {
        font-size: pxTorem(20px);
      }

      dt {
        input {
          margin-right: pxTorem(15px);
        }
      }
      dd {
        input {
          margin-right: pxTorem(15px);
          margin-bottom: pxTorem(5px);
        }
        b {
          font-size: pxTorem(20px);
        }
        > span {
          b {
            font-size: pxTorem(20px);
          }
        }
      }
      input {
        width: pxTorem(120px);
        height: pxTorem(30px);
        border: solid pxTorem(1px) #000;
        padding: 0 pxTorem(6px);
      }
    }
  }
}
</style>


