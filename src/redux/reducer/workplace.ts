import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IWorkplace } from "../../interface/workplace";
import { createWorkplace, deleteWorkplace, getAllWorkplaces } from "../action/workplace";

interface WorkplaceState {
    workplace: IWorkplace[],
    loading: boolean,
    message: string,
    success: boolean | undefined,
}

const initialState: WorkplaceState = {
    workplace: [],
    loading: false,
    message: '',
    success: undefined,
}

const WorkplaceSlice = createSlice({
    name: "workplace",
    initialState,
    reducers: {
        resetError(state) {
            state.success = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllWorkplaces.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllWorkplaces.fulfilled, (state, action) => {
            state.loading = false;
            state.workplace = action.payload.data;
        });
        builder.addCase(getAllWorkplaces.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(createWorkplace.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createWorkplace.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.workplace.push(action.payload.data);
        });
        builder.addCase(createWorkplace.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(deleteWorkplace.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteWorkplace.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.workplace = state.workplace.filter((e) => e.id !== action.payload.id)
        });
        builder.addCase(deleteWorkplace.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });
    }
});

export const { resetError } = WorkplaceSlice.actions;
export default WorkplaceSlice;