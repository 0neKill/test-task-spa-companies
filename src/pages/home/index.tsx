import React from 'react';

import './home.style.scss';

import {FactoryTable, SelectAll, TableData, TableDataVector} from '../../components';
import {getCurrentItemCompany, useDispatchedActions, useQuery, useTypedSelector} from '../../helpers';

import {EntryPoint} from '../../__types__';

export const Home: React.FunctionComponent = React.memo(() => {
    const {data, performance} = useQuery();
    const currentItem = useTypedSelector(getCurrentItemCompany);
    const {addItemTo, changeItemTo, deleteItemsTo, setCurrentItem} = useDispatchedActions();

    React.useEffect(() => {
        performance({entryPoint: EntryPoint.COMPANIES});
    }, [performance]);

    const handlerOnGetCurrentItem = React.useCallback((itemId: string | null) => {
        setCurrentItem({entryPoint: EntryPoint.COMPANIES, itemId});
    }, [setCurrentItem]);


    const handlerOnSuccess = React.useCallback((item: TableData, isNew: boolean, deep?: boolean) => {
        if (isNew) {
            addItemTo({entryPoint: EntryPoint.COMPANIES, item: item, deep});
        } else {
            changeItemTo({entryPoint: EntryPoint.COMPANIES, item: item, deep});
        }
    }, [addItemTo, changeItemTo]);

    const handlerOnDelete = React.useCallback((items: SelectAll, deep?: boolean) => {
        deleteItemsTo({entryPoint: EntryPoint.COMPANIES, items: items, deep});
    }, [deleteItemsTo]);

    return (
        <section className='home'>
            <div className='container home-container'>
                <div className='home__title'>
                    <h1 className='title'>SPA приложение <br/>«Список компаний»</h1>
                    <h2 className='subtitle'>(react+redux/redux-toolkit)</h2>
                </div>
                <FactoryTable.CreateCompanies
                    handlerOnSuccess={handlerOnSuccess}
                    handlerOnDelete={handlerOnDelete}
                    handlerOnGetCurrentItem={handlerOnGetCurrentItem}
                    isLoading={data[EntryPoint.COMPANIES].isLoading}
                    errorMessage={data[EntryPoint.COMPANIES].error}
                    data={data[EntryPoint.COMPANIES].data as TableDataVector}/>
                {
                    currentItem && (
                        <FactoryTable.CreateEmployees
                            handlerOnDelete={handlerOnDelete}
                            handlerOnSuccess={handlerOnSuccess}
                            data={currentItem.employees}/>
                    )
                }
            </div>
        </section>
    );
});


