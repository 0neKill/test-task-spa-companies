import React from 'react';

import './home.style.scss';

import { FactoryTable } from '../../components';

export const Home: React.FunctionComponent = () => {
    return (
        <section className='home'>
            <div className='container home-container'>
                <div className='home__title'>
                    <h1 className='title'>SPA приложение <br />«Список компаний»</h1>
                    <h2 className='subtitle'>(react+redux/redux-toolkit)</h2>
                </div>
                <FactoryTable.CreateCompanies
                    data={[{ id: '1', first: 'Apple', second: '20', third: '8124 Allama Circle Fleetwood' }]} />
                <FactoryTable.CreateEmployees
                    data={[{ id: '1', second: 'Иван', first: 'Петров', third: 'Директор' }]} />
            </div>
        </section>
    );
};