/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { List } from "./list"; // 列表
import { SearchPanel } from "./search-panel"; // 搜索
import { useDebounce, useDocumentTitle } from "utils/index";
import styled from "@emotion/styled";
import { Row, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";
import { useDispatch} from "react-redux"
import { ButtonNoPadding } from "components/lib";
import { projectListActions } from "./project-list.slice";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false) 
  const [param, setParam] =  useProjectsSearchParams()
  const { isLoading, error, data: list, retry} = useProjects(useDebounce(param, 100))
  const { data: users } = useUsers();
  const dispatch = useDispatch()

  return ( 
    <Container>
      <Row style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1>项目列表 </h1>
        <ButtonNoPadding
          type={"link"}
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          创建项目
        </ButtonNoPadding>
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
