import React from 'react';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';

import { TrashSvg } from '../../../constants';
import { CheckBox } from '../../check-box';
import { Button } from '../../button';
import { TableRow } from '../row';

import type { Props, SelectAll, TableData, TableDataVector } from '../index';


export const Table: React.FunctionComponent<Props> = ({
                                                          data,
                                                          isLoading,
                                                          errorMessage,
                                                          handlerOnGetCurrentItem,
                                                          mode,
                                                          className,
                                                          fixtureHead,
                                                          handlerOnSuccess,
                                                          handlerOnDelete,
                                                          height,
                                                      }) => {
    const [tableData, setTableData] = React.useState<TableDataVector>(() => data);
    const [selectItems, setSelectItems] = React.useState<SelectAll>({});
    const [isSelectAll, setIsSelectAll] = React.useState<boolean>(false);
    const [editItem, setEditItem] = React.useState<TableData | null>(null);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 1,
    });
    const [offset, setOffset] = React.useState<number>(Math.floor(height / 50) + 1);

    let newCreateItem = React.useRef<TableData | null>(null) as React.MutableRefObject<TableData | null>;
    const selectItemsLength = React.useMemo(() => Object.keys(selectItems).length, [selectItems]);

    const handlerOnAddNewItem = React.useCallback(() => {
        const newItem = { id: Date.now().toString(), first: '', second: '', third: '' };
        setTableData(prevState => [newItem, ...prevState]);
        setEditItem(newItem);
        newCreateItem.current = newItem;
    }, [setTableData, setEditItem, newCreateItem]);

    React.useEffect(() => {
        setTableData(data);
    }, [data]);

    React.useEffect(() => {
        if (inView) {
            setOffset(prevState => prevState + Math.floor(height / 50) + 1);
        }
    }, [height, inView]);

    React.useEffect(() => {
        if (selectItemsLength === 1) {
            handlerOnGetCurrentItem && handlerOnGetCurrentItem(Object.values(selectItems)[0].id);
        } else {
            handlerOnGetCurrentItem && handlerOnGetCurrentItem(null);
        }
    }, [selectItemsLength, handlerOnGetCurrentItem, selectItems]);

    React.useEffect(() => {
        if (tableData.length === selectItemsLength && selectItemsLength !== 0) {
            setIsSelectAll(true);
        } else {
            setIsSelectAll(false);
        }
    }, [selectItemsLength, tableData]);

    const handlerOnSelectAll = React.useCallback(() => {
        let _selectAll = {};
        if (!isSelectAll) {
            _selectAll = tableData.reduce((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, {} as SelectAll);
        }
        setSelectItems(_selectAll);
    }, [isSelectAll, tableData]);

    const handlerOnSetEditItem = React.useCallback((item: TableData, isCancel: boolean) => {
        if (isCancel) {
            setEditItem(null);
            newCreateItem.current && newCreateItem.current.id === item.id && setTableData(prevState => prevState?.filter(_ => _.id !== item.id));
            newCreateItem.current = null;
        } else {
            setEditItem(item);
        }
    }, []);

    const handlerOnChangeEditItem = React.useCallback((field: 'first' | 'second' | 'third') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEditItem((prevState: unknown) => ({ ...prevState as TableData, [field]: value }));
    }, []);

    const onSuccess = React.useCallback(() => {
        setEditItem(null);
        const isNew = editItem?.id === newCreateItem.current?.id;
        handlerOnSuccess(editItem!, isNew);
        newCreateItem.current && (newCreateItem.current = null);
    }, [handlerOnSuccess, editItem]);

    const onDelete = React.useCallback((item?: TableData) => {
        if (item) {
            handlerOnDelete({ [item.id]: item });
        } else {
            setSelectItems({});
            handlerOnDelete(selectItems);
        }
    }, [handlerOnDelete, selectItems]);


    const handlerOnSelect = React.useCallback((item: TableData) => {
        if (selectItems[item.id]) {
            setSelectItems(prevState => {
                const copyPrevState = { ...prevState };
                delete copyPrevState[item.id];
                return copyPrevState;
            });
        } else {
            setSelectItems(prevState => ({ ...prevState, [item.id]: item }));
        }
    }, [selectItems]);

    const headerColumns = React.useMemo(() => fixtureHead.map(item => (
        <th key={item.id} className={`table-head__column ${item.className}`}>
            <span className='column__title'>{item.name}</span>
        </th>
    )), [fixtureHead]);

    const tableRows = React.useMemo(() => tableData.slice(0, offset).map((item, index, array) => {

        return <TableRow key={item.id}
                         lastRowRef={index === array.length - 1 ? ref : undefined}
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

    }), [ref, offset, editItem, handlerOnChangeEditItem, handlerOnSelect, handlerOnSetEditItem, mode, onDelete, onSuccess, selectItems, tableData]);


    return (
        <div className={clsx('table', className, mode)}>
            {
                errorMessage ? <div>{errorMessage}</div> :
                    isLoading ? <div>Loading...</div> :
                        <>
                            <div className='table__header'>
                                {!!selectItemsLength && <TrashSvg onClick={() => onDelete()} />}
                                <Button className='table__btn' onClick={handlerOnAddNewItem}
                                        disabled={!!editItem}>Add</Button>
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
                                <tbody className='table-body' style={{ height }}>
                                {
                                    !!tableData.length ? tableRows : <tr>
                                        <td>Список пуст...</td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </>
            }
        </div>
    );
};
