import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
  const [isRegister, setRegister] = useState(false);

  return <>
		{isRegister ? <RegisterScreen /> : <LoginScreen />}
		<button onClick={()=> setRegister(!isRegister)}>切换到{isRegister ? "登录" : "注册"}</button>
	</>;
};
