<template>
  <div class="cart">
    <cart-header :isEdit.sync="isEdit" />
    <!-- 2 -- 开始写商品列表 -->
    <!-- list -- start -->
    <div class="content">
      <a-spin size="large" :spinning="goodsLoading">
        <div v-for="shop of dataList" :key="shop.name">
          <a-list v-if="!shop.isDel" bordered item-layout="vertical" :data-source="shop.goods">
            <div slot="header">
              <button
                @click="chooseShop(shop,shop.isChecked)"
                class="choose-g-btn"
                :class="{cur:shop.isChecked}"
              ></button>
              {{shop.name}}
            </div>
            <a-list-item slot="renderItem" slot-scope="goods">
              <a-list-item-meta v-if="!goods.isDel">
                <p slot="title">{{ goods.title}}</p>
                <div slot="description" style="position: relative;">
                  <button
                    @click="chooseGoods(goods,shop)"
                    class="choose-p-btn"
                    :class="{cur:goods.isChecked}"
                  ></button>
                  <p>价格：{{goods.price | priceF}}</p>
                  <p>数量：{{goods.num}}</p>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </a-spin>
    </div>

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

type Goods = {
  title: string;
  price: number | string;
  num: number;
  isChecked: boolean;
  isDel: boolean;
};
type Shop = {
  name: string;
  goods: Goods[];
  isChecked: boolean;
  isDel: boolean;
};

// ts 装饰器
@Component({
  name: "Cart",
  components: { CartHeader },
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
    return this.dataList.every((s) => s.isChecked);
  }
  get totalPrice() {
    return this.dataList.reduce(
      (pre, p) =>
        pre +
        p.goods.reduce(
          (s, i) => (i.isChecked ? s + parseFloat(i.price + "") * i.num : s),
          0
        ),
      0
    );
  }

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
.cart {
  .ant-page-header-heading-extra {
    display: block;
    float: right;
    width: auto;
    padding-top: 0px;
  }
  .header {
    border: 1px solid rgb(235, 237, 240);
  }
  .cur {
    background-color: red;
  }
  .choose-p-btn,
  .choose-g-btn {
    width: 19px;
    height: 19px;
  }
  .choose-g-btn {
    position: relative;
    left: -105px;
  }
  .choose-p-btn {
    position: absolute;
    top: 7px;
    left: 29px;
  }
  .content {
    margin-bottom: 60px;
  }
  .total {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background-color: rgb(235, 237, 240);
  }
}
</style>

<style scoped lang="scss">
</style>
