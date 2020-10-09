<template>
  <div>
    <a-button @click="handleLogin">{{ btnName }}</a-button>
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
  handleLogin() {
    this.login();
    if (!this.isLogin) return;
    // console.log(this.$route);
    // console.log(this.$router);
    const path = this.$route.query.r as string;
    path && this.$router.push(path);
  }
}
</script>

<style scoped lang="scss"></style>
