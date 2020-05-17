import React from "react";
import { Modal, Radio, Input, message, Tooltip, Form} from 'antd';
import { QuestionCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';

const AddUser = (props) => {
	const [form] = Form.useForm();
	console.log("visible => %o", props)
	console.log("AddUser => render .......")

	/**
	 * 添加用户
	 */
	const validateForm = () => { form.submit() };

	/**
	 * 用户名唯一性校验
	 */
	const checkUsername = async (rule, value) => {
		if (value) {
			try {
				const res = await axios.post("/server/auth/queryUser", { 'username': value },
					{ headers: { 'Authorization': sessionStorage.token } });
				console.info("服务器返回: %o", res);
				if (res.data.result === false) {
					return Promise.resolve();
				}
				return Promise.reject('此用户名已注册！');
			} catch (error) {
				console.log('Error====>', error.message);
			};
		} else {
			return Promise.resolve();
		}
	};

	/**
	 * 邮箱唯一性校验
	 */
	const checkEmail = async (rule, value) => {
		if (value) {
			try {
				const res = await axios.post("/server/auth/queryUser", { 'email': value },
					{ headers: { 'Authorization': sessionStorage.token } });
				console.info("服务器返回: %o", res);
				if (res.data.result === false) {
					return Promise.resolve();
				}
				return Promise.reject('此邮箱已注册！');
			} catch (error) {
				console.log('Error====>', error.message);
			};
		} else {
			return Promise.resolve();
		}
	};

	/**
	 * 添加用户
	 * @param {Object} values 
	 */
	const addUser = values => {
		axios.post("/server/auth/addUser", form.getFieldsValue(), { headers: { 'Authorization': sessionStorage.token } }).then(response => {
			// response  包含 data、status、statusText、headers、config
			console.info("服务器返回: %o", response);
			if (response.status === 200) {
				message.success("添加成功！");
			} else {
				message.warning(response.data.message);
			}
			props.setVisible(false)
		}).catch(error => {
			props.setVisible(false)
			if (error.response) {
				message.error(error.response.message);// {message: "无效Token, 请认证后操作 !", status: 403}
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


	return (
		<div>
			<Modal title={<span><UserAddOutlined /> 添加用户</span>} visible={props.visible} onOk={validateForm} onCancel={() => props.setVisible(false)}>
				<Form layout="horizontal" form={form} initialValues={{ sex: 'W' }} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={addUser}>
					<Form.Item name="email" label="E-mail" hasFeedback rules={[
						{ type: 'email', message: 'The input is not valid E-mail!' },
						{ required: true, message: 'Please input your E-mail!' },
						{ validator: checkEmail }
					]}>
						<Input placeholder="input E-mail" />
					</Form.Item>
					<Form.Item name="username" label="账号" hasFeedback rules={[
						{ required: true, message: 'Please input your count!' },
						{ min: 4, message: '最少4个字符!' },
						{ max: 32, message: '最多32个字符!' },
						{ validator: checkUsername }
					]}>
						<Input placeholder="input count" />
					</Form.Item>
					<Form.Item name="password" label="密码" hasFeedback rules={[
						{ required: true, message: 'Please input your password!' },
						{ min: 8, message: '最少8个字符!' },
						{ max: 32, message: '最多32个字符!' }
					]}>
						<Input.Password placeholder="input password" />
					</Form.Item>
					<Form.Item name="confirm" label="确认密码" hasFeedback dependencies={['password']}
						rules={[{
							required: true,
							message: 'Please confirm your password!',
						},
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject('The two passwords that you entered do not match!');
							},
						})]}>
						<Input.Password placeholder="input password again" />
					</Form.Item>
					<Form.Item name="nickname" hasFeedback label={<span>昵称&nbsp;<Tooltip title="方便称呼你"><QuestionCircleOutlined /></Tooltip></span>} rules={[
						{ required: true, message: 'Please input your nickname!' },
						{ min: 2, message: '最少2个字符!' },
						{ max: 12, message: '最多12个字符!' }
					]}>
						<Input placeholder="input nickname" />
					</Form.Item>
					<Form.Item name="sex" label="性别" hasFeedback rules={[{ required: true, message: 'Please choice your sex!' }]}>
						<Radio.Group>
							<Radio value="M">男</Radio>
							<Radio value="W">女</Radio>
						</Radio.Group>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);

}

export default React.memo((props) => AddUser(props));