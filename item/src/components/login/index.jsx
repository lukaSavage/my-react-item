import React, {Component} from 'react';
import { Form, Input, Button, Icon } from 'antd';


import Logo from './logo.png'
import './index.less'



class Login extends Component {
    //自定义表单校验规则
    validator = (rule, value, callback)=>{
        const regExp = /^\w+$/;
        if(!value){
            callback('密码不能为空');
        }else if(value.length < 4){
            callback('密码长度必须大于4');
        }else if(value.length > 15){
            callback('密码长度必须小于15');
        }else if(!regExp.test(value)){
            console.log(regExp.test(value));          
            callback('密码只能包含数字、字母、下划线');
        }


        //官方要求必须要调用
        /**
         * callback();    callback 不传参，代表校验成功
         * callback(message);    callback 传参，代表校验不成功，message代表提示信息
         * 注意：只有满足以上所有条件，才能调用下面的callback();
         */
        callback();
    }

    render(){
        const { getFieldDecorator } = this.props.form;
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
                            {
                                getFieldDecorator('username',{
                                    //校验规则(这种校验规则不好，因为如果满足两个规则，两个message都会显示)
                                    rules: [
                                        { required: true, message: '用户名不能为空' },
                                        { min: 3,message: '用户名长度必须大于3' },
                                        { max: 10,message: '用户名长度必须小于10' },
                                        {pattern: /^\w+$/,message:'用户名只能包含数字、字母、下划线'},
                                    ],
                                })(
                                    <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名'/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    //校验规则
                                    rules: [
                                        //将函数写在外面原因是函数不会反复的创建
                                        {validator: this.validator},
                                    ],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='密码'/>
                                )
                            }                  
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

export default Form.create()(Login);