## ts-axios 封装

axios 封装

```ts
    // http.ts
    import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

    // 第一步 创建一个axios 实例 

    //  基础配置写在这里 

    const baseOptions:AxiosRequestConfig = {}

    const http = axios.create(baseOptions);

    // 第二步 配置axios 拦截器 

    http.interceptors.request.use(
    (config: AxiosRequestConfig) => {

        // 拦截请求，做统一处理

        // 可以验证请求头内有没有必须的字段

        // 可以在这里配置请求头

        console.log("config:", config);

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
    );
    http.interceptors.response.use(
    (response: AxiosResponse) => {

        //拦截响应，做统一处理

        // 响应拦截器
        //  统一处理请求错误 
        //  错误响应吗

        console.log("res", response);

        return Promise.resolve(response);
    },

    //接口错误状态处理，也就是说无响应时的处理

    (error) => {
        return Promise.reject(error.response.status); 
        // 返回接口返回的错误信息
    }
    );

    //  我在这里暴露四个方法 对应 get post delete put 请求

    //  使用泛型 <A> 控制返回值的数据类型 
    //  ===> AxiosResponse<A>

    /**
     * 
     * @param url 
     * @param options 
     * @return (params)=>http.get()
     *
     */


    export const httpGet = <A>(url: string, options?: AxiosRequestConfig) => (
    params?: {},
    config?: AxiosRequestConfig
    ) => http.get<A>(url, { params, ...options, ...config });

    export const httpDel = <A>(url: string, options?: AxiosRequestConfig) => (
    params?: {},
    config?: AxiosRequestConfig
    ) => http.delete<A>(url, { params, ...options, ...config });

    export const httpPost = <A>(url: string, options?: AxiosRequestConfig) => (
    data: {},
    config?: AxiosRequestConfig
    ) => http.post<A>(url, data, { ...options, ...config });

    export const httpPut = <A>(url: string, options?: AxiosRequestConfig) => (
    data: {},
    config?: AxiosRequestConfig
    ) => http.put<A>(url, data, { ...options, ...config });
```

    使用就很简单了

```ts
    // cart.ts
    type Shop = {
        name: string;
        goods: Goods[];
        isChecked: boolean;
        isDel: boolean;
    }


    // cart.ts
    import { httpGet } from "./http";

    export default {
        getList: httpGet<Shop[]>("/cart/list"),
    };

    // indx.js

    import Cart from "./cart";

    export const cartApi = Cart;


    // cart.vue
    import {cartApi} from "../../api";

    cartApi.getList().then((res) => {
      this.dataList = res.data;
      this.goodsLoading = false;
    });

```
