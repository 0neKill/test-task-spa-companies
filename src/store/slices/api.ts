import { createSlice, Draft, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

import { apiQueryThunk } from '../thunks';
import { Company, Employee, Mode } from '../../__types__';

export interface TableData {
    id: string,
    first: string,
    second: string,
    third: string
}

export type TableDataVector = TableData[];

export type InitialStateApi = {
    [key in Mode]: {
        data: TableDataVector,
        isLoading: boolean,
        error: string,
    };
}

interface IAuthorizationReducer<T> extends SliceCaseReducers<T> {
    setLoading: (state: Draft<T>, payload: PayloadAction<{ entryPoint: Mode, isLoading: boolean }>) => void,
}

const initialState = Object.values(Mode).reduce((acc, item) => {
    acc[item] = {
        data: [],
        isLoading: false,
        error: '',
    };
    return acc;
}, {} as InitialStateApi);


export const apiSlice = createSlice<InitialStateApi, IAuthorizationReducer<InitialStateApi>, 'apiSlice'>({
    name: 'apiSlice',
    initialState: initialState,
    reducers: {
        setLoading: (state, action) => {
            state[action.payload.entryPoint].isLoading = action.payload.isLoading;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(apiQueryThunk.fulfilled.type, (state, action: PayloadAction<{ entryPoint: Mode, data: Company[] | Employee[] }>) => {
            state[action.payload.entryPoint].data = action.payload.data.map((item) => {
                if ('firstname' in item) {
                    return { id: item.id, first: item.surname, second: item.firstname, third: item.position };
                }
                return { id: item.id, first: item.name, second: item.total_count.toString(), third: item.address };
            });
        }).addCase(apiQueryThunk.rejected.type, (state, action: PayloadAction<{ entryPoint: Mode, message: string }>) => {
            state[action.payload.entryPoint].error = action.payload.message;
        });
    },
});

export default apiSlice.reducer;
