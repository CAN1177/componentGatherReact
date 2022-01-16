import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProjectModal } from "screens/project-list/util";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";


export const  ProjectPopover = ()=>{
	const { open } =useProjectModal()
	const { data: projects } = useProjects()

	const pinnedProjects = projects?.filter(item=> item.pin)
	const content = <ContentContainer>
		<Typography.Text type={"secondary"}>收藏项目</Typography.Text>
		<List>
			{
				pinnedProjects?.map(project => <List.Item>
					<List.Item.Meta title={project.name} ></List.Item.Meta>
				</List.Item>)
			}
		</List>
		<Divider/>
		<ButtonNoPadding
			type={"link"}
			onClick={open}
		>
			创建项目
		</ButtonNoPadding>
	</ContentContainer>
	 return <Popover placement={"bottom"} content={content} >
		 <span>项目</span>
	 </Popover>
}

const ContentContainer = styled.div`
	min-width: 25rem;
`