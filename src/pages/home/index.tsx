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
                    data={[{ id: '1', name: 'Apple', total_count: 20, address: '8124 Allama Circle Fleetwood' }]} />
                <FactoryTable.CreateEmployees
                    data={[{ id: '1', firstname: 'Иван', surname: 'Петров', position: 'Директор' }]} />
            </div>
        </section>
    );
};