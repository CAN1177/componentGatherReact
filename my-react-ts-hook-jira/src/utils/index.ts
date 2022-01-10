/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'

// 前端避免改变传入的使用对象
export const isFalse = (value: unknown) => value === 0 ? false : !value;


// 避免删除可用属性，比如 {xxx: false}
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''


export const cleanObject = (object: {[key: string]: unknown}) =>{
	const result = {...object}
	Object.keys(result).forEach(key =>{
		const  value = result[key]
		if(isVoid(value)) {
			delete result[key]
		}
	})
	return result
}


// custom—hook 自定义hooks,初始化只加载一次
export const useMount = (callback: ()=>void ) =>{
	useEffect(()=>{
		callback()
	}, [])
}

export const useDebounce = <T>(value: T, delay: number) =>{
	const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}

export const useDocumentTitle = (title: string, keepOnUnmunt:boolean = true)=>{


	//使用useRef代替闭包，实现keepOnUnmunt
	const oldTitle = useRef(document.title).current;

	useEffect(() => {
		document.title = title;
	}, [title]);

	useEffect(() => {
		return (() => {
			if (!keepOnUnmunt) {
				document.title = oldTitle;
			}
		})
	}, [keepOnUnmunt, oldTitle])

}

export const resetRoute = () => (window.location.href = window.location.origin);