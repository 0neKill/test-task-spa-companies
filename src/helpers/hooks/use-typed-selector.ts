import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootReducers } from '../../store/slices';

export const useTypedSelector: TypedUseSelectorHook<RootReducers> = useSelector;
