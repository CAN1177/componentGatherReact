/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { List } from "./list"; // 列表
import { SearchPanel } from "./search-panel"; // 搜索
import { useDebounce, useDocumentTitle } from "utils/index";
import styled from "@emotion/styled";
import { Row } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox } from "components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false)
  const { open } = useProjectModal();
  const [param, setParam] =  useProjectsSearchParams()
  const { isLoading, error, data: list} = useProjects(useDebounce(param, 100))
  const { data: users } = useUsers();

  return ( 
    <Container>
      <Row style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1>项目列表 </h1>
        <ButtonNoPadding
            type={"link"}
            onClick={open}
          >
            创建项目
          </ButtonNoPadding>
      </Row>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
     <ErrorBox error={error}/>
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      ></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
  width: 100%;
`;
