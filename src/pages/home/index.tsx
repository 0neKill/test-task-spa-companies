import React, { useEffect } from 'react';

import './home.style.scss';

import { FactoryTable } from '../../components';
import { useDispatchedActions, useQuery } from '../../helpers/hooks';
import { Mode } from '../../__types__';
import { TableData } from '../../store/slices/api';
import { SelectAll } from '../../components/table/table';

export const Home: React.FunctionComponent = React.memo(() => {
    const { data, performance } = useQuery();
    const { resetDataByEntryPoint, addItem, deleteItems } = useDispatchedActions();
    const [currentItem, setCurrentItem] = React.useState<TableData | null>(null);
    console.log(currentItem);

    React.useEffect(() => {
        performance({ entryPoint: Mode.COMPANIES });
    }, [performance]);

    React.useEffect(() => {
        console.log('tyt');
        if (currentItem) {
            performance({ entryPoint: Mode.EMPLOYEES, id: currentItem.id });
        }
    }, [currentItem]);

    const handlerOnGetCurrentItem = React.useCallback((item: TableData | null) => {
        setCurrentItem(item);
        resetDataByEntryPoint({ entryPoint: Mode.EMPLOYEES });
    }, [setCurrentItem, resetDataByEntryPoint]);

    const handlerOnSuccess = React.useCallback((item: TableData, mode: Mode) => {
        addItem({ entryPoint: mode, item: item });
    }, []);

    const handlerOnDelete = (items: SelectAll, mode: Mode) => {

        deleteItems({ entryPoint: mode, items: items });

    };

    return (

        <section className='home'>
            <div className='container home-container'>
                {
                    !data.companies.data || data.companies.isLoading ? <div>Loading...</div> : (
                        <>
                            <div className='home__title'>
                                <h1 className='title'>SPA приложение <br />«Список компаний»</h1>
                                <h2 className='subtitle'>(react+redux/redux-toolkit)</h2>
                            </div>
                            <FactoryTable.CreateCompanies
                                handlerOnSuccess={handlerOnSuccess}
                                handlerOnDelete={handlerOnDelete}
                                handlerOnGetCurrentItem={handlerOnGetCurrentItem}
                                data={data.companies.data} />
                            {
                                currentItem ? (!data.employees.data || data.employees.isLoading ? null :
                                        <FactoryTable.CreateEmployees
                                            handlerOnDelete={handlerOnDelete}
                                            handlerOnSuccess={handlerOnSuccess}
                                            data={data.employees.data} />
                                ) : null
                            }
                        </>
                    )
                }
            </div>
        </section>
    );
});

