import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../Api/axios';
import { ROLE_API, WORKPLACE_API } from '../../Api/baseApi';
import { IWorkplace } from '../../interface/workplace';
import { IRole } from '../../interface/auth';


export const getAllRoles = createAsyncThunk(
    "Role/get",
    async (data, thunkApi) => {
        try {
            const response = await ApiClient.get(ROLE_API.GET_ALL);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const getOneRole = createAsyncThunk(
    "Role/getone",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.get(`${ROLE_API.GET_ONE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const createRole = createAsyncThunk(
    "Role/post",
    async (data: IRole, thunkApi) => {
        try {
            const response = await ApiClient.post(ROLE_API.CREATE, {
                role_name: data.role_name,
               
            });
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);


export const UpdateRole = createAsyncThunk(
    "Role/patch",
    async (data: IRole, thunkApi) => {
        try {
            const response = await ApiClient.patch(`${ROLE_API.UPDATE}${data.id}`, {
                role_name: data.role_name,
            });
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const deleteRole = createAsyncThunk(
    "Role/delete",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.delete(`${ROLE_API.DELETE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);