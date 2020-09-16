import Vue from "vue";

const filters = {
  priceF: (val: string | number) => `￥${parseFloat(val + "").toFixed(2)}`,
};

export default (vue: Vue) => {
  Object.keys(filters).forEach((key: string) => {
    Vue.filter(key, (filters as any)[key]);
  });
};
