<template>
  <div>
    <a-button @click="login">{{ btnName }}</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
@Component({
  name: "Login",
})
export default class Login extends Vue {
  @State("isLogin") public isLogin!: boolean;
  @Mutation("login") public login: any;
  get btnName() {
    return this.isLogin ? "注销" : "登录";
  }
}
</script>

<style scoped lang="scss">
</style>