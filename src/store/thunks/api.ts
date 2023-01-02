import { createAsyncThunk } from '@reduxjs/toolkit';
import { Mode } from '../../__types__';
import { api } from '../../helpers/services';
import { apiSlice } from '../slices/api';


type Employees = {
    entryPoint: typeof Mode.EMPLOYEES,
    id: string,
}
type Companies = {
    entryPoint: typeof Mode.COMPANIES,
}
export type ThunkArg = Employees | Companies;

export const apiQueryThunk = createAsyncThunk('api/queryByEntrypoint', async (arg: ThunkArg, thunkAPI) => {
    thunkAPI.dispatch(apiSlice.actions.setLoading({ entryPoint: arg.entryPoint, isLoading: true }));
    try {
        const data = await api.query(arg, 0, 10);
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

