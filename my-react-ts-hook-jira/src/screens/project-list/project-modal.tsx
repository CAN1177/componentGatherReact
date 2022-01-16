import { Button, Drawer } from 'antd';
import React from 'react';
import { useProjectModal } from './util';



export const ProjectModal = () => {
	const { projectModalOpen, close } = useProjectModal()
	return <Drawer onClose={close} visible={projectModalOpen} width={"100%"}>
			<h1>创建项目</h1>
			<Button  onClick={close}>Close</Button>
		 </Drawer>
}