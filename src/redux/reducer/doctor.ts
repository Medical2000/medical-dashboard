import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IWorkplace } from "../../interface/workplace";
import { UpdateWorkplace, createWorkplace, deleteWorkplace, getAllWorkplaces, getOneWorkplace } from "../action/workplace";
import { IDoctor } from "../../interface/doctor";
import { UpdateDoctor, createDoctor, deleteDoctor, getAllDoctors, getOneDoctor } from "../action/doctor";

interface DoctorState {
    doctors: IDoctor[],
    doctor: IDoctor,
    loading: boolean,
    message: string,
    success: boolean | undefined,
}

const initialState: DoctorState = {
    doctors: [],
    doctor: {
        id: "",
        specialty: "",
        license_number: "",
        about: "",
        exp: "",
        rating: "",
        user_id: "",
        id_workplace: "",
        id_degree: "",
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
        }
    },
    loading: false,
    message: '',
    success: undefined,
}

const doctorSlice = createSlice({
    name: "Doctor",
    initialState,
    reducers: {
        resetError(state) {
            state.success = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllDoctors.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllDoctors.fulfilled, (state, action) => {
            state.loading = false;
            state.doctors = action.payload.data;
        });
        builder.addCase(getAllDoctors.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(getOneDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.doctor = action.payload.data;
        });
        builder.addCase(getOneDoctor.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(createDoctor.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            // state.message = action.payload.message;
            // state.doctors.push(action.payload.data);
        });
        builder.addCase(createDoctor.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(UpdateDoctor.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.doctors = state.doctors.map((e) => {
                if (e.id === action.payload.data.id) {
                    // e.name = action.payload.data.name;
                    // e.phone = action.payload.data.phone;
                    // e.email = action.payload.data.email;
                    // e.city = action.payload.data.city;
                    // e.address = action.payload.data.address;
                    // e.type = action.payload.data.type;
                }
                return e;
            })
        });
        builder.addCase(UpdateDoctor.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(deleteDoctor.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.doctors = state.doctors.filter((e) => e.id !== action.payload.id)
        });
        builder.addCase(deleteDoctor.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });
    }
});

export const { resetError } = doctorSlice.actions;
export default doctorSlice;