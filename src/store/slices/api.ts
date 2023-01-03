import { createSlice, Draft, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

import { apiQueryThunk } from '../thunks';
import { Company, Employee, Mode } from '../../__types__';
import { SelectAll } from '../../components/table/table';

export interface TableData {
    id: string,
    first: string,
    second: string,
    third: string
}

export type TableDataVector = TableData[] | null;

export type InitialStateApi = {
    [key in Mode]: {
        data: TableDataVector,
        isLoading: boolean,
        error: string,
    };
}

interface IAuthorizationReducer<T> extends SliceCaseReducers<T> {
    setLoading: (state: Draft<T>, payload: PayloadAction<{ entryPoint: Mode, isLoading: boolean }>) => void,
    resetDataByEntryPoint: (state: Draft<T>, payload: PayloadAction<{ entryPoint: Mode }>) => void,
    deleteItems: (state: Draft<T>, payload: PayloadAction<{ entryPoint: Mode, items: SelectAll }>) => void,
    addItem: (state: Draft<T>, payload: PayloadAction<{ entryPoint: Mode, item: TableData }>) => void,
}

const initialState = Object.values(Mode).reduce((acc, item) => {
    acc[item] = {
        data: null,
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
        resetDataByEntryPoint: (state, action) => {
            state[action.payload.entryPoint].data = null;
            state[action.payload.entryPoint].isLoading = false;
        },
        deleteItems: (state, action) => {
            state[action.payload.entryPoint].data = state[action.payload.entryPoint].data!.filter(item => !action.payload.items[item.id]);
        },
        addItem: (state, action) => {
            const item = action.payload.item;
            if (state[action.payload.entryPoint].data) {
                const idx = state[action.payload.entryPoint].data!.findIndex((_) => _.id === item.id);
                idx >= 0 ? (state[action.payload.entryPoint].data![idx] = { ...state[action.payload.entryPoint].data![idx], ...item }) : (
                    state[action.payload.entryPoint].data = [...state[action.payload.entryPoint].data!, item]
                );
            } else {
                state[action.payload.entryPoint].data = [action.payload.item];
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(apiQueryThunk.fulfilled.type, (state, action: PayloadAction<{ entryPoint: Mode, data: Company[] | Employee[] }>) => {
            state[action.payload.entryPoint].data = action.payload.data.map((item) => {
                if ('firstname' in item) {
                    return {
                        id: item.id,
                        first: item.surname,
                        second: item.firstname,
                        third: item.position,
                    };
                }
                return {
                    id: item.id,
                    first: item.name,
                    second: item.total_count.toString(),
                    third: item.address,
                };
            });
        }).addCase(apiQueryThunk.rejected.type, (state, action: PayloadAction<{ entryPoint: Mode, message: string }>) => {
            state[action.payload.entryPoint].error = action.payload.message;
        });
    },
});

export default apiSlice.reducer;
