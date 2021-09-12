import React from "react";
import { List } from "./list";  // 列表
import { SearchPanel } from "./search-panel";  // 搜索
import { useEffect, useState } from "react";
import { cleanObject } from "../../utils/index";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;
console.log('apiUrl: ', apiUrl);

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    //用qs 代替多参数  fetch(`${apiUrl}/projects?name=${param.name}&personId=${param.id}`).then 
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  );
};
