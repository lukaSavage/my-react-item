/**
 * 4.通过prevState和action对象生成的新状态
 */
import { combineReducers } from 'redux';
import { SAVE_USER, REMOVE_USER, CHANGE_LANGUAGE } from './action-types';
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
function language(prevState=initLanguage,action){
    switch (action.type){
        case CHANGE_LANGUAGE:
            return action.data;
        default:
            return prevState;
    }
}



export default combineReducers({
    user,
    removeuser,
    language
});