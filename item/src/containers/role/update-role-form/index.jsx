import React, { Component } from 'react'
import { Input, Form, Tree } from 'antd'
import menus from '../../../config/menus'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Role from '..'

const { TreeNode } = Tree;


@Form.create()
class UpdateRoleForm extends Component {
    static propTypes = {
        people: PropTypes.object.isRequired
    }
    renderTreeNodes = data => {
        return data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={<FormattedMessage id={item.title}/>} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={<FormattedMessage id={item.title}/>} key={item.path} />;
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { people } = this.props;

        return (
            <div>
                <Form.Item label="角色名称">
                    {
                        getFieldDecorator(
                            'name',
                            {
                                initialValue: people.name
                            }
                        )(<Input disabled />)
                    }

                </Form.Item>
                <Form.Item label="角色名称">
                    {
                        getFieldDecorator(
                            'menus',
                            {
                                trigger: 'onCheck',
                                valuePropName: 'checkedKeys',
                                initialValue: people.menus
                            }
                        )(
                            <Tree
                                checkable
                                defaultExpandAll={true}
                            // onExpand={this.onExpand}
                            // expandedKeys={this.state.expandedKeys}
                            // autoExpandParent={this.state.autoExpandParent}
                            // onCheck={this.onCheck}
                            // checkedKeys={this.state.checkedKeys}
                            // onSelect={this.onSelect}
                            // selectedKeys={this.state.selectedKeys}
                            >
                                <TreeNode title="平台权限" key="0">
                                    {this.renderTreeNodes(menus)}
                                </TreeNode>

                            </Tree>
                        )
                    }
                </Form.Item>
            </div>
        )
    }
}

export default UpdateRoleForm;