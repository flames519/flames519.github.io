<template>
  <div class="cart">
    <!-- 先写一个购物车 -->
    <!-- <a-button>按钮</a-button> -->
    <!-- header - start -->
    <a-page-header class="header" title="购物车" @back="() => null">
      <template slot="extra">
        <!-- step 3 -->
        <a-button key="headleBtn" @click.stop="isEdit=!isEdit">{{headleBtn}}</a-button>
        <!-- step 2 -->
        <!-- <a-button key="headleBtn" @click.stop="isEdit=!isEdit">{{isEdit ? "编辑" : "完成"}}<a-button> -->
        <!-- step 1 -->
        <!-- <a-button key="headleBtn" v-show="isEdit" @click.stop="isEdit=!isEdit">编辑</a-button> -->
        <!-- <a-button key="headleBtn" v-show="!isEdit" @click.stop="isEdit=!isEdit">完成</a-button> -->
        <!-- v-if 和 v-show 的区别-->
        <!--
          v-if 不符合条件的dom元素不会被挂载到页面
          v-show 元素的显示手css属性 display :none 控制
          所以 v-if 较 v-show  有较小的挂载消耗 有较大的切换消耗
        -->
        <!-- <a-button key="headleBtn" v-if="isEdit" @click.stop="isEdit=!isEdit">编辑</a-button> -->
        <!-- <a-button key="headleBtn" v-else @click.stop="isEdit=!isEdit">完成</a-button> -->
      </template>
      <!-- hearder - stop -->
    </a-page-header>

    <!-- header --end -->
    <cart-header :isEdit.sync="isEdit" />

    <!-- content -->
    <div class="content">
      <a-spin size="large" :spinning="goodsLoading">
        <div v-for="shop of dataList" :key="shop.name">
          <a-list v-if="!shop.isDel" bordered item-layout="vertical" :data-source="shop.goods">
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
            <a-list-item slot="renderItem" slot-scope="goods">
              <a-list-item-meta v-if="!goods.isDel">
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
        </div>
      </a-spin>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CartHeader from "../../components/cart/CartHeader"

// ts 装饰器
@Component({
  name: "Cart",
  components:{CartHeader}
})
export default class Cart extends Vue {
  // data
  private isEdit: boolean = true;
  // computer
  private get headleBtn() {
    return this.isEdit ? "编辑" : "完成";
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
}
</style>

<style scoped lang="scss">
.cart {
  .header {
    border: 1px solid rgb(235, 237, 240);
  }
}
</style>
