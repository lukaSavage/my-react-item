/**
 * 该页面将会用后台分页做(只获取当前页面的数据，其他数据点击的时候再获取)
 */
import React, { Component } from 'react'
import { Card, Select, Input, Button, Icon, Table, message } from 'antd'
import { reqGetProductList } from '../../api'

export default class Product extends Component {
    state = {
        productList: [],
        total: 0
    }
    columns = [
        {
            title: '商品名称',
            dataIndex: 'name'
        },
        {
            title: '商品描述',
            dataIndex: 'describe'
        },
        {
            title: '价格',
            dataIndex: 'price'
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: () => {
                return (
                    <div>
                        <Button type="primary">上架</Button>
                        <span>下架</span>

                    </div>
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: () => {
                return (
                    <div>
                        <Button type="link">详情</Button>
                        <Button type="link">修改</Button>

                    </div>
                )
            }
        },
    ]
    getProductListFunc = (pageNum,pageSize)=>{
        reqGetProductList(pageNum,pageSize)
            .then(response=>{        
                this.setState({
                    productList: response.list,
                    total: response.total
                });
                message.success('获取成功')
            })
            .catch(err=>{
                message.error(err)
            })
    }
    //添加商品的点击事件
    addProduct = ()=>{
        this.props.history.push('/product/add');
    }
    componentDidMount(){
        this.getProductListFunc(1,3);
    }
    render() {
        const { productList, total } = this.state;
        console.log(productList);
        
        return (
            <Card title={
                <div>
                    <Select defaultValue="1">
                        <Select.Option value="1">根据商品名称</Select.Option>
                        <Select.Option value="2">根据商品描述</Select.Option>
                    </Select>
                    <Input placeholder="关键字" style={{ width: 200, margin: '0 10px' }} />
                    <Button type='primary'>搜索</Button>
                </div>

            } extra={<Button type='primary' onClick={this.addProduct}><Icon type="plus" />添加商品</Button>}>
                <Table
                    columns={this.columns}
                    dataSource={productList}
                    bordered
                    pagination={{
                        pageSizeOptions: ['3', '6', '9'],
                        defaultPageSize: 3,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        total,
                        //页码发生改变触发的回调函数
                        onChange: (pageNum,pageSize)=>{
                            this.getProductListFunc(pageNum,pageSize)
                        },
                        onShowSizeChange: this.getProductListFunc
                    }}
                    rowKey='_id'
                />
            </Card>

        )
    }
}
