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
      <a-button @click="chooseAll">{{isAll ? "取消全选":"全选"}}</a-button>
      <p>总计：{{totalPrice | priceF}}</p>
      <a-button @click="headle">{{isEdit?"提交订单":"删除"}}</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { filter } from "vue/types/umd";
import CartHeader from "../../components/cart/CartHeader";
import CartContent from "../../components/cart/CartContent.vue";
import "../../components/cart/CartTypes";

// ts 装饰器
@Component({
  name: "Cart",
  components: { CartHeader, CartContent },
})
export default class Cart extends Vue {
  // data
  private isEdit: boolean = true;
  private dataList: Shop[] = [];
  private goodsLoading: boolean = true;

  // choose
  sTop(shop: Shop) {
    let bol: boolean = shop.isChecked;
    shop.goods.forEach((p) => (p.isChecked = bol));
  }
  pTos(shop: Shop) {
    shop.isChecked = shop.goods.every((g) => g.isChecked);
  }
  chooseGoods(goods: Goods, shop: Shop) {
    let bol = goods.isChecked;
    goods.isChecked = !bol;
    this.pTos(shop);
  }
  chooseShop(shop: Shop, bol: boolean) {
    shop.isChecked = !bol;
    this.sTop(shop);
  }
  chooseAll() {
    let bol = this.isAll;
    this.dataList.forEach((s) => {
      this.chooseShop(s, bol);
    });
  }

  // headle
  headle() {
    if (!this.isEdit) {
      // del
      this.dataList.forEach((s) => {
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
  }

  // computer
  get isAll() {
    return this.dataList.every((s) => !s.isDel && s.isChecked);
  }

  get totalPrice() {
    return this.dataList.reduce(
      (pre, p) =>
        pre +
        p.goods.reduce(
          (s, i) =>
            !i.isDel && i.isChecked ? s + parseFloat(i.price + "") * i.num : s,
          0
        ),
      0
    );
  }

  // mounted
  public mounted() {
    setTimeout(() => {
      console.log("welcome Cart");
      this.dataList = [
        {
          name: "商店a",
          goods: [
            { title: "a1", price: 30, num: 1, isChecked: false, isDel: false },
            { title: "a2", price: 10, num: 3, isChecked: true, isDel: false },
          ],
          isChecked: false,
          isDel: false,
        },
        {
          name: "商店b",
          goods: [
            { title: "b1", price: 30, num: 1, isChecked: true, isDel: false },
            { title: "b2", price: 10, num: 3, isChecked: true, isDel: false },
          ],
          isChecked: true,
          isDel: false,
        },
      ];
      this.goodsLoading = false;
    }, 3000);
  }
}
</script>

<style lang="scss">
@import "../../components/cart/cart.scss";
</style>