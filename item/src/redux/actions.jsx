/**
 * 2.创建 生成action对象的工厂函数
 * 分为同步action和异步action
 */
import { reqLogin } from '../api'
import { setItem } from '../utils/storage'
import { SAVE_USER } from './action-types';

const saveUser = user => ({ type: SAVE_USER, data: user });

export const saveUserAsync = (username, password) => {
    return dispatch => {
        //完成异步操作
        return reqLogin(username, password).then((response) => {
                setItem('user', response);
                //触发更新
                dispatch(saveUser(response));
                //存储用户数据和token到redux中(原因：多个组件需要用到此数据)
                //还需要持续化存储---localStorage(两者结合使用，如果只用localStorage频繁操作会影响性能)

            })
            
    }
}