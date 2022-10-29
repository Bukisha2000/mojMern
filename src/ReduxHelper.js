import { createSlice } from '@reduxjs/toolkit';
import React from 'react'


export const userSlice = createSlice({
    name: "users",
    initialState: {
        userToken: localStorage.getItem('token'),
        userName: 'none'
    },
    reducers: {
        addUser: (state,action) => {
           localStorage.setItem('token',action.payload.token);
            state.userToken = action.payload.token;
            state.userName = action.payload.name;
        },
        removeUser: (state,action) => {
          
            localStorage.clear();
            state.userToken = 'none';
            state.userName = 'none';
        },
    }
})
export const {addUser} = userSlice.actions;
export const {removeUser} = userSlice.actions;

export default userSlice.reducer;