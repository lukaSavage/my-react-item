/**
 * 02封装请求功能函数
 */
import axiosInstance from './axiosInstance'

//请求登录
export const reqLogin = (username, password) => {
    return axiosInstance({
        url: '/login',
        method: 'POST',
        data: {
            username,
            password
        }
    });
}

//请求获取分类数据
export const reqGetCategoryList = () => {
    return axiosInstance({
        url: '/category/get',
        method: 'GET',

    })
}

//请求添加分类数据的方法
export const reqAddCategory = (categoryName) => {
    return axiosInstance({
        url: '/category/add',
        method: 'POST',
        data: {
            categoryName
        }
    });
}

//请求修改分类数据
export const reqModifiedCategory = (categoryId, categoryName) => {
    return axiosInstance({
        url: '/category/update',
        method: 'POST',
        data: {
            categoryId,
            categoryName
        }
    });
}

//请求删除分类数据
export const reqDelCategory = (categoryId) => {
    return axiosInstance({
        url: '/category/delete',
        method: 'POST',
        data: {
            categoryId,
        }
    });
}

//请求获取商品数据
export const reqGetProductList = (pageNum, pageSize) => {
    return axiosInstance({
        url: '/product/list',
        method: 'GET',
        params: {
            pageNum,
            pageSize
        }

    })
}
//请求添加商品数据
export const reqAddProduct = ({ name, desc, categoryId, price, detail }) => {
    return axiosInstance({
        url: '/product/add',
        method: 'POST',
        data: {
            name, desc, categoryId, price, detail
        }

    })
}

//请求修改商品数据
export const reqUpdateProduct = ({ name, desc, categoryId, price, detail, productId }) => {
    return axiosInstance({
        url: '/product/update',
        method: 'POST',
        data: {
            name, desc, categoryId, price, detail, productId
        }

    })
}

//请求搜索商品数据
/**
 * 解释一下：searchType
 * searchType: productName或者 productDesc 就是Select组件的值
 * searchValue: searchValue 就是搜索框的值
 */
export const reqSearchProduct = ({ searchType, searchValue, pageSize, pageNum }) => {
    return axiosInstance({
        url: '/product/search',
        method: 'GET',
        params: {
            pageNum,
            pageSize,
            [searchType]: searchValue,

        }

    })
}

//请求更新商品状态
export const reqUpdateProductStatus = (productId, status) => {
    return axiosInstance({
        url: '/product/update/status',
        method: 'POST',
        data: {
            productId,
            status

        }

    })
}

//请求获取角色列表数据
export const reqGetRoleList = () => {
    return axiosInstance({
        url: '/role/get',
        method: 'GET',
    })
}

//请求添加角色数据
export const reqAddRole = (name) => {
    return axiosInstance({
        url: '/role/add',
        method: 'POST',
        data: {
            name
        }
    })
}

// 请求设置角色权限数据
export const reqSetAuth = ({ roleId, authName, menus }) => {
    return axiosInstance({
        url: '/role/update',
        method: 'POST',
        data: {
            roleId, authName, menus
        }
    })
}