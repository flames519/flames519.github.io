<template>
  <div class="cart">
    <cart-header :isEdit.sync="isEdit" />
    <!-- 2 -- 开始写商品列表 -->
    <cart-content
      :goodsLoading="goodsLoading"
      :dataList="dataList"
      @chooseShop="chooseShop"
      @chooseGoods="chooseGoods"
    />
    <!-- list --end -->

    <!-- 全选 && 总价 -->
    <div class="total">
      <a-button @click="chooseAll">{{ isAll ? "取消全选" : "全选" }}</a-button>
      <p>总计：{{ totalPrice | priceF }}</p>
      <a-button @click="headle">{{ isEdit ? "提交订单" : "删除" }}</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, defineComponent, ref, reactive, computed } from "vue";

// ts 装饰器
export default defineComponent({
  name: "Cart",
  // components: { CartHeader, CartContent },
  setup() {
    const isEdit = ref<boolean>(true);
    const dataList = reactive<Shop[]>([]);
    const goodsLoading = ref<boolean>(false);
    const isAll = computed(() =>
      dataList.every((s) => !s.isDel && s.isChecked)
    );
    const totalPrice = computed(() =>
      dataList.reduce(
        (pre, p) =>
          pre +
          p.goods.reduce(
            (s, i) =>
              !i.isDel && i.isChecked
                ? s + parseFloat(i.price + "") * i.num
                : s,
            0
          ),
        0
      )
    );
    // choose
    const sTop = (shop: Shop) => {
      const bol: boolean = shop.isChecked;
      shop.goods.forEach((p) => (p.isChecked = bol));
    };
    const pTos = (shop: Shop) => {
      shop.isChecked = shop.goods.every((g) => g.isChecked);
    };
    const chooseGoods = (goods: Goods, shop: Shop) => {
      const bol = goods.isChecked;
      goods.isChecked = !bol;
      pTos(shop);
    };
    const chooseShop = (shop: Shop, bol: boolean) => {
      shop.isChecked = !bol;
      sTop(shop);
    };
    const chooseAll = () => {
      const bol = isAll.value;
      dataList.forEach((s) => {
        chooseShop(s, bol);
      });
    };
    // headle
    const headle = () => {
      if (!isEdit.value) {
        // del
        dataList.forEach((s) => {
          if (s.isChecked) {
            s.isDel = true;
            s.goods.forEach((g) => (g.isDel = true));
          } else {
            s.goods.forEach((g) => (g.isDel = g.isChecked));
          }
        });
      } else {
        // submit
      }
    };
  },
  // async getList(){
  //   const res = await cartApi.getList()
  //   this.dataList = res.data
  //   this.goodsLoading = false
  // }
});
</script>
