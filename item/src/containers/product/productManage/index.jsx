import React, { Component } from 'react'
import { Card, Icon, Form, Input, Button, Select, InputNumber, message } from 'antd'
import BraftEditor from 'braft-editor'
import { connect } from 'react-redux'

import './index.less'
import 'braft-editor/dist/index.css'
import { getCategoryListAsync } from '../../../redux/actions'
import { reqAddProduct, reqUpdateProduct } from '../../../api'

@connect(state => ({ categories: state.categories }), { getCategoryListAsync })
@Form.create()
class ProductManage extends Component {
    sub = (e) => {
        e.preventDefault();
        //校验表单并收集数据
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { name, describe, category, price, detail } = values;
                // console.log(detail.toHTML());
                //发送请求添加数据
                //或者发送请求修改数据
                /* 这里需要作判断 */
                const { state } = this.props.location;
                if (!state) {
                    //添加商品
                    reqAddProduct({ name, desc: describe, categoryId: category, price, detail })
                        .then((response) => {
                            message.success('添加成功');
                            //添加成功后跳转到商品页面
                            this.props.history.push('/product');

                        })
                        .catch((err) => {
                            message.error('添加失败')

                        })
                } else {
                    //修改商品
                    reqUpdateProduct({ name, desc: describe, categoryId: category, price, detail:detail.toHTML(), productId: this.props.match.params.id })
                        .then((response) => {
                            message.success('修改成功');
                            //添加成功后跳转到商品页面
                            this.props.history.push('/product');

                        })
                        .catch((err) => {
                            message.error('修改失败')

                        })
                }




            }
        })
    }
    click = () => {
        this.props.history.push('/product');
    }
    componentDidMount() {
        //this.props.getCategoryListAsync();
        //需要做判断，如果没有数据才发请求，这样解决了点击其他地方也会发请求的bug
        if (!this.props.categories.length) {
            this.props.getCategoryListAsync();
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { categories, location: { state } } = this.props;
        /* 如果有state，说明是修改商品，如果没有state则说明是添加商品 */
        //console.log(state);
        // const { _id, categoryId, name, price, desc, detail } = state;


        const formItemLayout = {
            labelCol: {   //左边文字占的区域大小
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {   //右边文字占的区域大小
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <Card
                title={
                    <div>
                        <Icon type='arrow-left' className="go-back" onClick={this.click} />
                        {state ? '修改商品' : '添加商品'}
                    </div>
                }
            >
                <Form {...formItemLayout} onSubmit={this.sub}>
                    <Form.Item label="商品名称">
                        {
                            getFieldDecorator(
                                'name', {
                                rules: [
                                    {
                                        required: true, message: '商品名称不能为空'
                                    }
                                ],
                                initialValue: state ? state.name : '',
                            }
                            )(<Input placeholder="请输入商品名称" />)
                        }
                    </Form.Item>
                    <Form.Item label="商品描述">
                        {
                            getFieldDecorator(
                                'describe', {
                                rules: [
                                    {
                                        required: true, message: '商品描述不能为空'
                                    }
                                ],
                                initialValue: state ? state.desc : '',
                            }
                            )(<Input placeholder="请输入商品描述" />)
                        }

                    </Form.Item>
                    <Form.Item label="商品分类">
                        {
                            getFieldDecorator(
                                'category', {
                                rules: [
                                    {
                                        required: true, message: '商品分类不能为空'
                                    }
                                ],
                                initialValue: state ? state.categoryId : '',
                            }
                            )(<Select placeholder="请选择商品分类">
                                <Select.Option key='0' value="0">暂无分类</Select.Option>
                                {
                                    categories.map((item, index) => {
                                        return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                                    })

                                }

                            </Select>)
                        }

                    </Form.Item>
                    <Form.Item label="商品价格">
                        {
                            getFieldDecorator(
                                'price', {
                                rules: [
                                    {
                                        required: true, message: '商品价格不能为空'
                                    }
                                ],
                                initialValue: state ? state.price : '',
                            }
                            )(<InputNumber
                                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/￥\s?|(,*)/g, '')}
                                className="product-item"
                            />)
                        }
                    </Form.Item>
                    <Form.Item label="商品详情" wrapperCol={{ span: 22 }}>
                        {
                            getFieldDecorator(
                                'detail', {
                                rules: [
                                    {
                                        required: true, message: '商品详情不能为空'
                                    }
                                ],
                                initialValue: state ? BraftEditor.createEditorState(state.detail) : '',
                            }
                            )(<BraftEditor className="product-detail"></BraftEditor>)
                        }

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType='submit'>提交</Button>
                    </Form.Item>

                </Form>
            </Card>
        )
    }
}
export default ProductManage;
