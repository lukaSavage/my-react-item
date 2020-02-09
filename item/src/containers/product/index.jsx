/**
 * 该页面将会用后台分页做(只获取当前页面的数据，其他数据点击的时候再获取)
 */
import React, { Component } from 'react'
import { Card, Select, Input, Button, Icon, Table, message } from 'antd'
import { reqGetProductList, reqSearchProduct, reqUpdateProductStatus } from '../../api'

export default class Product extends Component {
    state = {
        productList: [],
        total: 0,
        isLoading: false,
        //收集select的数据
        searchType: 'productName',
        searchValue: ''
    }
    columns = [
        {
            title: '商品名称',
            dataIndex: 'name'
        },
        {
            title: '商品描述',
            dataIndex: 'desc'
        },
        {
            title: '价格',
            dataIndex: 'price',
            //如果要显示除数据本身之外还有一些其他的东西，使用render方法
            render(price) {
                return `￥ ${price}`
            }
        },
        {
            title: '状态',
            //不写dataIndex得到全部的数据
            // dataIndex: 'status',
            render: ({_id, status}) => {
                /* 
                根据status的值判断是否上下架
                1:已下架
                2：已上架
                */
                if (status === 1) {
                    return (
                        <div>
                            <Button type="primary" onClick={this.click(_id, status)}>上架</Button>
                            <span>下架</span>

                        </div>
                    )
                } else {
                    return (
                        <div>
                            <Button type="primary" onClick={this.click(_id, status)}>下架</Button>
                            <span>上架</span>

                        </div>
                    )
                }
            }
        },
        {
            title: '操作',
            // dataIndex: 'operation',
            render: (product) => {
                return (
                    <div>
                        <Button type="link">详情</Button>
                        <Button type="link" onClick={this.modified(product)}>修改</Button>

                    </div>
                )
            }
        },
    ]
    //修改商品的点击事件
    modified = (data) => {
        return () => {
            const { _id } = data;
            //三大属性的push方法第二个参数是数据，可以向productManage传递data,productManage组件就能通过location.state属性得到传递的值
            this.props.history.push(`/product/update/${_id}`, data)

        }
    }
    //上下架点击事件
    click = (_id,status)=>{
        return ()=>{
            reqUpdateProductStatus(_id, status)
                .then((response)=>{
                    this.setState({
                        productList: this.state.productList.map((item,index)=>{
                            if(item._id ===_id){
                                //展开item,覆盖掉原来的status
                                return {...item,status: 3-status}
                            }
                            return item;
                        })
                    })
                    
                    message.success('更新成功');
                })
                .catch(err=>{
                    message.error(err);
                })
        }
    }
    getProductListFunc = (pageNum, pageSize) => {
        //发请求之前为false
        //请求中为true
        //请求后为false
        this.setState({
            isLoading: true
        })
        reqGetProductList(pageNum, pageSize)
            .then(response => {
                this.setState({
                    productList: response.list,
                    total: response.total,
                    isLoading: false
                });
                message.success('获取成功')
            })
            .catch(err => {
                message.error(err);
                this.setState({
                    isLoading: false
                })
            })
    }
    //添加商品的点击事件
    addProduct = () => {
        this.props.history.push('/product/add');
    }

    //获取select中的数据----
    change1 = (value) => {
        //正常的受控组件需要通过e.target.value获取值，但select组件绑定的change，他的参数是value
        //console.log(value); 
        this.setState({
            searchType: value
        })
    }
    change2 = (e) => {
        this.setState({
            searchValue: e.target.value
        })

    }
    //-----------------------
    /* 搜索按钮的点击事件 */
    search = () => {
        const { searchType, searchValue, } = this.state;
        console.log(searchType, searchValue);

        reqSearchProduct({ searchType, searchValue, pageSize: 3, pageNum: 1 })
            .then((response) => {
                this.setState({
                    productList: response.list,
                    total: response.total,
                    isLoading: false
                });
                message.success('获取成功')
            })
            .catch((err) => {
                message.error(err);
                this.setState({
                    isLoading: false
                })
            })
    }

    componentDidMount() {
        this.getProductListFunc(1, 3);
    }
    render() {
        const { productList, total, searchType, searchValue } = this.state;
        return (
            <Card title={
                <div>
                    <Select defaultValue={searchType} onChange={this.change1}>
                        <Select.Option value="productName">根据商品名称</Select.Option>
                        <Select.Option value="productDesc">根据商品描述</Select.Option>
                    </Select>
                    <Input placeholder="关键字" style={{ width: 200, margin: '0 10px' }} onChange={this.change2} />
                    <Button type='primary' onClick={this.search}>搜索</Button>
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
                        onChange: (pageNum, pageSize) => {
                            this.getProductListFunc(pageNum, pageSize);

                        },
                        onShowSizeChange: this.getProductListFunc,

                    }}
                    rowKey='_id'
                    loading={this.state.isLoading}

                />
            </Card>

        )
    }
}
