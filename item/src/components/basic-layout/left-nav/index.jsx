/**
 * 该模块为basic-layout的子组件
 */
import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import menus from '../../../config/menus'

const { SubMenu } = Menu;

@withRouter
class LeftNav extends Component {
    createMenus = (menus) => {
        return menus.map((item, index) => {
            //如果有children说明是二级菜单，不过没有说明一级菜单
            if (item.children) {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <FormattedMessage id={item.title} />
                            </span>
                        }
                    >
                        {

                            item.children.map((item, index) => {
                                return (
                                    <Menu.Item key={item.path}>
                                        <Link to={item.path}>
                                            <Icon type={item.icon} />
                                            <FormattedMessage id={item.title} />
                                        </Link>
                                    </Menu.Item>
                                )

                            })
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.path}>
                        <Link to={item.path}>
                            <Icon type={item.icon} />
                            <FormattedMessage id={item.title} />
                        </Link>
                    </Menu.Item>
                )
            }
        })
    }
    findOpenKeys = (pathname, menus) => {
        const menu = menus.find((item, index) => {

            if (item.children) {
                return item.children.find(items => items.path === pathname);
            }
        })


        if (menu) {
            console.log(menu);

            return menu.key
        }
    }
    render() {
        let { pathname } = this.props.location;
        //pathname 可能是/product 或者是/product/add
        if (pathname.indexOf('/product') !== -1) {
            pathname = '/product';
        }
        const openKey = this.findOpenKeys(pathname, menus);
        return (
            <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKey]} mode="inline">
                {
                    this.createMenus(menus)
                }
                {/* 由于超级管理员和普通管理员的权限不一样，得到的左侧页面不一样，所以不能写死，得用上面的方法遍历完成 */}
                {/* <Menu.Item key="1">
                    <Icon type="home" />
                    <span>首页</span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="appstore" />
                            <span>商品</span>
                        </span>
                    }
                >
                    <Menu.Item key="2">
                        <Icon type="bars" />
                        <span>分类管理</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="tool" />
                        <span>商品管理</span>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="4">
                    <Icon type="user" />
                    <span>用户管理</span>
                </Menu.Item>
                <Menu.Item key="5">
                    <Icon type="safety" />
                    <span>权限管理</span>
                </Menu.Item>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="area-chart" />
                            <span>图形列表</span>
                        </span>
                    }
                >
                    <Menu.Item key="6">
                        <Icon type="bar-chart" />
                        <span>柱形图</span>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Icon type="line-chart" />
                        <span>折线图</span>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Icon type="pie-chart" />
                        <span>饼状图</span>
                    </Menu.Item>

                </SubMenu> */}
            </Menu>
        )
    }
}

export default LeftNav;