import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../Api/axios';
import { BLOOD_GROUPS_API } from '../../Api/baseApi';
import { IBloodGroup } from '../../interface/patient';


export const getAllBloodGroups = createAsyncThunk(
    "BloodGroup/get",
    async (data, thunkApi) => {
        try {
            const response = await ApiClient.get(BLOOD_GROUPS_API.GET_ALL);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const getOneBloodGroup = createAsyncThunk(
    "BloodGroup/getone",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.get(`${BLOOD_GROUPS_API.GET_ONE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const createBloodGroup = createAsyncThunk(
    "BloodGroup/post",
    async (data: IBloodGroup, thunkApi) => {
        try {
            const response = await ApiClient.post(BLOOD_GROUPS_API.CREATE, {
                blood_name: data.blood_name

            });
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);


export const UpdateBloodGroup = createAsyncThunk(
    "BloodGroup/patch",
    async (data: IBloodGroup, thunkApi) => {
        try {
            const response = await ApiClient.patch(`${BLOOD_GROUPS_API.UPDATE}${data.id}`, {
                blood_name: data.blood_name
            });
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const deleteBloodGroup = createAsyncThunk(
    "BloodGroup/delete",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.delete(`${BLOOD_GROUPS_API.DELETE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);