import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import { ConfigProvider } from 'antd'

import Login from './containers/login';
import Home from './components/home'
import BasicLayout from './components/basic-layout'
import { zhCN, en } from './locales'
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';

@connect(state => ({ language: state.language }), null)
class App extends Component {
    render() {
        const language = this.props.language;
        return (
            <ConfigProvider locale={language === 'en' ? en_US : zh_CN}>
                <IntlProvider locale={language} messages={language === 'en' ? en : zhCN}>
                    <Router>
                        <Switch>
                            <Route path="/login" exact component={Login} />
                            {/* 如果直接把basiclayout放在home中，导致的问题是每一个其他组件都需要引入basicout，还不如让basiclayout当父组件 */}
                            <BasicLayout>
                                <Route path="/" exact component={Home} />
                            </BasicLayout>
                        </Switch>
                    </Router>
                </IntlProvider>
            </ConfigProvider>

        )
    }
}
export default App;