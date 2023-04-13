import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDegree } from "../../interface/doctor";
import { UpdateDegree, createDegree, deleteDegree, getAllDegrees, getOneDegree } from "../action/degree";

interface DegreeState {
    degrees: IDegree[],
    degree: IDegree,
    loading: boolean,
    message: string,
    success: boolean | undefined,
}

const initialState: DegreeState = {
    degrees: [],
    degree: {
        name: '',
        abbreviation: ''
    },
    loading: false,
    message: '',
    success: undefined,
}

const degreeSlice = createSlice({
    name: "degree",
    initialState,
    reducers: {
        resetError(state) {
            state.success = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllDegrees.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllDegrees.fulfilled, (state, action) => {
            state.loading = false;
            state.degrees = action.payload.data;
        });
        builder.addCase(getAllDegrees.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(getOneDegree.fulfilled, (state, action) => {
            state.loading = false;
            state.degree = action.payload.data;
        });
        builder.addCase(getOneDegree.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(createDegree.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createDegree.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.degrees.push(action.payload.data);
        });
        builder.addCase(createDegree.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(UpdateDegree.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateDegree.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.degrees = state.degrees.map((e) => {
                if (e.id === action.payload.data.id) {
                    e.name = action.payload.data.name;
                    e.abbreviation = action.payload.data.abbreviation;
                }
                return e;
            })
        });
        builder.addCase(UpdateDegree.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(deleteDegree.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteDegree.fulfilled, (state, action) => {
            console.log(action.payload.message)
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.degrees = state.degrees.filter((e) => e.id !== action.payload.id)
        });
        builder.addCase(deleteDegree.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });
    }
});

export const { resetError } = degreeSlice.actions;
export default degreeSlice;