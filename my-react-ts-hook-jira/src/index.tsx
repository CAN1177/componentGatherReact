/*
 * @Author: your name
 * @Date: 2021-06-20 11:44:56
 * @LastEditTime: 2021-06-20 12:21:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-hooks-ts-jai/my/src/index.tsx
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; 
import reportWebVitals from './reportWebVitals';
import { loadDevTools } from 'jira-dev-tool'

loadDevTools(()=>ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
