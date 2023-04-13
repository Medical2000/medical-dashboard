import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../Api/axios';
import { DEGREE_API } from '../../Api/baseApi';
import { IDegree } from '../../interface/doctor';


export const getAllDegrees = createAsyncThunk(
    "Degree/get",
    async (data, thunkApi) => {
        try {
            const response = await ApiClient.get(DEGREE_API.GET_ALL);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const getOneDegree = createAsyncThunk(
    "Degree/getone",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.get(`${DEGREE_API.GET_ONE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const createDegree = createAsyncThunk(
    "Role/post",
    async (data: IDegree, thunkApi) => {
        try {
            const response = await ApiClient.post(DEGREE_API.CREATE, {
                name: data.name,
                abbreviation: data.abbreviation

            });
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);


export const UpdateDegree = createAsyncThunk(
    "Degree/patch",
    async (data: IDegree, thunkApi) => {
        try {
            const response = await ApiClient.patch(`${DEGREE_API.UPDATE}${data.id}`, {
                name: data.name,
                abbreviation: data.abbreviation
            });
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const deleteDegree = createAsyncThunk(
    "Degree/delete",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.delete(`${DEGREE_API.DELETE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);