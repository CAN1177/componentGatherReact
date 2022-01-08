/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { List } from "./list"; // 列表
import { SearchPanel } from "./search-panel"; // 搜索
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from "utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL;
console.log("apiUrl: ", apiUrl);

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  interface T {
    name: string;
    personId: string;
  }

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParams = useDebounce(param, 100);

  const [list, setList] = useState([]);

  const client = useHttp();

  useEffect(() => {
    //用qs 代替多参数  fetch(`${apiUrl}/projects?name=${param.name}&personId=${param.id}`).then
    // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`).then(async (response: Response) => {
    //   if (response.ok) {
    //     setList(await response.json());
    //   }
    // });
    client("projects", { data: cleanObject(debouncedParams) }).then(setList);
  }, [debouncedParams]);

  useMount(() => {
    client("users").then(setUsers);
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });

  return (
    <Container>
      <h1>项目列表 </h1>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </Container>
  );
};


const Container = styled.div`
  padding: 3.2rem;
`