/**
 * 01封装axios模块(拦截器函数)
 */

import axios from 'axios'

import errCode from '../config/errCode'

//由于一些默认的axios配置选项需要我们去改，所以需要一个新的实例对象去修改这些默认配置
/* 1.创建axios实例 */
const axiosInstance = axios.create({
    baseURL: '/api',    //公共请求路径前缀
    timeout: 10000,
    headers: {
        //公共请求头参数        
    }
})

/* 2.设置拦截器函数 */
    /* 2.1请求拦截器 */
axiosInstance.interceptors.request.use(
    (config) => {
        /* 设置一些公共的参数 */
        let token = '';
        if (token) {
            config.headers.authorization = `Bearer ${token}`
        }

        /*
            如果是POST请求。需要开发者检查请求头是：application/json  applicaion/x-www-form-urlencoded
            如果是 application/json ， 就不用处理（因为axios默认值就是这个）
            如果是 application/x-www-form-urlencoded，就需要对请求参数进行urlencoded转换
        */
        if(config.method === 'post' ){
            config.data = Object.keys(config.data).reduce((prev,current)=>{
                prev += `&${current}=${config.data[current]}`;
                return prev;
            },'')
            .slice(1);     //得到的prev需要进行截取去除多出来的&符号，再将最终的结果给config.data
            config.headers['content-type'] = 'application/x-www-form-urlencoded';
        }
        return config;
    }
)


    /* 2.2响应拦截器 */
axiosInstance.interceptors.response.use(
    //请求拦截器接收两个回调
    (response)=>{
        //响应成功时返回成功的回到函数，失败时返回失败的回调函数
        if(response.data.status ===0 ){
            return response.data.data;
        }else{
            return Promise.reject(response.data.msg);
        }
    },
    (err)=>{
        //根据不同原因，提示不同错误
        /* ★由于定义的errCode写在这里会生成很多次,为了解决这个问题，写在config配置中★ */
        
        //错误原因
        let errMsg = '';




        if(err.response){
            //接收到响应了，但是响应是失败的
            //根据响应状态码判断错误类型
            errMsg = errCode[err.response.status];
        }else{
            //没有接收到响应
            //根据响应message(错误信息)来判断错误类型
            if(err.message.indexOf('Network Error') !== -1){
                errMsg = '网络连接失败';
            }else if(err.message.indexOf('timeout') !== -1){
                errMsg = '网络连接超时，请连上wifi试试';
            }
        }
        return Promise.reject(errMsg || '发生未知错误，请联系管理员~');
    }

)

/* 3.最后将axiosInstance实例 暴露出去即可 */
export default axiosInstance;