import { createSlice, Draft, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

import { apiQueryThunk } from '../thunks';

import { type Company, EntryPoint } from '../../__types__';
import type { SelectAll, TableData } from '../../components';


export type InitialStateApi = {
    lastEntryPoint: EntryPoint | null,
    dataByApi: {
        [key in EntryPoint]: {
            data: Company[],
            currentItem: Company | null,
            isLoading: boolean,
            error: string,
        }
    }
}

interface IAuthorizationReducer<T> extends SliceCaseReducers<T> {
    setLoading: (state: Draft<T>, payload: PayloadAction<{ entryPoint: EntryPoint, isLoading: boolean }>) => void,
    setCurrentItem: (state: Draft<T>, payload: PayloadAction<{ entryPoint: EntryPoint, itemId: string | null }>) => void,
    deleteItemsTo: (state: Draft<T>, payload: PayloadAction<{ entryPoint: EntryPoint, items: SelectAll, deep?: boolean }>) => void,
    addItemTo: (state: Draft<T>, payload: PayloadAction<{ entryPoint: EntryPoint, item: TableData, deep?: boolean }>) => void,
    changeItemTo: (state: Draft<T>, payload: PayloadAction<{ entryPoint: EntryPoint, item: TableData, deep?: boolean }>) => void,
}

const initialState = Object.values(EntryPoint).reduce((acc, item) => {
    acc.dataByApi[item] = {
        data: [],
        isLoading: false,
        currentItem: null,
        error: '',
    };
    return acc;
}, { lastEntryPoint: null, dataByApi: {} } as InitialStateApi);


export const apiSlice = createSlice<InitialStateApi, IAuthorizationReducer<InitialStateApi>, 'apiSlice'>({
    name: 'apiSlice',
    initialState: initialState,
    reducers: {
        setLoading: (state, action) => {
            state.dataByApi[action.payload.entryPoint].isLoading = action.payload.isLoading;
        },
        setCurrentItem: (state, action) => {
            const item = state.dataByApi[action.payload.entryPoint].data.find(_ => _.id === action.payload.itemId);
            if (item) {
                state.dataByApi[action.payload.entryPoint].currentItem = item;
            } else {
                state.dataByApi[action.payload.entryPoint].currentItem = null;
            }
        },

        deleteItemsTo: (state, action) => {
            const dataByEntryPoint = state.dataByApi[action.payload.entryPoint];
            const currentItem = dataByEntryPoint.currentItem;
            if (currentItem && action.payload.deep) {
                const idxItem = dataByEntryPoint.data.findIndex(_ => _.id === currentItem.id);
                const newVector = currentItem.employees.filter(employee => !action.payload.items[employee.id]);
                dataByEntryPoint.data[idxItem].total_count = dataByEntryPoint.data[idxItem].total_count - Object.keys(action.payload.items).length;
                dataByEntryPoint.data[idxItem].employees = newVector;
                currentItem.employees = newVector;
            } else {
                dataByEntryPoint.data = dataByEntryPoint.data.filter(item => !action.payload.items[item.id]);
            }
        },
        addItemTo: (state, action) => {
            const dataByEntryPoint = state.dataByApi[action.payload.entryPoint];
            const currentItem = dataByEntryPoint.currentItem;
            if (currentItem && action.payload.deep) {
                const idxItem = dataByEntryPoint.data.findIndex(_ => _.id === currentItem.id);
                dataByEntryPoint.data[idxItem].total_count = dataByEntryPoint.data[idxItem].total_count + 1;
                const newData = [
                    {
                        id: action.payload.item.id,
                        surname: action.payload.item.first,
                        firstname: action.payload.item.second,
                        position: action.payload.item.third,
                    },
                    ...currentItem.employees,
                ];
                currentItem.employees = newData;
                dataByEntryPoint.data[idxItem].employees = newData;
            } else {
                dataByEntryPoint.data = [
                    {
                        id: action.payload.item.id,
                        name: action.payload.item.first,
                        total_count: +action.payload.item.second,
                        address: action.payload.item.third,
                        employees: [],
                    },
                    ...dataByEntryPoint.data,
                ];
            }
        },
        changeItemTo: (state, action) => {
            const dataByEntryPoint = state.dataByApi[action.payload.entryPoint];
            const currentItem = dataByEntryPoint.currentItem;
            if (currentItem && action.payload.deep) {
                const idxEmployee = currentItem.employees.findIndex(_ => _.id === action.payload.item.id);
                const idxCompany = dataByEntryPoint.data.findIndex(_ => _.id === currentItem.id);
                const newObj = {
                    id: action.payload.item.id,
                    surname: action.payload.item.first,
                    firstname: action.payload.item.second,
                    position: action.payload.item.third,
                };
                dataByEntryPoint.data[idxCompany].employees[idxEmployee] = newObj;
                currentItem.employees[idxEmployee] = newObj;
            } else {
                const idxCompany = dataByEntryPoint.data.findIndex(_ => _.id === action.payload.item.id);
                dataByEntryPoint.data[idxCompany] = {
                    ...dataByEntryPoint.data[idxCompany],
                    name: action.payload.item.first,
                    address: action.payload.item.third,
                };
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(apiQueryThunk.fulfilled.type, (state, action: PayloadAction<{ entryPoint: EntryPoint, data: Company[] }>) => {
            state.lastEntryPoint = action.payload.entryPoint;
            state.dataByApi[action.payload.entryPoint].data = action.payload.data;
        }).addCase(apiQueryThunk.rejected.type, (state, action: PayloadAction<{ entryPoint: EntryPoint, message: string }>) => {
            state.dataByApi[action.payload.entryPoint].error = action.payload.message;
        });
    },
});

export default apiSlice.reducer;
