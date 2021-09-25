//  真实环境中一般使用 firebase 这种第三方auth 服务， 则不需要此文件的开发 
import { User } from 'screens/project-list/search-panel'

const localStorageKey = '__auth_provider_token__';
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserReponse = ({user}: {user: User}) => {
	window.localStorage.setItem(localStorageKey, user.token || " ")
	return user
}

export const login = (data: {username: string, password: string}) =>{
	fetch(`${apiUrl}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then(async (response: Response ) => {
		if (response.ok) {
			return handleUserReponse(await response.json())
		}else {
			return Promise.reject(data)
		}
	});
}

export const register = (data: {username: string, password: string}) =>{
	fetch(`${apiUrl}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then(async (response: Response ) => {
		if (response.ok) {
			return handleUserReponse(await response.json())
		}else {
			return Promise.reject(data)
		}
	});
}


export const logout =  async() => window.localStorage.removeItem(localStorageKey)