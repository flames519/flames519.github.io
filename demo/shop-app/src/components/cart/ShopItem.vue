<template>
  <a-list bordered item-layout="vertical" :data-source="noDelGoods">
    <!-- 商铺 -->
    <div slot="header" style="position: relative;">
      <a-button
        shape="circle"
        size="small"
        @click="chooseShop(shop,shop.isChecked)"
        class="choose-g-btn"
        :class="{cur:shop.isChecked}"
      ></a-button>
      {{shop.name}}
    </div>

    <!-- 商品 -->
    <a-list-item slot="renderItem" slot-scope="goods">
      <a-list-item-meta>
        <p slot="title">商品: {{ goods.title}}</p>
        <div slot="description" style="position: relative;">
          <a-button
            shape="circle"
            size="small"
            @click="chooseGoods(goods,shop)"
            class="choose-p-btn"
            :class="{cur:goods.isChecked}"
          ></a-button>
          <p>价格：{{goods.price | priceF}}</p>
          <p>
            数量：
            <a-button shape="circle" size="small" @click="()=>goods.num>1&&goods.num--">－</a-button>
            <span style="margin:0 5px">{{goods.num}}</span>
            <a-button shape="circle" size="small" @click="()=>goods.num<9&&goods.num++">＋</a-button>
          </p>
        </div>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "ShopItem",
})
export default class ShopItem extends Vue {
  // props
  @Prop({ default: () => {} }) shop!: Shop;

  // computer
  private get noDelGoods() {
    return this.shop.goods.filter((goods) => !goods.isDel);
  }

  // $emit
  @Emit("chooseGoods")
  chooseGoods(goods: Goods, shop: Shop) {}
  // $emite ===> this.$emist("choseShop")
  @Emit("chooseShop")
  chooseShop(shop: Shop, bol: boolean) {}

  mounted() {
    console.log(this.$attrs);
    console.log(this.$listeners);
  }
}
</script>

<style scoped lang="scss">
</style>