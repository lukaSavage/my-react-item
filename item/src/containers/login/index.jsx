import React, {Component} from 'react';
import { Form, Input, Button, Icon, message } from 'antd';





import Logo from './logo.png'
import './index.less'

import { connect } from 'react-redux'
import { saveUserAsync } from '../../redux/actions'
import withCheckLogin from '../with-check-login'

@withCheckLogin
@connect(
    null,
    {saveUserAsync}
)
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
    /* 登录按钮模块 */
    sub = e =>{
        e.preventDefault();
        
        /**
         * 要做的三件事
         * 1.校验表单
         * 2.收集表单数据
         * 3.发送请求
         */
        //1.校验表单并收集数据(使用validateFields方法)
        this.props.form.validateFields((err,values)=>{
            
            if(!err){
                const { username, password } = values;
                //这里本来服务器地址是写全名的，但是为了解决跨域问题，用了代理服务器，主机、域名、端口号就不用写了(去除了http://47.103.203.152)
                /* axios.post('/api/login',{ username, password })
                    .then(response=>{
                        //登录请求成功时，获取了一个对象，有status属性，0代表成功，1代表失败(账户名或者密码错误导致)
                        if(response.data.status === 0){
                            console.log(response);
                            //登录成功后，返回一个新页面
                            //这里不能使用Redirect,因为不在render中，需要使用路由组件的三大属性解决这一问题
                                //需要回去用push，不需要回退用replace
                            this.props.history.replace('/'); 
                        }else{
                            //登录失败，提示错误
                            message.error(response.data.msg);
                            //清空错误的密码
                            this.props.form.resetFields(['password'])

                        }
                        
                    })
                    .catch(err=>{
                        console.log(err);
                        //请求失败(网络出现故障等原因)
                        message.error('网络出现故障！')

                    }) */
                    /* ★封装了函数之后就注释上面的axios★ */
                    this.props.saveUserAsync(username, password)
                        .then(()=>{
                            this.props.history.replace('/');
                        })
                        .catch(msg=>{
                            message.error(msg);
                            this.props.form.resetFields(['password']);
                        })
                    
                    
            }
            
        })
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
                    <Form className="login-form" onSubmit={this.sub}>
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