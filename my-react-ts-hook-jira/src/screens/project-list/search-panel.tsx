
import React from "react";
// import { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form layout={"inline"} style={{marginBottom: "1rem"}}>
      <Form.Item>
        {/* setParam(Object.assign({}, param, {name: evt.target.value})) */}
        <Input
          placeholder="Please enter project name"
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
