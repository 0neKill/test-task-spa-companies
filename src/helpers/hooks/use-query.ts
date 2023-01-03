import { useDispatchedActions } from './use-dispatched';
import React from 'react';
import { ThunkArg } from '../../store/thunks';
import { useTypedSelector } from './use-typed-selector';
import { getDataByEntrypoint } from '../selectors/api';


export const useQuery = () => {
    const { apiQueryThunk } = useDispatchedActions();
    const data = useTypedSelector(getDataByEntrypoint);

    const performance = React.useCallback((args: ThunkArg) => {
        apiQueryThunk(args);
    }, [apiQueryThunk]);

    return React.useMemo(() => {
        return {
            data,
            performance,
        };
    }, [data, performance]);

};