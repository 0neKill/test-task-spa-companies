import React from 'react';
import clsx from 'clsx';

import type { Props } from '../index';

import { TrashSvg } from '../../../constants';
import { Button } from '../../button';
import { CheckBox } from '../../check-box';
import { TableRow } from '../row';
import { TableData } from '../../../store/slices/api';
import { TableDataVectorNonNull } from '../index';

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
    const [tableData, setTableData] = React.useState<TableDataVectorNonNull>(() => data);
    const [selectItems, setSelectItems] = React.useState<SelectAll>({});
    const [isSelectAll, setIsSelectAll] = React.useState<boolean>(false);
    const [currentSelect, setCurrentSelect] = React.useState<TableData | null>(null);
    const [editItem, setEditItem] = React.useState<TableData | null>(null);

    let newCreateItem = React.useRef<TableData | null>(null) as React.MutableRefObject<TableData | null>;
    const selectItemsLength = React.useMemo(() => Object.keys(selectItems).length, [selectItems]);

    const handlerOnAddNewItem = () => {
        const newItem = { id: Date.now().toString(), first: '', second: '', third: '' };
        setTableData(prevState => [newItem, ...prevState]);
        setEditItem(newItem);
        newCreateItem.current = newItem;
    };

    React.useEffect(() => {
        setTableData(data);
    }, [data]);

    React.useEffect(() => {
        if (selectItemsLength === 1) {
            handlerOnGetCurrentItem && handlerOnGetCurrentItem(currentSelect);
        } else {
            handlerOnGetCurrentItem && handlerOnGetCurrentItem(null);
        }
    }, [selectItemsLength, handlerOnGetCurrentItem, currentSelect]);

    React.useEffect(() => {
        if (tableData?.length === selectItemsLength && selectItemsLength !== 0) {
            setIsSelectAll(true);
        } else {
            setIsSelectAll(false);
        }
    }, [tableData, selectItemsLength, setIsSelectAll]);

    const handlerOnSelectAll = React.useCallback(() => {
        let _selectAll = {};
        if (!isSelectAll) {
            _selectAll = tableData.reduce((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, {} as SelectAll);
        }
        setSelectItems(_selectAll);
    }, [tableData, setSelectItems, isSelectAll]);

    const handlerOnSetEditItem = React.useCallback((item: TableData, isCancel: boolean) => {
        if (isCancel) {
            setEditItem(null);
            newCreateItem.current && newCreateItem.current.id === item.id && setTableData(prevState => prevState?.filter(_ => _.id !== item.id));
            newCreateItem.current = null;
        } else {
            setEditItem(item);
        }

    }, [newCreateItem]);

    const handlerOnChangeEditItem = (field: 'first' | 'second' | 'third') => React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEditItem((prevState: unknown) => ({ ...prevState as TableData, [field]: value }));
    }, []);

    const onSuccess = React.useCallback((item: TableData) => {
        setEditItem(null);
        newCreateItem.current && (newCreateItem.current = null);
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

    const tableRows = React.useMemo(() => tableData.map((item) => {
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
    }), [tableData, mode, selectItems, handlerOnSelect, editItem, handlerOnSetEditItem, handlerOnChangeEditItem, onSuccess, onDelete]);

    return (
        <div className={clsx('table', className, mode)}>
            <div className='table__header'>
                {!!selectItemsLength && <TrashSvg onClick={() => onDelete()} />}
                <Button className='table__btn' onClick={handlerOnAddNewItem} disabled={!!editItem}>Add</Button>
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
                    !!tableData.length ? tableRows : <tr>
                        <td>Список пуст...</td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    );
};