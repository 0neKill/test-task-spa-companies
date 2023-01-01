import React from 'react';

import './table.style.scss';

import { Mode, type Company, Employee } from '../../__types__';

import { Table } from './table';
import { TableHeadCompanies, TableHeadEmployees, type ITableHead } from '../../constants';

export interface Props {
    data: Company[] | Employee[],
    className?: string,
    mode: Mode,
    fixtureHead: ITableHead[]
}


type FactoryTableProps<T extends Partial<Props>> = {
    CreateCompanies: (props: Omit<T, 'data'> & { data: Company[] }) => React.ReactElement,
    CreateEmployees: (props: Omit<T, 'data'> & { data: Employee[] }) => React.ReactElement,
}


export const FactoryTable: FactoryTableProps<Omit<Props, 'mode' | 'fixtureHead'>> = ({
    CreateCompanies: (props) => <Table {...props} mode={Mode.COMPANIES} fixtureHead={TableHeadCompanies} />,
    CreateEmployees: (props) => <Table {...props} mode={Mode.EMPLOYEES} fixtureHead={TableHeadEmployees} />,
});