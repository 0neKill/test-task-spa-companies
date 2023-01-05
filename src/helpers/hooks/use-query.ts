import React from 'react';

import { useDispatchedActions } from './use-dispatched';
import { useTypedSelector } from './use-typed-selector';
import { getDataByEntrypoint } from '../selectors';

import type { ThunkArg } from '../../store/thunks';

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
