import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAppointment } from "../../interface/appointment";
import { getAllAppointments, getOneAppointment } from "../action/appointment";

interface AppointmentState {
    appointments: IAppointment[],
    appointment: IAppointment,
    loading: boolean,
    message: "",
    success: boolean | undefined,
}

const initialState: AppointmentState = {
    appointments: [],
    appointment: {} as IAppointment,

    loading: false,
    message: '',
    success: undefined,
}

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        resetError(state) {
            state.success = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllAppointments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllAppointments.fulfilled, (state, action) => {
            state.loading = false;
            state.appointments = action.payload.data;
        });
        builder.addCase(getAllAppointments.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(getOneAppointment.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getOneAppointment.fulfilled, (state, action) => {
            state.loading = false;
            state.appointment = action.payload.data;
        });
    }

});

export const { resetError } = appointmentSlice.actions;
export default appointmentSlice;