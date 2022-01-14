import { Button, Drawer } from 'antd';
import React from 'react';



export const ProjectModal = (props:{projectModalOpen: boolean, onClose:()=>void}) => {
	return <Drawer onClose={props.onClose} visible={props.projectModalOpen} width={"100%"}>
			<h1>创建项目</h1>
			<Button  onClick={props.onClose}>Close</Button>
		 </Drawer>
}