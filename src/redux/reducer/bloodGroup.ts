import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBloodGroup } from "../../interface/patient";
import { UpdateBloodGroup, createBloodGroup, deleteBloodGroup, getAllBloodGroups, getOneBloodGroup } from "../action/bloodGroup";

interface bloodGroupState {
    bloodGroups: IBloodGroup[],
    bloodGroup: IBloodGroup,
    loading: boolean,
    message: string,
    success: boolean | undefined,
}

const initialState: bloodGroupState = {
    bloodGroups: [],
    bloodGroup: {
        blood_name: ''
    },
    loading: false,
    message: '',
    success: undefined,
}

const bloodGroupSlice = createSlice({
    name: "bloodGroup",
    initialState,
    reducers: {
        resetError(state) {
            state.success = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBloodGroups.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllBloodGroups.fulfilled, (state, action) => {
            state.loading = false;
            state.bloodGroups = action.payload.data;
        });
        builder.addCase(getAllBloodGroups.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(getOneBloodGroup.fulfilled, (state, action) => {
            state.loading = false;
            state.bloodGroup = action.payload.data;
        });
        builder.addCase(getOneBloodGroup.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(createBloodGroup.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createBloodGroup.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.bloodGroups.push(action.payload.data);
        });
        builder.addCase(createBloodGroup.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(UpdateBloodGroup.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateBloodGroup.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.bloodGroups = state.bloodGroups.map((e) => {
                if (e.id === action.payload.data.id) {
                    e.blood_name = action.payload.data.blood_name;
                }
                return e;
            })
        });
        builder.addCase(UpdateBloodGroup.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(deleteBloodGroup.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteBloodGroup.fulfilled, (state, action) => {
            console.log(action.payload.message)
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.bloodGroups = state.bloodGroups.filter((e) => e.id !== action.payload.id)
        });
        builder.addCase(deleteBloodGroup.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });
    }
});

export const { resetError } = bloodGroupSlice.actions;
export default bloodGroupSlice;