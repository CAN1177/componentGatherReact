/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { List } from "./list"; // 列表
import { SearchPanel } from "./search-panel"; // 搜索
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils/index";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";

export const ProjectListScreen = () => {

  useDocumentTitle("项目列表", false)

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParams = useDebounce(param, 100);
  const { isLoading, error, data: list } = useProjects(debouncedParams);
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
      <h1>项目列表 </h1>
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
      ></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
