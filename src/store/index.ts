import { configureStore } from '@reduxjs/toolkit';
import { rootReducers } from './slices';
import { apiSlice } from './slices/api';
import { apiQueryThunk } from './thunks';


export const store = configureStore({
    reducer: rootReducers,
});

export const action = {
    ...apiSlice.actions,
    apiQueryThunk,
};