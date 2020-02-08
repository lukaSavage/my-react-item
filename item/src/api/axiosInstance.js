/**
 * 01封装axios模块(拦截器函数)
 * 请求拦截器：设置公共的参数
 * 响应拦截器：错误的集合
 */

import axios from 'axios'
import { message } from 'antd'
 
import { errCode } from '../config/errCode'
import store from '../redux/store'
import { removeUser } from '../redux/actions'
import { removeItem } from '../utils/storage'

//由于一些默认的axios配置选项需要我们去改，所以需要一个新的实例对象去修改这些默认配置
/* 1.创建axios实例 */
const axiosInstance = axios.create({
    baseURL: '/api',    //公共请求路径前缀
    timeout: 10000,
    headers: {
        //公共请求头参数(由于必须写死，所以不写)     
    }
})

/* 2.设置拦截器函数 */
/* 2.1请求拦截器 */
axiosInstance.interceptors.request.use(
    (config) => {
        /* 在这里设置token */
        let token = store.getState().user.token;
        if (token) {
            config.headers.authorization = `Bearer ${token}`
        }

        /*
            如果是POST请求。需要开发者检查请求头是：application/json  applicaion/x-www-form-urlencoded
            如果是 application/json ， 就不用处理（因为axios默认值就是这个）
            如果是 application/x-www-form-urlencoded，就需要对请求参数进行urlencoded转换
        */
        if (config.method === 'post') {
            config.data = Object.keys(config.data).reduce((prev, current) => {
                prev += `&${current}=${config.data[current]}`;
                return prev;
            }, '')
                .slice(1);     //得到的prev需要进行截取去除多出来的&符号，再将最终的结果给config.data
            config.headers['content-type'] = 'application/x-www-form-urlencoded';
        }
        return config;
    }
)


/* 2.2响应拦截器 */
axiosInstance.interceptors.response.use(
    //请求拦截器接收两个回调
    (response) => {
        //响应成功时返回成功的回调函数，失败时返回失败的回调函数
        if (response.data.status === 0) {
            return response.data.data;
        } else {
            return Promise.reject(response.data.msg);
        }
    },
    (err) => {
        //根据不同原因，提示不同错误
        /* ★由于定义的errCode写在这里会生成很多次,为了解决这个问题，写在config配置中★ */

        //错误原因
        let errMsg = '';
        if (err.response) {
            //接收到响应了，但是响应是失败的
            //根据响应状态码判断错误类型
            const errorState = err.response.status;
            errMsg = errCode[errorState];
            if (errorState === 401){
                //说明token过期了,需要用户重新登录，清除本地和redux的数据，跳转到login
                //1.清除本地的localStorage
                removeItem('user');
                //2.清除redux的数据
                store.dispatch(removeUser());
                //给点提示
                message.error('用户过期，请重新登录');
                
            }
        } else {
            //没有接收到响应
            //根据响应message(错误信息)来判断错误类型
            if (err.message.indexOf('Network Error') !== -1) {
                errMsg = '网络连接失败';
            } else if (err.message.indexOf('timeout') !== -1) {
                errMsg = '网络连接超时，请连上wifi试试';
            }
        }
        return Promise.reject(errMsg || '发生未知错误，请联系管理员~');
    }

)

/* 3.最后将axiosInstance实例 暴露出去即可 */
export default axiosInstance;