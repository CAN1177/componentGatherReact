import { Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import React from "react";
import { User } from "screens/project-list/search-panel";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: string;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: ()=>void;
  setProjectModalOpen: (isOpen:boolean)=>void
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number)=>(pin: boolean) => 
    mutate({id, pin}).then(props.refresh);
  
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={false} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={ 
                  pinProject(project.id)
                }
              />
            );
          },
        },
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
            );
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          dataIndex: "created",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD HH:mm:ss")
                  : "--"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown overlay={<Menu>
                <Menu.Item key={'edit'}>
                  <ButtonNoPadding type={"text"} onClick={() =>props.setProjectModalOpen(true)}>编辑</ButtonNoPadding>
                </Menu.Item>
              </Menu>} >
                <ButtonNoPadding type={"link"} >...</ButtonNoPadding>
              </Dropdown>
            )
          }
        }
      ]}
      {...props}
    />
  );
};
