import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { Row, Col, Input, Button, Select, Table, Divider, Form, Space, Spin } from 'antd';
import axios from "axios";
import { SEX, IS_VALID } from '@/utils/utils';

const { Option } = Select;

// 获取 state
const authorityDataSelector = createSelector(
	state => state.authorityData,
	authorityData => authorityData
)


/**
 * 权限管理组件
 * useContext  全局上下文，子组件都可以使用
 * useState 需要依次往下传递才能获取到
 */
const Authority = (props) => {

	const [form] = Form.useForm();
	const [selectionType] = useState('checkbox');
	// 获取查询结果
	const { formData, pagination } = useSelector(authorityDataSelector);
	console.log("formData=%o", formData);
	const dispatch = useDispatch();
	// 是否正在请求后台查询 
	const [queryFlag, setQueryFlag] = useState(false);

	// 表格数据列定义
	const columns = [
		{
			align: 'center',
			title: '账号ID',
			dataIndex: 'username',
			render: text => <a>{text}</a>,
		},
		{
			align: 'center',
			title: '昵称',
			dataIndex: 'nickname',
		},
		{
			align: 'center',
			title: '性别',
			dataIndex: 'sex',
			render: sex => SEX[sex] || '',
		},
		{
			align: 'center',
			title: '头像',
			dataIndex: 'image',
		},
		{
			align: 'center',
			title: '状态',
			dataIndex: 'enable',
			render: enable => IS_VALID[enable] || '',
		},
	];

	// 选中记录
	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		},
		getCheckboxProps: record => ({
			disabled: record.username === 'user', // Column configuration not to be checked
			name: record.username,
		}),
	};

	const onFinish = values => {
		queryUserMessage({...pagination, ...values});
	}

	// 查询用户
	const queryUserMessage = params => {
		console.log('开始查询: %o', params);
		setQueryFlag(true);
		axios.get("/server/auth/getUsersInfo", {
			headers: { 'Authorization': sessionStorage.token },
			params: params
		}).then(response => {
			// response  包含 data、status、statusText、headers、config
			console.info("服务器返回: %o", response);
			if (response.status === 200) {
				console.info("准备渲染1");
				dispatch({
					// 实际项目中最好将所有的 type 集中管理，可以避免重名等问题;
					type: "AUTHORITY_DATA_SUCCESS",
					data: response.data,
				});
				console.info("准备渲染1。。。。end");
			} else {
				console.log(response.data.message);
			}
			setQueryFlag(false);
		}).catch(error => {
			// setQueryFlag(false);
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

	const handleTableChange = (pagination, filters, sorter) => {
		console.info("分页变动");
		console.info(pagination);
		queryUserMessage({...pagination, ...form.getFieldsValue()});
	};


	return (<div>
		<Spin spinning={queryFlag}>
			<Form form={form} name="advanced_search" className="ant-advanced-search-form" onFinish={onFinish} initialValues={{ "enable": "" }}>
				<Row gutter={24} justify="space-between">
					<Col span={6}>
						<Form.Item name="username" label="账号">
							<Input placeholder="账号或昵称" />
						</Form.Item>
					</Col>
					<Col span={6} align="left">
						<Form.Item name="enable" label="状态">
							<Select size="default">
								<Option value="">是否有效</Option>
								<Option value={true}>是</Option>
								<Option value={false}>否</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Space size={24}>
							<Button type="primary" htmlType="submit" loading={queryFlag}>查 询</Button>
							<Button htmlType="button" onClick={onReset}>重 置</Button>
						</Space>
					</Col>
					<Divider dashed />
					<Col span={24}>
						<Table size='middle'
							columns={columns}
							dataSource={formData}
							pagination={pagination}
							rowKey={record => record.id}
							onChange={handleTableChange}
							rowSelection={{ type: selectionType, ...rowSelection, }}
						/>
					</Col>
				</Row>
			</Form>
		</Spin>
	</div>);

}

export default Authority;
