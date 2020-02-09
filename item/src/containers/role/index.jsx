import React, { Component } from 'react'
import { Card, Button, Table, Radio, message, Modal } from 'antd'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { getRoleListAsync, addRoleAsync, updateRoleAsync } from '../../redux/actions'
import AddRoleForm from './add-role-form'
import UpdateRoleForm from './update-role-form'

@connect(state => ({ role: state.role, authName: state.user.user.username }),
    {
        getRoleListAsync,
        addRoleAsync,
        updateRoleAsync
    }
)
class Role extends Component {
    state = {
        isLoading: false,
        visible: false,
        people: {},    //代表我们选中的people数据,初始值给个{}(便于后面的disabled的判断)
        visible2: false,
    }
    columns = [
        {
            dataIndex: '_id',
            //第一列没有数据但要渲染单选框
            render: (id) => {
                return (
                    <div>
                        <Radio key={id} value={id} />
                        {/* <Radio.Group onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>A</Radio>
                        <Radio value={2}>B</Radio>
                        <Radio value={3}>C</Radio>
                        <Radio value={4}>D</Radio>
                    </Radio.Group> */}
                    </div>
                )
            }

        },
        {
            title: '角色名称',
            dataIndex: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render(time) {
                return dayjs(time).format('YYYY/MM/DD HH:mm:ss')
            }
        },
        {
            title: '授权时间',
            dataIndex: 'authTime',
            render(time) {
                //如果没有授权，time应该为undefined,不会返回时间
                /* 
                    与运算规则：
                        如果第一个有值，反悔第二个；
                        如果第一个没值，反悔第一个；
                */
                return time && dayjs(time).format('YYYY/MM/DD HH:mm:ss')
            }
        },
        {
            title: '授权人',
            dataIndex: 'authName',
        },
    ];
    data = [
        {
            _id: '1',
            name: '老夫',
            createTime: 1567389999801,
            authTime: 1567389999801,
            authName: "admin"
        },
        {
            _id: '2',
            name: '老夫',
            createTime: 1567389999801,
            authTime: 1567389999801,
            authName: "admin"
        },
    ];
    //创建角色按钮
    showModal = () => {

        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        // console.log(this.data);
        const { resetFields, validateFields } = this.data.props.form;
        validateFields((err, values) => {
            if (!err) {
                const { name } = values;
                //console.log(name);  //得到的是用户输入的值
                //发送请求，创建角色
                this.props.addRoleAsync(name)
                    .then(response => {
                        message.success('添加成功');
                        //清空表单数据
                        resetFields();
                        this.setState({
                            visible: false,
                        });
                    })
                    .catch(err => {
                        message.error(err);
                        // this.setState({
                        //     visible: true,
                        // });
                    })

            }
        })
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    /* 单选框的onChange事件 */
    change = (e) => {
        // console.log(e.target.value);
        const id = e.target.value;
        //这里只能得到id值，但我们想要全部的role的值，而dataIndex又不能删，所以需要我们去connect的state的role中把那个数据查出来
        // console.log(this.props.role);
        const res = this.props.role.find((item, index) => {
            return item._id === id;
        })
        //更新状态
        this.setState({
            people: res
        })


    }
    /* 设置权限的按钮事件 */
    setAuth = () => {
        // console.log(2222);

        this.setState({
            visible2: true,
        });
    }
    handleOk2 = () => {
        //获取表单的实例对象
        const { validateFields, resetFields } = this.UpdateRoleForm.props.form;
        validateFields((err, values) => {
            if (!err) {
                console.log(values);
                // console.log(this.state);
                //权限列表
                const { menus } = values;
                //角色ID
                const roleId = this.state.people._id;
                //授权人名称
                const authName = this.props.authName;
                console.log(authName);

                this.props.updateRoleAsync({ menus: JSON.stringify(menus), roleId, authName })
                    .then(response => {
                        message.success('更新成功')

                        this.setState({
                            visible2: false,
                            //更新Role组件自己的状态
                            people: response
                        });

                        //清空表单数据
                        resetFields();

                    })
                    .catch(err => {
                        message.error(err);
                    })

            }
        })

    };

    handleCancel2 = () => {
        this.setState({
            visible2: false,
        });
    };

    //---------------------------------
    //发送请求，获取角色数据
    componentDidMount() {
        this.setState({
            isLoading: true,
        })
        this.props.getRoleListAsync()
            .then(response => {
                message.success('请求成功');

            })
            .catch(err => {
                message.error(err);
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }
    render() {
        const { isLoading, people } = this.state;
        const { role } = this.props;

        return (
            <Card title={
                <div>
                    <Button type="primary" onClick={this.showModal}>创建角色</Button>&nbsp;&nbsp;
                <Button type="primary" disabled={Object.keys(people).length === 0 ? true : false} onClick={this.setAuth}> 设置角色权限</Button>
                </div>
            }>
                <Radio.Group style={{ width: '100%' }} onChange={this.change}>
                    <Table
                        columns={this.columns}
                        dataSource={role}
                        bordered
                        rowKey='_id'
                        isLoading={isLoading}
                    />
                </Radio.Group>
                <Modal
                    title="创建角色"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <AddRoleForm wrappedComponentRef={(form) => this.data = form} />
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={this.state.visible2}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                >
                    <UpdateRoleForm people={people} wrappedComponentRef={(form) => this.UpdateRoleForm = form} />
                </Modal>
            </Card>
        )
    }
}
export default Role;