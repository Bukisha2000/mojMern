import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import usersReducer from './ReduxHelper';
import { configureStore } from '@reduxjs/toolkit';
import MyIndex from './MyIndex';

// const store = configureStore({
//     reducer: {
//       users: usersReducer
//     }
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
/* <Provider store={store}>
    <App />
    </Provider> */
    <MyIndex/>
   
);
