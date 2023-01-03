import React from 'react';
import clsx from 'clsx';

import type { Props } from '../index';

import { TrashSvg } from '../../../constants';
import { Button } from '../../button';
import { CheckBox } from '../../check-box';
import { TableRow } from '../row';
import { TableData } from '../../../store/slices/api';

export interface SelectAll {
    [keys: string]: TableData,
}

export const Table: React.FunctionComponent<Props> = ({
                                                          data,
                                                          handlerOnGetCurrentItem,
                                                          mode,
                                                          className,
                                                          fixtureHead, handlerOnSuccess,
                                                          handlerOnDelete,
                                                      }) => {
    const [selectItems, setSelectItems] = React.useState<SelectAll>({});
    const [isSelectAll, setIsSelectAll] = React.useState<boolean>(false);
    const [currentSelect, setCurrentSelect] = React.useState<TableData | null>(null);
    const [editItem, setEditItem] = React.useState<TableData | null>(null);

    const selectItemsLength = React.useMemo(() => Object.keys(selectItems).length, [selectItems]);

    React.useEffect(() => {
        if (selectItemsLength === 1) {
            handlerOnGetCurrentItem && handlerOnGetCurrentItem(currentSelect);
        } else {
            handlerOnGetCurrentItem && handlerOnGetCurrentItem(null);
        }
    }, [selectItemsLength, handlerOnGetCurrentItem, currentSelect]);

    React.useEffect(() => {
        if (data?.length === selectItemsLength && selectItemsLength !== 0) {
            setIsSelectAll(true);
        } else {
            setIsSelectAll(false);
        }
    }, [data, selectItemsLength, setIsSelectAll]);

    const handlerOnSelectAll = React.useCallback(() => {
        let _selectAll = {};
        if (!isSelectAll) {
            _selectAll = data?.reduce((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, {} as SelectAll);
        }
        setSelectItems(_selectAll);
    }, [data, setSelectItems, isSelectAll]);

    const handlerOnSetEditItem = React.useCallback((item: TableData, isCancel: boolean) => {
        setEditItem(!isCancel ? item : null);
    }, []);

    const handlerOnChangeEditItem = (field: 'first' | 'second' | 'third') => React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEditItem((prevState: any) => ({ ...prevState, [field]: value }));
    }, []);

    const onSuccess = React.useCallback((item: TableData) => {
        setEditItem(null);
        handlerOnSuccess(item, mode);
    }, [setEditItem, handlerOnSuccess, mode]);

    const onDelete = React.useCallback((item?: TableData) => {
        if (item) {
            handlerOnDelete({ [item.id]: item }, mode);
        } else {
            setCurrentSelect(null);
            setSelectItems({});
            handlerOnDelete(selectItems, mode);
        }
    }, [selectItems, mode, handlerOnDelete, setCurrentSelect]);


    const handlerOnSelect = React.useCallback((item: TableData) => {

        setCurrentSelect(item);
        if (selectItems[item.id]) {
            setSelectItems(prevState => {
                const copyPrevState = { ...prevState };
                delete copyPrevState[item.id];
                return copyPrevState;
            });
        } else {
            setSelectItems(prevState => ({ ...prevState, [item.id]: item }));
        }
    }, [selectItems, setSelectItems, selectItemsLength, handlerOnSelectAll, setCurrentSelect]);

    const headerColumns = React.useMemo(() => fixtureHead.map(item => (
        <th key={item.id} className={`table-head__column ${item.className}`}>
            <span className='column__title'>{item.name}</span>
        </th>
    )), [fixtureHead]);

    const tableRows = React.useMemo(() => data.map((item) => {
        return <TableRow key={item.id}
                         handlerOnDelete={onDelete}
                         handlerOnChangeEditItem={handlerOnChangeEditItem}
                         handlerOnSuccess={onSuccess}
                         handlerOnSetEditItem={handlerOnSetEditItem}
                         isDisabled={editItem ? editItem?.id !== item.id : false}
                         isEdit={editItem?.id === item.id}
                         handlerOnSelect={handlerOnSelect}
                         mode={mode}
                         isSelect={!!selectItems[item.id]}
                         itemData={editItem?.id === item.id ? editItem : item} />;
    }), [data, mode, selectItems, handlerOnSelect, editItem, handlerOnSetEditItem, handlerOnChangeEditItem, onSuccess, onDelete]);

    return (
        <div className={clsx('table', className, mode)}>
            <div className='table__header'>
                {!!selectItemsLength && <TrashSvg onClick={() => onDelete()} />}
                <Button className='table__btn'>Add</Button>
            </div>
            <table className='table__wrapper'>
                <thead className='table-head'>
                <tr className={`table__row table-head__row mode--${mode}`}>
                    <th className={`table-head__column checkbox`}>
                        <CheckBox id={`header-checkbox-${mode}`} isChecked={isSelectAll}
                                  isDisabled={!!editItem}
                                  onChange={handlerOnSelectAll} />
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