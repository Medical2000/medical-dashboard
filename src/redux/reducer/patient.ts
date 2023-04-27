import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IWorkplace } from "../../interface/workplace";
import { UpdateWorkplace, createWorkplace, deleteWorkplace, getAllWorkplaces, getOneWorkplace } from "../action/workplace";
import { IDoctor } from "../../interface/doctor";
import { UpdateDoctor, createDoctor, deleteDoctor, getAllDoctors, getOneDoctor } from "../action/doctor";
import { UpdatePatient, createPatient, deletePatient, getAllPatients, getOnePatient } from "../action/patient";
import { IPatient } from "../../interface/patient";

interface patientState {
    patients: IPatient[],
    patient: IPatient,
    loading: boolean,
    message: string,
    success: boolean | undefined,
}

const initialState: patientState = {
    patients: [],
    patient: {
        id: "",
        weight: "",
        health_insurance_number: "",
        height: "",
        user: {
            firstname: "",
            lastname: "",
            user_name: "",
            password: "",
            avatar_path: "",
            email: "",
            gender: "",
            phone: "",
            date_of_birth: "",
            address: "",
            status: "",
            roleId: "",
        },
        bloodGroup: {
            id: "",
            blood_name: "",
        }

    },
    loading: false,
    message: '',
    success: undefined,
}

const patientSlice = createSlice({
    name: "Doctor",
    initialState,
    reducers: {
        resetError(state) {
            state.success = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPatients.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllPatients.fulfilled, (state, action) => {
            state.loading = false;
            state.patients = action.payload.data;
        });
        builder.addCase(getAllPatients.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(getOnePatient.fulfilled, (state, action) => {
            state.loading = false;
            state.patient = action.payload.data;
        });
        builder.addCase(getOnePatient.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(createPatient.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createPatient.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            // state.patients.push(action.payload.data);
        });
        builder.addCase(createPatient.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(UpdatePatient.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdatePatient.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        });
        builder.addCase(UpdatePatient.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(deletePatient.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deletePatient.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.patients = state.patients.filter((e) => e.id !== action.payload.id)
        });
        builder.addCase(deletePatient.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });
    }
});

export const { resetError } = patientSlice.actions;
export default patientSlice;