import { configureStore } from '@reduxjs/toolkit';
import workplace from './reducer/workplace';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import userSlice from './reducer/user';
import roleSlice from './reducer/role';
import degreeSlice from './reducer/degree';
import bloodGroupSlice from './reducer/bloodGroup';

export const store = configureStore({
    reducer: {
        workplace: workplace.reducer,
        user: userSlice.reducer,
        role: roleSlice.reducer,
        degree: degreeSlice.reducer,
        bloodGroup: bloodGroupSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});


export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;