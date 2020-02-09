/**
 * 4.通过prevState和action对象生成的新状态
 */
import { combineReducers } from 'redux';
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
import { getItem } from '../utils/storage';

const initUser = getItem('user') || {};
function user(prevState = initUser, action) {
    switch (action.type) {
        case SAVE_USER:
            return action.data;
        case REMOVE_USER:
            return {};
        default:
            return prevState;
    }
}

function removeuser(prevState = 222, action) {
    switch (action.type) {
        default:
            return prevState;
    }
}

/* 语言国际化 */
const initLanguage = navigator.language || navigator.languages || 'zh-CN';
function language(prevState = initLanguage, action) {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            return action.data;
        default:
            return prevState;
    }
}
/* 获取分类管理数据 */
const initCategories = [];
function categories(prevState = initCategories, action) {
    switch (action.type) {
        case GET_CATEGORY_LIST:
            return action.data;
        case ADD_CATEGORY:
            return [...prevState, action.data];
        case MODIFIED_CATEGORY:
            return prevState.map((category) => {
                if (category._id === action.data._id) {
                    return action.data;
                }
                return category;
            });
        case DELETE_CATEGORY:
            return prevState.filter((category) => {
                if (category._id === action.data) {
                    return false;
                }
                return true;
            });
        default:
            return prevState;
    }
}

/* 获取角色列表 */
const initRoleList = [];
function role(prevState = initRoleList, action) {
    switch (action.type) {
        case GET_ROLE_LIST:
            return action.data;
        case ADD_ROLE:
            return [...prevState,action.data];
        case UPDATE_ROLE:
            return prevState.map((item,index)=>{
                if(item._id === action.data._id){
                    return action.data;
                }
                return item;
            })
        default:
            return prevState;
    }
}


export default combineReducers({
    user,
    removeuser,
    language,
    categories,
    role
});