import React from 'react'
import axios from 'axios'
import { message } from 'antd'

export default function test() {
    // let token = '';
    // const click1 = () => {
    //     axios({
    //         method: 'POST',
    //         url: '/api/login',
    //         data: {
    //             username: 'admin',
    //             password: 'admin'
    //         }
    //     })
    //         .then(response => {
    //             console.log(response);
    //             if (response.data.status === 0) {
    //                 token = response.data.data.token;
    //                 message.success('登录成功');
    //             } else {
    //                 message.error('用户名或者密码错误');
    //             }
    //         })
    //         .catch(err => {
    //             message.error('网络错误');
    //         })
    // }
    // const click2 = () => {
    //     axios({
    //         method: 'POST',
    //         url: '/api/category/add',
    //         data: {
    //             categoryName: '手机'
    //         },
    //         headers: {
    //             authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(response => {
    //             console.log(response);
    //             if (response.data.status === 0) {
    //                 message.success('添加成功');
    //             } else {
    //                 message.error('添加失败');
    //             }
    //         })
    //         .catch(err => {
    //             message.error('网络错误');
    //         })
    // }
    // const click3 = () => {
    //     console.log(111);
    // }
    /* 下面使用axios的拦截器技术 */
    const axiosInstance = axios.create({
        baseURL: '/api',
        timeout: 100000,
        headers: {}
    })
    axiosInstance.interceptors.request.use(
        //config是一个对象，里面包含所有发送请求的配置
        (config) => {
            
            if (token) {
                config.headers.authorization = `Bearer ${token}`
            }
            /*下面的这块内容加不加主要看是否必须使用application/x-www-form-urlencoded发送请求*/
            if (config.method === 'post') {
                const keys = Object.keys(config.data);
                //想要返回的是字符串/数组,初始化值就是一个空字符串/空数组
                const res = keys.reduce((prevent, current) => {
                    return prevent += `&${current}=${config.data[current]}`
                }, '').slice(1);
                config.data = res;
                config.headers['Content-type'] = 'application/x-www-form-urlencoded';

            }

            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    axiosInstance.interceptors.response.use(
        (response) => {
            //响应成功需要做的事情:统一处理错误，让then不再判断是否密码错误(response.data.status === 0)，即请求失败或者请求成功但登陆失败都去catch方法
            console.log(response);
            if (response.data.status === 0) {
                return response.data.data;      //响应成功并且密码也正确
            } else {
                return Promise.reject(response.data.msg);    //响应成功但密码不正确
            }

        },
        (err) => {
            //响应失败需要做的事情：根据不同的错误，返回不同的错误类型
            const errCode = {
                401: '没有权限访问',
                403: '禁止访问当前窗口',
                404: '当前资源未找到',
                500: '服务器发生未知错误'
            }
            console.dir(err);
            
            if (err.response) {
                //对应场景是:接收到响应，但是失败的，根据响应状态码来判断错误
                return Promise.reject(errCode[err.response.status] || '发生未知错误，请联系管理员');
            } else {
                // 对应场景是:响应都没发出去，网络有问题
                if (err.message.indexOf('Network Error') !== -1) {
                    return Promise.reject('网络连接失败');
                } else if (err.message.indexOf('timeout') !== -1) {
                    return Promise.reject('网络超时...');
                } else {
                    return Promise.reject('未知错误...');
                }

            }

        }
    );

    let token = '';
    const click1 = () => {
        axiosInstance({
            method: 'POST',
            url: '/login',
            data: {
                username: 'admin',
                password: 'admin'
            },

        })
            .then(response => {
                //此时response得到的是上面的response.data.data
                /* if (response.data.status === 0) {
                    token = response.data.data.token;
                    message.success('登录成功');
                } else {
                    message.error('用户名或者密码错误');
                } */
                console.log(response);
                message.success('登录成功');
            })
            .catch(err => {
                //此时response得到的是上面的response.data.msg
                message.error(err);
            })
    }
    const click2 = () => {
        axiosInstance({
            method: 'POST',
            url: '/category/add',
            data: {
                categoryName: '手机'
            },
            // headers: {
            //     authorization: `Bearer ${token}`
            // }
        })
            .then(response => {
                
                if (response.data.status === 0) {
                    message.success('添加成功');
                } else {
                    message.error(response.data.msg);
                }
            })
            .catch(err => {
                console.log(err);

                message.error(err);
            })
    }
    const click3 = () => {
        const obj = {
            username: 'jack',
            age: 18
        }
        const result = Object.keys(obj);
        console.log(result);

    }
    return (
        <div>
            <button onClick={click1}>button1</button>
            <button onClick={click2}>button2</button>
            <button onClick={click3}>button3</button>
        </div>
    )
}
