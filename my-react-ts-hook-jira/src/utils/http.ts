import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: Object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET", // 默认为GET,customConfig 会覆盖
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
	 // 注意这里的ts Utility Types ==> Parameters<typeof http> 
   // Utility Type 用法 用泛型给他传入一个其他类型，然后Utility Type对其进行某种操作
  return useCallback((...[endpoint, config]: Parameters<typeof http>) =>
  http(endpoint, { ...config, token: user?.token }), [user?.token])
};



// 举个🌰
type Person = {
  name: string;
  age: number;
}
// const my: Person = {name: 'John'}
const my: Partial<Person> = {name: 'John'}
console.log('%c 🍅 my: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', my);