import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
@Form.create()
class AddCategoryForm extends Component {
    static propTypes = {
        data: PropTypes.object
    }
    render() {
        const { form: {getFieldDecorator}, data:{name} } = this.props;
        
        return (
            <Form>
                <Form.Item label="品类名称">
                    {
                        getFieldDecorator('categoryName',
                            {
                                rules: [
                                    {required: true, message: '请输入分类名称'}
                                ],
                                initialValue: name
                            }
                        )(
                            <Input placeholder="请输入分类名称"/>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}
export default AddCategoryForm;