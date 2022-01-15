import React, {ReactNode, useCallback } from "react";
import * as auth from "auth-provider";

import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useDispatch, useSelector} from "react-redux"

import * as authStore from "store/auth.slice"
import { bootstrap, selectUser } from "store/auth.slice";

 export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async() =>{
  let user  = null;
  const token = auth.getToken()
  if (token) {
    const data = await http('me', {token})
    user = data.user;
  }
  return  user
}


// const AuthContext = React.createContext<{
//   user: User | null,
//   register: (form: AuthForm) =>Promise<void>,
//   login: (form: AuthForm) =>Promise<void>,
//   logout: () => Promise<void>,
// }|undefined>(undefined);

// AuthContext.displayName = "AuthContext";
 
export const AuthProvider = ({children}:{children:ReactNode}) => {
  const { error, isLoading, isIdle, isError, run } = useAsync<User | null>();
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(() => {
    run(dispatch(bootstrap()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return <div>{children}</div>;
};


export const useAuth =() =>{
  // const context = React.useContext(AuthContext)
  // if (!context) {
  //   throw new Error("useAuth 必须在AuthProvider中使用");
  // }
  // return context;
  const user = useSelector(selectUser)
  const dispatch: (...args: unknown[]) => Promise<User> =useDispatch();
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch]); 
  const register = useCallback( (form: AuthForm) => dispatch(authStore.register(form)), [dispatch]);
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]); 
  

  return { login, register, user, logout}
}