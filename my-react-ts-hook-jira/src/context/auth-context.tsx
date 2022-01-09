import React, {ReactNode } from "react";
import * as auth from "auth-provider";

import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async() =>{
  let user  = null;
  const token = auth.getToken()
  if (token) {
    const data = await http('me', {token})
    user = data.user;
  }
  return  user
}


const AuthContext = React.createContext<{
  user: User | null,
  register: (form: AuthForm) =>Promise<void>,
  login: (form: AuthForm) =>Promise<void>,
  logout: () => Promise<void>,
}|undefined>(undefined);

AuthContext.displayName = "AuthContext";
 
export const AuthProvider = ({children}:{children:ReactNode}) => {
  // const [user, setUser] = useState<User | null>(null);
  
  const { data: user, error, isLoading, isIdle, isError, run, setData:setUser } = useAsync<User | null>()
  const login = (form: AuthForm) =>
    // auth.login(form).then((user) => setUser(user));  这就叫做 point free
    auth.login(form).then(setUser); 
 
  const register = (form: AuthForm) =>
    auth.register(form).then(setUser); 
 
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(()=>{
    run( bootstrapUser())
  //  .then(setUser)
  })
  if (isIdle || isLoading) {
    return <FullPageLoading/>
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

	return <AuthContext.Provider children={children} value={{user, login, logout, register}}/>  
};


export const useAuth =() =>{
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth 必须在AuthProvider中使用");
  }
  return context;
}