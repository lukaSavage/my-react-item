import Home from '../components/home'
import Category from '../containers/category'
import Product from '../containers/product'
import ProductManage from '../containers/product/productManage'
import Role from '../containers/role'

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/category',
        component: Category,
        exact: true
    },
    {
        path: '/product',
        component: Product,
        exact: true
    },
    {
        path: '/product/add',
        component: ProductManage,
        exact: true
    },
    {
        path: '/product/update/:id',
        component: ProductManage,
        exact: true
    },
    {
        path: '/role',
        component: Role,
        exact: true
    },
    
]
export default routes;