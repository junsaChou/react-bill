import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { RouterProvider }  from 'react-router-dom'
import router from '@/router';
import  { Provider  } from 'react-redux'
import store from './store';
// 导入定制化主题文件
import './theme.css'

import sum from '@/test'
sum(1,3)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <RouterProvider router={router}/>
  </Provider>

  // <React.StrictMode>
  
  // </React.StrictMode>
);
