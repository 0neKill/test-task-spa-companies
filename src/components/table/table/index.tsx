import React from 'react';
import clsx from 'clsx';

import type { Props } from '../index';

import { TrashSvg } from '../../../constants';
import { Button } from '../../button';
import { CheckBox } from '../../check-box';
import { TableRow } from '../row';

export const Table: React.FunctionComponent<Props> = ({ data, mode, className, fixtureHead }) => {

    const headerColumns = React.useMemo(() => fixtureHead.map(item => (
        <th key={item.id} className={`table-head__column ${item.className}`}>
            <span className='column__title'>{item.name}</span>
        </th>
    )), [fixtureHead]);

    const tableRows = React.useMemo(() => data.map((item) => {
        if ('firstname' in item) {
            return <TableRow key={item.id} id={item.id} mode={mode}
                             itemData={{ first: item.surname, second: item.firstname, three: item.position }} />;
        }
        return <TableRow key={item.id} id={item.id} mode={mode}
                         itemData={{ first: item.name, second: item.total_count, three: item.address }} />;
    }), [data, mode]);

    return (
        <div className={clsx('table', className, mode)}>
            <div className='table__header'>
                <TrashSvg />
                <Button className='table__btn'>Add</Button>
            </div>
            <table className='table__wrapper'>
                <thead className='table-head'>
                <tr className={`table__row table-head__row mode--${mode}`}>
                    <th className={`table-head__column checkbox`}>
                        <CheckBox id={`header-checkbox-${mode}`} />
                    </th>
                    {headerColumns}
                </tr>
                </thead>
                <tbody className='table-body'>
                {
                    !!data.length ? tableRows : <tr>
                        <td>Список пуст...</td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    );
};