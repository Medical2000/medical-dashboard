import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiClient from "../../Api/axios";
import { APPOINTMENT_API } from "../../Api/baseApi";


export const getAllAppointments = createAsyncThunk(
    "Appointmen/get",
    async (data, thunkApi) => {
        try {
            const response = await ApiClient.get(APPOINTMENT_API.GET_ALL);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);

export const getOneAppointment = createAsyncThunk(
    "Appointment/getone",
    async (id: string, thunkApi) => {
        try {
            const response = await ApiClient.get(`${APPOINTMENT_API.GET_ONE}${id}`);
            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)
        }
    }
);