import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../Api/axios';
import { WORKPLACE_API } from '../../Api/baseApi';
import { IWorkplace } from '../../interface/workplace';


export const getAllWorkplaces = createAsyncThunk(
    "workplace/get",
    async (data, thunkApi) => {
        try {
            const response = await ApiClient.get(WORKPLACE_API.GET_ALL);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const getOneWorkplace = createAsyncThunk(
    "workplace/getone",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.get(`${WORKPLACE_API.GET_ONE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const createWorkplace = createAsyncThunk(
    "workplace/post",
    async (data: IWorkplace, thunkApi) => {
        try {
            const response = await ApiClient.post(WORKPLACE_API.CREATE, {
                name: data.name,
                phone: data.phone,
                email: data.email,
                address: data.address,
                city: data.city,
                type: data.type,
            });
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);


export const UpdateWorkplace = createAsyncThunk(
    "workplace/patch",
    async (data: IWorkplace, thunkApi) => {
        try {
            const response = await ApiClient.patch(`${WORKPLACE_API.UPDATE}${data.id}`, {
                name: data.name,
                phone: data.phone,
                email: data.email,
                address: data.address,
                city: data.city,
                type: data.type,
            });
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const deleteWorkplace = createAsyncThunk(
    "workplace/delete",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.delete(`${WORKPLACE_API.DELETE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);