import { useAuth } from "context/auth-context";
import { Form, Input } from "antd"
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

export const RegisterScreen = ({onError}: {onError:(error:Error)=>void}) => {
  const { register} = useAuth();
  const { run , isLoading} = useAsync(undefined, {
    throwOnError: true} );
  const handleSubmit = async({cpassword, ...values}: {username: string, password:string, cpassword: string}) => {
    if(cpassword !== values.password) {
      onError(new Error("Please confirm that the password is the same twice"))
      return;
    }
    try { 
      await run(register(values));
    }catch (error) {
      onError(error); 
    }
  };

  return (
    <Form onFinish={handleSubmit} >
      <Form.Item name={'username'} rules={[{required: true, message: 'Please enter a username'}]}>
        <Input placeholder="username" type="text" id={"username"} />
      </Form.Item>
      <Form.Item name={'password'} rules={[{required: true, message: 'Please enter a password'}]}>
        <Input placeholder="password" type="password" id={"password"} />
      </Form.Item>
      <Form.Item name={'cpassword'} rules={[{required: true, message: 'Please again enter  password'}]}>
        <Input placeholder="cpassword" type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>注册</LongButton>
      </Form.Item>
      
    </Form>
  );
};
