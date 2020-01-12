import React, {Component} from 'react';
import { Form, Input, Button, Icon } from 'antd';


import Logo from './logo.png'
import './index.less'

export default class Login extends Component {
    render(){
        return(
            <div className="login">
                <header className="login-header">
                    <img src={ Logo } alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-section">
                    <h2>用户登录</h2>
                    <Form className="login-form">
                        <Form.Item>
                            <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名'/>
                        </Form.Item>
                        <Form.Item>
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='密码'/>
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" >登录</Button>
                        </Form.Item>
                        
                    </Form>
                </section>
            </div>
        )
    }
}