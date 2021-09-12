import { useEffect, useState } from 'react'

// 前端避免改变传入的使用对象
export const isFalse = (value) => value === 0 ? false : !value;

export const cleanObject = (object) =>{
	const result = {...object}
	Object.keys(result).forEach(key =>{
		const  value = result[key]
		if(isFalse(value)) {
			delete result[key]
		}
	})
	return result
}


// custom—hook 自定义hooks,初始化只加载一次
export const useMount = (callback) =>{
	useEffect(()=>{
		callback()
	}, [])
}

export const useDebounce = (value, delay) =>{
	const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}