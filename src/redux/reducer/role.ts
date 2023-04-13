import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRole } from "../../interface/auth";
import { UpdateRole, createRole, deleteRole, getAllRoles, getOneRole } from "../action/role";

interface RoleState {
    roles: IRole[],
    role: IRole,
    loading: boolean,
    message: string,
    success: boolean | undefined,
}

const initialState: RoleState = {
    roles: [],
    role: {
        role_name: ''
    },
    loading: false,
    message: '',
    success: undefined,
}

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        resetError(state) {
            state.success = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllRoles.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllRoles.fulfilled, (state, action) => {
            state.loading = false;
            state.roles = action.payload.data;
        });
        builder.addCase(getAllRoles.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(getOneRole.fulfilled, (state, action) => {
            state.loading = false;
            state.role = action.payload.data;
        });
        builder.addCase(getOneRole.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(createRole.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createRole.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.roles.push(action.payload.data);
        });
        builder.addCase(createRole.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(UpdateRole.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateRole.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.roles = state.roles.map((e) => {
                if (e.id === action.payload.data.id) {
                    e.role_name = action.payload.data.role_name;
                }
                return e;
            })
        });
        builder.addCase(UpdateRole.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(deleteRole.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteRole.fulfilled, (state, action) => {
            console.log(action.payload.message)
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.roles = state.roles.filter((e) => e.id !== action.payload.id)
        });
        builder.addCase(deleteRole.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });
    }
});

export const { resetError } = roleSlice.actions;
export default roleSlice;