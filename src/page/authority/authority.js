import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { Row, Col, Input, Button, Select, Table, Divider, Form, Space, Spin, Pagination, message, Popconfirm } from 'antd';
import { PlusCircleFilled, CloseCircleFilled, EditFilled } from '@ant-design/icons';
import axios from "axios";
import { SEX, IS_VALID } from '@/utils/utils';
import AddUser from './addUser';

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

	console.log("Authority props=%o", props);

	const [form] = Form.useForm();
	// 获取查询结果
	const { formData, pagination } = useSelector(authorityDataSelector);
	const dispatch = useDispatch();
	// 是否正在请求后台查询 
	const [queryFlag, setQueryFlag] = useState(false);
	// 添加用户的模态窗是否可见
	const [visible, setVisible] = useState(false);
	// 当前选中的记录
	const [selectedData, setSelectedData] = useState({ selectedRowKeys: [], selectedRows: [] });
	// 编辑和删除按钮的控制
	const [btnOperFlag, setBtnOperFlag] = useState({ editBtnFlag: true, delBtnFlag: true });

	useEffect(() => {
		console.log("这里是useEffect.............");
	});

	// 表格数据列定义
	const columns = [
		{
			align: 'center',
			title: '序号',
			render: (text, record, index) => index + 1,
			responsive: ['md'],
		},
		{
			align: 'center',
			title: '账号ID',
			dataIndex: 'username',
			render: text => <a>{text}</a>,
			responsive: ['md'],
		},
		{
			align: 'center',
			title: '昵称',
			dataIndex: 'nickname',
			responsive: ['md'],
		},
		{
			align: 'center',
			title: '性别',
			dataIndex: 'sex',
			render: sex => SEX[sex] || '',
			responsive: ['md'],
		},
		{
			align: 'center',
			title: '头像',
			dataIndex: 'image',
			responsive: ['md'],
		},
		{
			align: 'center',
			title: '状态',
			dataIndex: 'enable',
			render: enable => IS_VALID[enable] || '',
			responsive: ['md'],
		},
	];

	// 选中记录
	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(selectedRowKeys);
			console.log(selectedRows);
			setSelectedData({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows });
			setBtnOperFlag({ editBtnFlag: selectedRowKeys.length !== 1, delBtnFlag: selectedRowKeys.length === 0 })
		},
		getCheckboxProps: record => ({
			disabled: record.username === 'user', // Column configuration not to be checked
			name: record.username,
		}),
	};

	const onFinish = values => {
		queryUserMessage({ ...pagination, ...values });
	}

	// 查询用户
	const queryUserMessage = useCallback(params => {
		setSelectedData({ selectedRowKeys: [], selectedRows: [] });
		setQueryFlag(true);
		axios.get("/server/auth/getUsersInfo", {
			headers: { 'Authorization': sessionStorage.token },
			params: params
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
			setQueryFlag(false);
		}).catch(error => {
			setQueryFlag(false);
			if (error.response) {
				console.log(error.response.data);// {message: "无效Token, 请认证后操作 !", status: 403}
				// 请求已发出，但服务器响应的状态码不在 2xx 范围内
				if (error.response.data && error.response.data.status === 403) {
					sessionStorage.removeItem("token");
					console.error(error.response.data.message);
					props.history.replace("/login")
				}
			} else {
				console.log('Error', error.message);
			}
		});
	}, []);

	// 重置表单
	const onReset = () => {
		form.resetFields();
	};

	/* 自带分页组件查询 */
	const handleTableChange = (pagination, filters, sorter) => {
		console.info("分页变动");
		console.info(pagination);
		queryUserMessage({ ...pagination, ...form.getFieldsValue() });
	};

	/**
	 * 单独分页组件变动查询
	 * @param {number} current 当前第几页
	 * @param {number} pageSzie 每页多少条
	 */
	const paginationChange = (current, pageSzie) => {
		queryUserMessage({ current: current, pageSize: pageSzie, ...form.getFieldsValue() });
	}


	// 删除用户
	const deleteUsers = () => {
		// 注意： 这里如果用 callback包裹且不加条件就获取不到动态数据 => selectedData.selectedRowKeys
		console.info("选择了1=====%o", selectedData.selectedRowKeys);
		setQueryFlag(true);
		axios.post("/server/auth/delUser", selectedData.selectedRowKeys, { headers: { 'Authorization': sessionStorage.token, "Content-Type": "application/json" } })
			.then(response => {
				// response  包含 data、status、statusText、headers、config
				console.info("服务器返回: %o", response);
				if (response.status === 200) {
					message.success("操作成功！");
				} else {
					message.warning("操作失败!");
					console.log(response.data.message);
				}
				setQueryFlag(false);
			}).catch(error => {
				setQueryFlag(false);
				if (error.response) {
					message.warning(error.response.data);
					console.log(error.response.data);// {message: "无效Token, 请认证后操作 !", status: 403}
					// 请求已发出，但服务器响应的状态码不在 2xx 范围内
					if (error.response.data && error.response.data.status === 403) {
						sessionStorage.removeItem("token");
						console.error(error.response.data.message);
						props.history.replace("/login")
					}
				} else {
					console.log('Error', error.message);
				}
			});
	};

	return (<div>
		<Spin spinning={queryFlag}>
			<Form form={form} name="advanced_search" className="ant-advanced-search-form" onFinish={onFinish} initialValues={{ "enable": "" }}>
				<Row gutter={[24, 2]} justify="space-between">
					<Col span={6}>
						<Form.Item name="username" label="账号" style={{ marginBottom: 0 }}>
							<Input placeholder="账号或昵称" />
						</Form.Item>
					</Col>
					<Col span={6} align="left">
						<Form.Item name="enable" label="状态" style={{ marginBottom: 0 }}>
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
					<Col span={24} align="right" style={{ paddingBottom: "2vh" }}>
						<Space align="end" size="small">
							<Button type="primary" icon={<PlusCircleFilled />} size='middle' onClick={() => setVisible(true)}>新增</Button>
							<Button type="primary" icon={<EditFilled />} size='middle' disabled={btnOperFlag.editBtnFlag} onClick={() => setVisible(true)}>编辑</Button>
							<Popconfirm title="确认删除?" onConfirm={deleteUsers} okText="删除" cancelText="取消" >
								<Button type="primary" icon={<CloseCircleFilled />} size='middle' disabled={btnOperFlag.delBtnFlag}>删除</Button>
							</Popconfirm>
						</Space>
					</Col>
					<Col span={24}>
						<Table size='middle' tableLayout="fixed" columns={columns} dataSource={formData}
							// pagination={pagination}
							pagination={false} rowKey={record => record.id}
							// onChange={handleTableChange}
							rowSelection={{ type: 'checkbox', selectedRowKeys: selectedData.selectedRowKeys, selectedRows: selectedData.selectedRows, ...rowSelection, }}
						/>
						<Col align="right" span={24} style={{ marginTop: "2vh" }}>
							<Pagination align="right" pageSize={pagination.pageSize} onChange={paginationChange} total={pagination.total} showSizeChanger showQuickJumper showTotal={total => `共 ${total} 条`} />
						</Col>
					</Col>
				</Row>
			</Form>
		</Spin>
		<AddUser visible={visible} setVisible={setVisible} userInfo={selectedData.selectedRows} />
	</div>);

}

export default React.memo((props) => Authority(props));
