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