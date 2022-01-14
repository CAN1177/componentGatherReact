/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { List } from "./list"; // 列表
import { SearchPanel } from "./search-panel"; // 搜索
import { useDebounce, useDocumentTitle } from "utils/index";
import styled from "@emotion/styled";
import { Button, Row, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";

export const ProjectListScreen = (props: {setProjectModalOpen: (isOpen: boolean) => void}) => {
  useDocumentTitle("项目列表", false)

  // const [keys]= useState<('name'|'personId')[]>(['name', 'personId'])
  
  // const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  // const projectsParam = {...param, personId:Number(param.personId)}
  const [param, setParam] =  useProjectsSearchParams()
  const { isLoading, error, data: list, retry} = useProjects(useDebounce(param, 100))
  const { data: users } = useUsers();
  // useEffect(() => {
  //   //用qs 代替多参数  fetch(`${apiUrl}/projects?name=${param.name}&personId=${param.id}`).then
  //   // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`).then(async (response: Response) => {
  //   //   if (response.ok) {
  //   //     setList(await response.json());
  //   //   }
  //   // });
  //   run(client("projects", { data: cleanObject(debouncedParams)}))
  // }, [debouncedParams]);

  // useMount(() => {
  //   client("users").then(setUsers);
  //   // fetch(`${apiUrl}/users`).then(async (response) => {
  //   //   if (response.ok) {
  //   //     setUsers(await response.json());
  //   //   }
  //   // });
  // });

  return ( 
    <Container>
      <Row style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1>项目列表 </h1>
        <Button onClick={()=>props.setProjectModalOpen(true)}>创建项目</Button>
      </Row>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        setProjectModalOpen={props.setProjectModalOpen}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
        refresh={retry}
      ></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
