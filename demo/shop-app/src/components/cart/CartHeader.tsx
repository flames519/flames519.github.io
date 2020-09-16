import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component({
  name: "CartHeader",
})
export default class CartHeader extends Vue {
  // props
  @Prop({ default: true }) isEdit!: boolean;
  // computer
  private get headleBtn() {
    return this.isEdit ? "编辑" : "完成";
  }
  // $emit
  @Emit("update:isEdit")
  updateIsEdit() {
    return !this.isEdit;
  }
  protected render() {
    return (
      <div class="cart">
        <a-page-header class="header" title="购物车" onBack={() => null}>
          <template slot="extra">
            <a-button key="headleBtn" onClick={() => this.updateIsEdit()}>
              {this.headleBtn}
            </a-button>
          </template>
        </a-page-header>
      </div>
    );
  }
}
