import React, { Component } from 'react'
import { Button, Icon, Modal } from 'antd'
import screenfull from 'screenfull'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import dayjs from 'dayjs'

import './index.less'
import { removeItem } from '../../../utils/storage'
import { removeUser, changeLanguage } from '../../../redux/actions'
import menus from '../../../config/menus'

const { confirm } = Modal;
@injectIntl
@connect(
    state => ({
        username: state.user.user && state.user.user.username,
        language: state.language
    }),
    {
        removeUser,
        changeLanguage
    }
)
@withRouter
class RightHeader extends Component {
    state = {
        isScreenFull: false,
        date: Date.now()
    }
    sth = () => {
        this.setState({
            isScreenFull: !this.state.isScreenFull
        })
    }
    componentDidMount() {
        screenfull.on('change', this.sth);
        this.timer=setInterval(() => {
            this.setState({
                date:Date.now()
            })
        }, 1000);
    }
    componentWillMount() {
        screenfull.off('change', this.sth);
        clearInterval(this.timer)
    }
    screenFull = () => {
        screenfull.toggle();
    }
    exit = () => {
        const { intl } = this.props;
        confirm({
            title: intl.formatMessage({ id: 'logout' }),
            onOk: () => {
                removeItem('user');
                this.props.removeUser();
                this.props.history.replace('/login');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    lang = () => {
        const language = this.props.language === 'en' ? 'zh-CN' : 'en';
        this.props.changeLanguage(language);
    }
    findTitle = (menus, pathname) => {
        for (let index = 0; index < menus.length; index++) {
            const menu = menus[index];
            if (menu.children) {
                for (let index = 0; index < menu.children.length; index++) {
                    const cMenu = menu.children[index];
                    if(cMenu.path === pathname){
                        return cMenu.title;
                    }
                }
            } else{
                if(menu.path === pathname){
                    return menu.title;
                }
            }

        }
    }
    render() {
        const { isScreenFull, date } = this.state;
        const { username, language, location: { pathname } } = this.props;
        const title = this.findTitle(menus, pathname);
        return (
            <div className="right-header">
                <div className="right-header-top">
                    <Button size="small" onClick={this.screenFull}>
                        <Icon type={isScreenFull ? 'fullscreen-exit' : 'fullscreen'} />
                    </Button>
                    <Button size="small" className="lang" onClick={this.lang}>
                        {
                            language === 'en' ? '中文' : '英文'
                        }
                    </Button>
                    <span>
                        hello,{username}
                    </span>
                    <Button type="link" onClick={this.exit}>
                        退出
                    </Button>
                </div>
                <div className="right-header-bottom">
                    <span className="right-header-bottom-product">
                        <FormattedMessage id={title} />
                    </span>
                    <span className="right-header-bottom-time">
                        {
                            dayjs(date).format('YYYY-MM-DD HH:mm:ss')
                        }
                    </span>
                </div>
            </div>
        )
    }
}
export default RightHeader;