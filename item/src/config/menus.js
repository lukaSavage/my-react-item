/**
 * 该文件用于遍历导航左侧的内容
 */
const menus = [
    {
        title: 'home',
        icon: 'home',
        key: 1,
        path: '/'
    },
    {
        title: 'products',
        icon: 'appstore',
        key: 'sub1', 
        children: [
            {
                title: 'category',
                icon: 'bars',
                key: 2,
                path: '/category'
            },
            {
                title: 'product',
                icon: 'tool',
                key: 3,
                path: '/product'
            }
        ]
    },
    {
        title: 'user',
        icon: 'user',
        key: 4,
        path: '/user'
    },
    {
        title: 'role',
        icon: 'safety',
        key: 5,
        path: '/role',
    },
    {
        title: 'charts',
        icon: 'area-chart',
        key: 'sub2',
        children: [
            {
                title: 'bar',
                icon: 'bar-chart',
                key: 6,
                path: '/charts/bar'
            },
            {
                title: 'pie',
                icon: 'pie-chart',
                key: 7,
                path: '/charts/pie'
            },
            {
                title: 'line',
                icon: 'line-chart',
                key: 8,
                path: '/charts/line'
            }
        ]
    },
]

export default menus;