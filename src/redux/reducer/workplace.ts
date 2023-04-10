import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IWorkplace } from "../../interface/workplace";
import { UpdateWorkplace, createWorkplace, deleteWorkplace, getAllWorkplaces, getOneWorkplace } from "../action/workplace";

interface WorkplaceState {
    workplaces: IWorkplace[],
    workplace: IWorkplace,
    loading: boolean,
    message: string,
    success: boolean | undefined,
}

const initialState: WorkplaceState = {
    workplaces: [],
    workplace: {
        id: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        type: "",
    },
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
            state.workplaces = action.payload.data;
        });
        builder.addCase(getAllWorkplaces.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(getOneWorkplace.fulfilled, (state, action) => {
            state.loading = false;
            state.workplace = action.payload.data;
        });

        builder.addCase(createWorkplace.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createWorkplace.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.workplaces.push(action.payload.data);
        });
        builder.addCase(createWorkplace.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(UpdateWorkplace.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateWorkplace.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.workplaces = state.workplaces.map((e) => {
                if (e.id === action.payload.data.id) {
                    e.name = action.payload.data.name;
                    e.phone = action.payload.data.phone;
                    e.email = action.payload.data.email;
                    e.city = action.payload.data.city;
                    e.type = action.payload.data.type;
                }
                return e;
            })
        });
        builder.addCase(UpdateWorkplace.rejected, (state, action: PayloadAction<any>) => {
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
            state.workplaces = state.workplaces.filter((e) => e.id !== action.payload.id)
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