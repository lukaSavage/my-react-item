/**
 * 封装storage的公共函数库(持久化存储token)
 */
const localStorage = window.localStorage;
//保存用户数据
export function setItem(key, value) {
    // 转换成json字符串
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
}

//读取用户数据
export function getItem(key){
    const value = localStorage.getItem(key);
    console.log(key);
    try {
        return JSON.parse(value);
    } catch (err) {
        return value;
    }
}

//删除用户数据
export function removeItem(key) {
    localStorage.removeItem(key);
}