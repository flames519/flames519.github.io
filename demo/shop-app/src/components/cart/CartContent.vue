<template>
  <div class="content">
    <a-spin size="large" :spinning="goodsLoading">
      <div v-for="shop of dataList" :key="shop.name">
        <shop-item :shop="shop" v-on="$listeners" />
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ShopItem from "./ShopItem.vue";

@Component({
  name: "CartContent",
  components: { ShopItem },
})
export default class CartContent extends Vue {
  @Prop({ default: true }) goodsLoading!: boolean;
  @Prop({ default: () => [] }) dataList!: Shop[];
}
</script>

<style scoped lang="scss">
</style>