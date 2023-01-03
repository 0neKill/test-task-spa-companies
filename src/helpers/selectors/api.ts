import { RootReducers } from '../../store/slices';
import { createSelector } from '@reduxjs/toolkit';

export const getDataByEntrypoint = createSelector((state: RootReducers) => state.api, (item) => {
    return item;
});



