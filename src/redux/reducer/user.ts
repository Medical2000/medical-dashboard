import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UpdateUser, createUser, deleteUser, getAllUsers, getOneUser } from "../action/user";
import { IUser } from "../../interface/auth";

interface userState {
    users: IUser[],
    user: IUser,
    loading: boolean,
    message: string,
    success: boolean | undefined,
}

const initialState: userState = {
    users: [],
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
    loading: false,
    message: '',
    success: undefined,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetError(state) {
            state.success = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.data;
        });
        builder.addCase(getAllUsers.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(getOneUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
        });
        builder.addCase(getOneUser.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.message = action.payload;
        });

        builder.addCase(createUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.users.push(action.payload.data);
        });
        builder.addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(UpdateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.users = state.users.map((e) => {
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
        builder.addCase(UpdateUser.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });

        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.users = state.users.filter((e) => e.id !== action.payload.id)
        });
        builder.addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = false;
            state.message = action.payload;
        });
    }
});

export const { resetError } = userSlice.actions;
export default userSlice;