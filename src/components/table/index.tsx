import React from 'react';

import './table.style.scss';

import { Table } from './table';
import { TableHeadCompanies, TableHeadEmployees, type ITableHead } from '../../constants';

import { TableMode } from '../../__types__';

export interface TableData {
    id: string,
    first: string,
    second: string,
    third: string
}

export interface SelectAll {
    [keys: string]: TableData,
}

export interface Props {
    mode: TableMode,
    data: TableDataVector,
    fixtureHead: ITableHead[],
    handlerOnSuccess: (item: TableData, isNew: boolean, deep?: boolean) => void,
    handlerOnDelete: (item: SelectAll, deep?: boolean) => void,
    handlerOnGetCurrentItem?: (itemId: string | null) => void,
    isLoading?: boolean,
    errorMessage?: string,
    className?: string,
    height: number,
}

export type TableDataVector = TableData[];

type FactoryTableFun<T> = (props: Omit<T, 'data'> & { data: TableDataVector }) => React.ReactElement;


type FactoryTableProps<T extends Partial<Props>> = {
    CreateCompanies: FactoryTableFun<T>,
    CreateEmployees: FactoryTableFun<T>,
}


export const FactoryTable: FactoryTableProps<Omit<Props, 'mode' | 'fixtureHead' | 'height'>> = ({
    CreateCompanies: (props) => <Table {...props} height={450} mode={TableMode.COMPANIES}
                                       fixtureHead={TableHeadCompanies} />,
    CreateEmployees: (props) => <Table {...props}
                                       height={550}
                                       handlerOnDelete={(selectAll) => props.handlerOnDelete(selectAll, true)}
                                       handlerOnSuccess={(tableData, isNew) => props.handlerOnSuccess(tableData, isNew, true)}
                                       mode={TableMode.EMPLOYEES}
                                       fixtureHead={TableHeadEmployees} />,
});
