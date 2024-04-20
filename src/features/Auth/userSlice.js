import userApi from '../../api/userApi';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StorageKeys from '../../constants/storage-keys';

export const register = createAsyncThunk(
    'users/register',
    async (payload) => {
        // call API to register
        const data = await userApi.register(payload);

        // save data to local storage
        localStorage.setItem(StorageKeys.TOKEN, data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

        // return user data
        return data.user;
    });

export const login = createAsyncThunk(
        'users/login',
        async (payload) => {
            // call API to login
            const data = await userApi.login(payload);
    
            // save data to local storage
            localStorage.setItem(StorageKeys.TOKEN, data.jwt);
            localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    
            // return user data
            return data.user;
        });

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        settings: {},
    },
    reducers: {
        logout(state) {
            // clear local storage
            localStorage.removeItem(StorageKeys.USER);
            localStorage.removeItem(StorageKeys.TOKEN);

            state.current = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase('users/register/fulfilled', (state, action) => {
            state.current = action.payload;
        }).addCase('users/login/fulfilled', (state, action) => {
            state.current = action.payload;
        })
    }
});

const { reducer, actions} = userSlice;
export const { logout } = actions;
export default reducer; // default export