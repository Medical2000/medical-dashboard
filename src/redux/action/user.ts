import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../Api/axios';
import { USER_API } from '../../Api/baseApi';
import { IUser } from '../../interface/auth';
import dayjs from 'dayjs';


export const getAllUsers = createAsyncThunk(
    "user/get",
    async (data, thunkApi) => {
        try {
            const response = await ApiClient.get(USER_API.GET_ALL);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const getOneUser = createAsyncThunk(
    "user/getone",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.get(`${USER_API.GET_ONE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const createUser = createAsyncThunk(
    "user/post",
    async (data: IUser, thunkApi) => {
        try {

            const formatDate = dayjs(data.date_of_birth).format('YYYY-MM-DD')
            const formData = new FormData();
            if (!data.status) {
                data.status = true;
            }

            data.user_name && formData.append('user_name', data.user_name);
            data.email && formData.append('email', data.email);
            data.password && formData.append('password', data.password);
            data.firstname && formData.append('firstname', data.firstname);
            data.lastname && formData.append('lastname', data.lastname);
            data.gender && formData.append('gender', data.gender);
            data.phone && formData.append('phone', data.phone);
            data.date_of_birth && formData.append('date_of_birth', formatDate);
            data.address && formData.append('address', data.address);
            data.status && formData.append('status', data.status);
            data.roleId && formData.append('roleId', data.roleId);
            data.avatar && formData.append('avatar', data.avatar.file.originFileObj);
            const response = await ApiClient.post(USER_API.CREATE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);


export const UpdateUser = createAsyncThunk(
    "user/patch",
    async (data: IUser, thunkApi) => {
        try {
            const formatDate = dayjs(data.formatDate).format('YYYY-MM-DD')
            const response = await ApiClient.patch(`${USER_API.UPDATE}${data.id}`, {
                firstname: data.firstname,
                lastname: data.lastname,
                user_name: data.user_name,
                password: data.password,
                // avatar_path: data.avatar_path,
                email: data.email,
                gender: data.gender,
                phone: data.phone,
                date_of_birth: data.formatDate,
                address: data.address,
                status: data.status,
                roleId: data.roleId,
            });
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/delete",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.delete(`${USER_API.DELETE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);