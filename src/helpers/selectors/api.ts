import { RootReducers } from '../../store/slices';
import { createSelector } from '@reduxjs/toolkit';
import { TableData } from '../../components';

const getLastEntryPoint = (state: RootReducers) => state.api.lastEntryPoint;
const getDataByApi = (state: RootReducers) => state.api.dataByApi;

export const getDataByEntrypoint = createSelector(getLastEntryPoint, getDataByApi, (lastEntryPoint, dataByApi) => {
    if (lastEntryPoint) {
        const data = dataByApi[lastEntryPoint].data.map<TableData>(item => {
            return {
                id: item.id,
                first: item.name,
                second: item.total_count.toString(),
                third: item.address,
            };
        });
        return {
            ...dataByApi,
            [lastEntryPoint]: {
                ...dataByApi[lastEntryPoint],
                data,
            },
        };
    }
    return dataByApi;
});

