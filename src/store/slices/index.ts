import apiSliceReducers, { InitialStateApi } from './api';
import { combineReducers } from '@reduxjs/toolkit';

export interface RootReducers {
    api: InitialStateApi,
}

export const rootReducers = combineReducers<RootReducers>({
    api: apiSliceReducers,
});