import { useDispatch } from 'react-redux';
import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { action } from '../../store';

export const useDispatchedActions = () => {
    const dispatch = useDispatch();
    return React.useMemo(() => {
        return bindActionCreators(action, dispatch);
    }, [dispatch]);
};