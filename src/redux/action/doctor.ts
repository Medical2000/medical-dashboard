import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../Api/axios';
import { DOCTOR_API } from '../../Api/baseApi';
import { IWorkplace } from '../../interface/workplace';
import { ICreateDoctor, IDoctor } from '../../interface/doctor';


export const getAllDoctors = createAsyncThunk(
    "Doctor/get",
    async (data, thunkApi) => {
        try {
            const response = await ApiClient.get(DOCTOR_API.GET_ALL);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const getOneDoctor = createAsyncThunk(
    "Doctor/getone",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.get(`${DOCTOR_API.GET_ONE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const createDoctor = createAsyncThunk(
    "Doctor/post",
    async (data: ICreateDoctor, thunkApi) => {
        try {
            console.log(data);
            const response = await ApiClient.post(DOCTOR_API.CREATE, {
                firstname: data.firstname,
                lastname: data.lastname,
                user_name: data.user_name,
                password: data.password,
                email: data.email,
                gender: data.gender,
                phone: data.phone,
                date_of_birth: data.formatDate,
                address: data.address,
                status: data.status || true,
                specialty: data.specialty,
                license_number: data.license_number,
                about: data.about,
                exp: data.exp,
                rating: data.rating,
                user_id: data.user_id,
                id_workplace: data.id_workplace,
                id_degree: data.id_degree,
            });
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);


export const UpdateDoctor = createAsyncThunk(
    "Doctor/patch",
    async (data: IDoctor, thunkApi) => {
        try {
            const response = await ApiClient.patch(`${DOCTOR_API.UPDATE}${data.id}`, {
                specialty: data.specialty,
                license_number: data.license_number,
                about: data.about,
                exp: data.exp,
                rating: data.rating,
                user_id: data.user_id,
                id_workplace: data.id_workplace,
                id_degree: data.id_degree,
            });
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const deleteDoctor = createAsyncThunk(
    "Doctor/delete",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.delete(`${DOCTOR_API.DELETE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);