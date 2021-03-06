/*
 * @Author: your name
 * @Date: 2021-06-20 11:44:56
 * @LastEditTime: 2021-06-20 12:21:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-hooks-ts-jai/my/src/index.tsx
 */
import "./wdyr";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 
import reportWebVitals from './reportWebVitals';
import { loadServer, DevTools } from 'jira-dev-tool'
import 'antd/dist/antd.less'
import {AppProviders } from 'context'

loadServer(()=>ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools/>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById('root')
  )
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
