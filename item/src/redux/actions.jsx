/**
 * 2.创建 生成action对象的工厂函数
 * 分为同步action和异步action
 */
import {
    reqLogin,
    reqGetCategoryList,
    reqAddCategory,
    reqModifiedCategory,
    reqDelCategory,
    reqGetRoleList,
    reqAddRole,
    reqSetAuth
} from '../api'
import { setItem } from '../utils/storage'
import {
    SAVE_USER,
    REMOVE_USER,
    CHANGE_LANGUAGE,
    GET_CATEGORY_LIST,
    ADD_CATEGORY,
    MODIFIED_CATEGORY,
    DELETE_CATEGORY,
    GET_ROLE_LIST,
    ADD_ROLE,
    UPDATE_ROLE
} from './action-types';

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
export const removeUser = () => ({ type: REMOVE_USER, })
export const changeLanguage = (lang) => ({ type: CHANGE_LANGUAGE, data: lang })


//异步获取cagetory的数据内容
const getCategoryList = categories => ({ type: GET_CATEGORY_LIST, data: categories })
export const getCategoryListAsync = () => {
    return dispatch => {
        return reqGetCategoryList()
            .then(response => {
                //调用dispatch触发更新
                dispatch(getCategoryList(response));
            })
    }
}

//异步添加分类
const addCategory = category => ({ type: ADD_CATEGORY, data: category })
export const addCategoryAsync = (categoryName) => {
    return dispatch => {
        return reqAddCategory(categoryName)
            .then(response => {
                //调用dispatch触发更新
                dispatch(addCategory(response));
            })
    }
}


//异步修改分类
const modifiedCategory = category => ({ type: MODIFIED_CATEGORY, data: category })
export const modifiedCategoryAsync = (categoryId, categoryName) => {
    return dispatch => {
        return reqModifiedCategory(categoryId, categoryName)
            .then(response => {
                //调用dispatch触发更新
                dispatch(modifiedCategory(response));
            })
    }
}

//异步删除分类
const delCategory = category => ({ type: DELETE_CATEGORY, data: category })
export const delCategoryAsync = (categoryId) => {
    return dispatch => {
        return reqDelCategory(categoryId)
            .then(response => {
                //调用dispatch触发更新
                dispatch(delCategory(response));
            })
    }
}

//异步获取角色列表数据
const getRoleList = (role) => ({ type: GET_ROLE_LIST, data: role })
export const getRoleListAsync = () => {
    return dispatch => {
        return reqGetRoleList().then(response => {
            //请求成功，更新数据
            dispatch(getRoleList(response));
        })

    }
}

//异步添加角色名字数据
const addRole = (roleName) => ({ type: ADD_ROLE, data: roleName })
export const addRoleAsync = (name) => {
    return dispatch => {
        return reqAddRole(name).then(response => {
            //请求成功，更新数据
            dispatch(addRole(response));
        })

    }
}

//异步添加角色名字数据
const updataRole = (role) => ({ type: UPDATE_ROLE, data: role })
export const updateRoleAsync = (name) => {
    return dispatch => {
        return reqSetAuth(name).then(response => {
            //请求成功，更新数据
            dispatch(updataRole(response));
            //这一步操作是为了将更新后的role返回出去
            return response;
        })

    }
}