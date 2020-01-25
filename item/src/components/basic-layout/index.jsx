import React,{ Component } from 'react'
import { Layout, Breadcrumb } from 'antd';
import { FormattedMessage } from 'react-intl'

import LeftNav from './left-nav'
import RightHeader from './right-header'
import Logo from '../../assets/img/logo.png'
import './index.less'

const { Header, Content, Footer, Sider } = Layout;

class BasicLayout extends Component {
    state = {
        collapsed: false,
        display: true
    };

    onCollapse = collapsed => {
        const { display } =this.state;
        console.log(collapsed);
        this.setState({
            collapsed,
            display: !display,
        });
    };

    render() {
        const { children } = this.props;
        
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="layout-logo" >
                        <img src={Logo} alt="logo"/>
                        <h1 style={{ display: this.state.display? 'block':'none' }}>
                            <FormattedMessage id={'title'}/>
                        </h1>
                    </div>
                    <LeftNav/>
                </Sider>
                <Layout>
                    {/* 右边部分 */}
                    <Header style={{ background: '#fff', padding: 0, height: 80 }} >
                        <RightHeader/>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            { children }
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>LukaSavage制作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &copy;2020 版权所有,翻版必究</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default BasicLayout;