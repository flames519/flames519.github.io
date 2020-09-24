import axios, { AxiosRequestConfig, AxiosResponse} from "axios";

const baseOptions:AxiosRequestConfig = {}

const http = axios.create(baseOptions);

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    //拦截请求，做统一处理

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

    console.log("res", response);

    return Promise.resolve(response);
  },
  //接口错误状态处理，也就是说无响应时的处理
  (error) => {
    return Promise.reject(error.response.status); // 返回接口返回的错误信息
  }
);

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
