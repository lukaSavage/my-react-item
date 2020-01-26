import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal, message } from 'antd'
import { connect } from 'react-redux'
import { getCategoryListAsync, addCategoryAsync, modifiedCategoryAsync, delCategoryAsync } from '../../redux/actions'
import AddCategoryForm from './add-category-form'

@connect(state => ({ categories: state.categories }),
    {
        getCategoryListAsync,
        addCategoryAsync,
        modifiedCategoryAsync,
        delCategoryAsync
    }
)
class Category extends Component {
    state = {
        visible: false,
        isModified: false,
        data: ''
    };
    componentDidMount() {
        this.props.getCategoryListAsync();
    }
    showModal = () => {
        this.setState({
            visible: true,
            isModified: false,
            data: {}
        });
    };
    modifiedFunc = (data) => {
        return () => {
            this.setState({
                visible: true,
                isModified: true,
                data
            });
        }
    }
    delFunc = (data)=>{
        return ()=>{
            Modal.confirm({
                title: `您确定要删除 ${data.name} 分类吗？`,
                onOk: ()=>{
                    this.props.delCategoryAsync(data._id)
                        .then(()=>{
                            message.success('删除成功');
                        })
                        .catch((err)=>{
                            message.error('删除失败');
                        })
                }
            })
        }
    }

    handleOk = () => {
        /**
         * 需要在此完成如下功能
         * 1.校验表单
         * 2.收集数据
         * 3.发送请求，更新后端数据
         * 4.请求成功，更新前端数据
         */
        const { validateFields, resetFields } = this.AddCategoryForm.props.form;
        const { data: { name, _id } } = this.state;
        validateFields((err, values) => {
            if (!err) {
                const { categoryName } = values;
                if (name) {
                    //修改
                    this.props.modifiedCategoryAsync(_id, categoryName)
                        .then(() => {
                            //提示添加成功
                            message.success('修改分类成功');
                            //清空表单数据
                            resetFields();
                            //隐藏弹框
                            this.setState({
                                visible: false,
                            });
                        })
                        .catch((err) => {
                            //提示添加失败
                            message.error('添加失败！')
                        })
                } else {
                    //添加
                    /* 3.发送请求 */
                    this.props.addCategoryAsync(categoryName)
                        .then(() => {
                            //提示添加成功
                            message.success('添加分类成功');
                            //清空表单数据
                            resetFields();
                            //隐藏弹框
                            this.setState({
                                visible: false,
                            });
                        })
                        .catch((err) => {
                            //提示添加失败
                            message.error('添加失败！')
                        })
                }

            }
        })




    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        const { visible, isModified, data } = this.state;
        const columns = [
            {
                title: '品类名称',
                dataIndex: 'name'
            },
            {
                title: '操作',
                // dataIndex: 'operation',
                /* 
                    如果不写dataIndex那么下面的data将会得到所有数据，如{name:xxx,id:xxx} 
                    如果写了dataIndex: 'name',那么下面的data将会得到当前数据name的值
                */
                render: (data) => {
                    
                    return (
                        <div>
                            <Button type="link" onClick={this.modifiedFunc(data)}>修改分类</Button>
                            <Button type="link" onClick={this.delFunc(data)}>删除分类</Button>
                        </div>
                    )
                }
            }
        ]
        const { categories } = this.props;

        return (
            <Card title="分类列表" extra={<Button type="primary" onClick={this.showModal}><Icon type="plus" />分类列表</Button>}>
                <Table columns={columns} dataSource={categories} bordered pagination={{ showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ['3', '6', '9'], defaultPageSize: 3 }} rowKey="_id" />
                <Modal
                    title={isModified ? '修改分类' : '添加分类'}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={300}
                >
                    {/* <CategoryForm wrappedComponentRef={(form) => this.handleOk = form} /> */}
                    <AddCategoryForm wrappedComponentRef={(form) => this.AddCategoryForm = form} data={data} ></AddCategoryForm>
                </Modal>
            </Card>
        )
    }
}

export default Category;