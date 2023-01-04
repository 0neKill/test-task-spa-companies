import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/api';
import { api } from '../../helpers';
import { EntryPoint } from '../../__types__/entryPoint';


type Companies = {
    entryPoint: typeof EntryPoint.COMPANIES,
}
export type ThunkArg = Companies;

export const apiQueryThunk = createAsyncThunk('api/queryByEntrypoint', async (arg: ThunkArg, thunkAPI) => {
    thunkAPI.dispatch(apiSlice.actions.setLoading({ entryPoint: arg.entryPoint, isLoading: true }));
    try {
        const data = await api.query(arg);
        return {
            entryPoint: arg.entryPoint,
            data: data,
        };
    } catch (e) {
        return thunkAPI.rejectWithValue({ entryPoint: arg.entryPoint, message: 'Не удалость получить данные' });
    } finally {
        thunkAPI.dispatch(apiSlice.actions.setLoading({ entryPoint: arg.entryPoint, isLoading: false }));
    }
});

