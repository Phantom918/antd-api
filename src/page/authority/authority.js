import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { Row, Col, Input, Button, Select, Table, Divider, Form, Space } from 'antd';
import axios from "axios";

const { Option } = Select;

const authorityDataSelector = createSelector(
	state => state.authorityData,
	authorityData => authorityData
)

/**
 * 权限管理组件
 */
const Authority = (props) => {
	const [form] = Form.useForm();
	const [selectionType] = useState('checkbox');
	const { formData } = useSelector(authorityDataSelector);
	console.log("formData=%o", formData);
	const dispatch = useDispatch();


	const columns = [
		{
			align: 'center',
			title: '姓名',
			dataIndex: 'name',
			render: text => <a>{text}</a>,
		},
		{
			align: 'center',
			title: '年龄',
			dataIndex: 'age',
		},
		{
			align: 'center',
			title: '地址',
			dataIndex: 'address',
		},
	];
	const data = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
		},
		{
			key: '4',
			name: 'Disabled User',
			age: 99,
			address: 'Sidney No. 1 Lake Park',
		},
	];

	// 选中记录
	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		},
		getCheckboxProps: record => ({
			disabled: record.name === 'Disabled User', // Column configuration not to be checked
			name: record.name,
		}),
	};

	// 提交表单
	const onFinish = values => {
		values.pageNum = 1;
		values.pageSize = 10;
		console.log('values111: %o', values);
		// 请求后台登录接口
		axios.get("/server/auth/getUsersInfo", {
			headers: { 'Authorization': sessionStorage.token },
			params: values
		}).then(response => {
			// response  包含 data、status、statusText、headers、config
			console.info("服务器返回: %o", response);
			if (response.status === 200) {
				dispatch({
					// 实际项目中最好将所有的 type 集中管理，可以避免重名等问题;
					type: "AUTHORITY_DATA_SUCCESS",
					data: response.data,
				});
			} else {
				console.log(response.data.message);
			}
		}).catch(error => {
			if (error.response) {
				// 请求已发出，但服务器响应的状态码不在 2xx 范围内
				console.log(error.response.status);// 403
				console.log(error.response.data);// {message: "无效Token, 请认证后操作 !", status: 403}
			} else {
				console.log('Error', error.message);
			}
		});
	};

	// 重置表单
	const onReset = () => {
		form.resetFields();
	};

	return (<div>
		<Form form={form} name="advanced_search" className="ant-advanced-search-form" onFinish={onFinish}>
			<Row gutter={24} justify="space-between">
				<Col span={6}>
					<Form.Item name="username">
						<Input placeholder="账号或姓名" />
					</Form.Item>
				</Col>
				<Col span={6} align="left">
					<Form.Item name="enable">
						<Select size="default" defaultValue="">
							<Option value="">是否有效</Option>
							<Option value={true}>是</Option>
							<Option value={false}>否</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={6}>
					<Space size={24}>
						<Button type="primary" htmlType="submit">查 询</Button>
						<Button htmlType="button" onClick={onReset}>重 置</Button>
					</Space>
				</Col>
				<Divider dashed />
				<Col span={24}>
					<Table size='middle' rowSelection={{ type: selectionType, ...rowSelection, }} columns={columns} dataSource={data} />
				</Col>
			</Row>
		</Form>
	</div>);

}

export default Authority;
