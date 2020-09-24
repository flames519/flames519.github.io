import { httpGet } from "./http";

export default {
  getList: httpGet<Shop[]>("/cart/list"),
};
