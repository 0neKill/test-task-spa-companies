import { createSelector } from '@reduxjs/toolkit';

import { TableData } from '../../components';
import { EntryPoint } from '../../__types__';

import type { RootReducers } from '../../store/slices';


const getCurrentItemData = (state: RootReducers) => state.api.dataByApi[EntryPoint.COMPANIES].currentItem;
export const getCurrentItemCompany = createSelector(getCurrentItemData, (currentItem) => {
    if (currentItem) {
        const employees = currentItem.employees.map<TableData>(employee => {
            return {
                id: employee.id,
                first: employee.surname,
                second: employee.firstname,
                third: employee.position,
            };
        });
        return {
            ...currentItem,
            employees,
        };
    }
    return currentItem;
});
