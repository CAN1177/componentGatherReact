import React, { useState } from "react";
import * as auth from "auth-provider";

import { User } from "screens/project-list/search-panel";

interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = React.createContext(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) =>
    // auth.login(form).then((user) => setUser(user));
    auth.login(form).then(setUser);

  const register = (form: AuthForm) =>
    auth.register(form).then(setUser);
  const loginOut = () => auth.loginOut().then(() => setUser(null));


	return <AuthContext.Provider value={{user, login, loginOut, register}}
	
};
