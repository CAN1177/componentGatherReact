import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd"
import { LongButton } from "unauthenticated-app";

export const RegisterScreen = () => {
  const { register, user } = useAuth();
  const handleSubmit = (values: {username: string, password:string}) => {
    register(values);
  };

  return (
    <Form onFinish={handleSubmit} >
      <Form.Item name={'username'} rules={[{required: true, message: 'Please enter a username'}]}>
        <Input placeholder="username" type="text" id={"username"} />
      </Form.Item>
      <Form.Item name={'password'} rules={[{required: true, message: 'Please enter a password'}]}>
        <Input placeholder="password" type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>注册</LongButton>
      </Form.Item>
      
    </Form>
  );
};
