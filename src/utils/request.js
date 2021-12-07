import axios from 'axios'
import { url } from '../services/baseUrl'

const instance = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: { "Content-Type": "application/json" }
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // JWT 认证
        if (localStorage.getItem("token")) {
            const token = JSON.parse(localStorage.getItem("token")).token
            instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete instance.defaults.headers.common["Authorization"];
        }
        console.log('请求拦截器 成功');
        return config
    },
    error => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 认证失败
        if (response.data.code === 401) {
            //用户token失效
            //清空用户信息
            window.localStorage.removeItem("token");
            window.location.href = "/login"; //返回登录页
            return Promise.reject("用户token失效"); //接口Promise返回错误状态，错误信息msg可有后端返回，也可以我们自己定义一个码--信息的关系。
        }
        if (response.status !== 200) {
            //接口请求失败，具体根据实际情况判断
            return Promise.reject("状态码错误"); //接口Promise返回错误状态
        }
        return Promise.resolve(response);
    },
    error => {
        if (axios.isCancel(error)) {
            throw new axios.Cancel("cancel request");
        } else {
            console.log("请求错误");
        }
        return Promise.reject(error);
    }
);

export default instance;
