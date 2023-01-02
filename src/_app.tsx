import React from 'react';
import { Provider } from 'react-redux';

import './index.scss';

import { Home } from './pages';
import { store } from './store';

export const App: React.FunctionComponent = () => {
    return (
        <Provider store={store}>
            <Home />
        </Provider>
    );
};
