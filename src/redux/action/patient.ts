import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../Api/axios';
import {  PATIENT_API } from '../../Api/baseApi';
import { ICreatePatient } from '../../interface/patient';




export const getAllPatients = createAsyncThunk(
    "Patient/get",
    async (data, thunkApi) => {
        try {
            const response = await ApiClient.get(PATIENT_API.GET_ALL);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const getOnePatient = createAsyncThunk(
    "Patient/getone",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.get(`${PATIENT_API.GET_ONE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const createPatient = createAsyncThunk(
    "Patient/post",
    async (data: ICreatePatient, thunkApi) => {
        try {
            console.log(data.status);
            const response = await ApiClient.post(PATIENT_API.CREATE, {
                firstname: data.firstname,
                lastname: data.lastname,
                user_name: data.user_name,
                password: data.password,
                email: data.email,
                gender: data.gender,
                phone: data.phone,
                date_of_birth: data.date_of_birth,
                address: data.address,
                status: data.status === undefined ? true : data.status,
                // specialty: data.specialty,
                // license_number: data.license_number,
                // about: data.about,
                // exp: data.exp,
                // rating: data.rating,
                // user_id: data.user_id,
                // id_workplace: data.id_workplace,
                // id_degree: data.id_degree,
            });
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);


export const UpdatePatient = createAsyncThunk(
    "Patient/patch",
    async (data: ICreatePatient, thunkApi) => {
        console.log(data.status)
        try {
            const response = await ApiClient.patch(`${PATIENT_API.UPDATE}${data.id}`, {
                firstname: data.firstname,
                lastname: data.lastname,
                user_name: data.user_name,
                password: data.password,
                email: data.email,
                gender: data.gender,
                phone: data.phone,
                date_of_birth: data.formatDate,
                address: data.address,
                status: data.status === "" ? true : data.status,
                // specialty: data.specialty,
                // license_number: data.license_number,
                // about: data.about,
                // exp: data.exp,
                // rating: data.rating,
                // user_id: data.user_id,
                // id_workplace: data.id_workplace,
                // id_degree: data.id_degree,
            });
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const deletePatient = createAsyncThunk(
    "Patient/delete",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.delete(`${PATIENT_API.DELETE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);