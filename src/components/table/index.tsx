import React from 'react';

import './table.style.scss';

import { Mode } from '../../__types__';

import { Table } from './table';
import { TableHeadCompanies, TableHeadEmployees, type ITableHead } from '../../constants';
import { TableDataVector } from '../../store/slices/api';

export interface Props {
    data: TableDataVector,
    className?: string,
    mode: Mode,
    fixtureHead: ITableHead[]
}

type FactoryTableFun<T> = (props: Omit<T, 'data'> & { data: TableDataVector }) => React.ReactElement;


type FactoryTableProps<T extends Partial<Props>> = {
    CreateCompanies: FactoryTableFun<T>,
    CreateEmployees: FactoryTableFun<T>,
}


export const FactoryTable: FactoryTableProps<Omit<Props, 'mode' | 'fixtureHead'>> = ({
    CreateCompanies: (props) => <Table {...props} mode={Mode.COMPANIES} fixtureHead={TableHeadCompanies} />,
    CreateEmployees: (props) => <Table {...props} mode={Mode.EMPLOYEES} fixtureHead={TableHeadEmployees} />,
});