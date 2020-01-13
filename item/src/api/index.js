/**
 * 02封装请求功能函数
 */
import axiosInstance from './axiosInstance'
export const reqLogin = (username, password)=>{
    return axiosInstance({
        url: '/login',
        method: 'POST',
        data: {
            username,
            password
        }
    });
}