import React from 'react';

import './table.style.scss';

import { Mode } from '../../__types__';

import { SelectAll, Table } from './table';
import { TableHeadCompanies, TableHeadEmployees, type ITableHead } from '../../constants';
import { TableData, TableDataVector } from '../../store/slices/api';

export interface Props {
    data: TableDataVectorNonNull,
    handlerOnGetCurrentItem?: (item: TableData | null) => void,
    className?: string,
    mode: Mode,
    fixtureHead: ITableHead[],
    handlerOnSuccess: (item: TableData, mode: Mode) => void,
    handlerOnDelete: (item: SelectAll, mode: Mode) => void,
}

export type TableDataVectorNonNull = NonNullable<TableDataVector>;

type FactoryTableFun<T> = (props: Omit<T, 'data'> & { data: TableDataVectorNonNull }) => React.ReactElement;


type FactoryTableProps<T extends Partial<Props>> = {
    CreateCompanies: FactoryTableFun<T>,
    CreateEmployees: FactoryTableFun<T>,
}


export const FactoryTable: FactoryTableProps<Omit<Props, 'mode' | 'fixtureHead'>> = ({
    CreateCompanies: (props) => <Table {...props} mode={Mode.COMPANIES} fixtureHead={TableHeadCompanies} />,
    CreateEmployees: (props) => <Table {...props} mode={Mode.EMPLOYEES} fixtureHead={TableHeadEmployees} />,
});