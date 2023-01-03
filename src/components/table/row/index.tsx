import React from 'react';
import { CheckBox } from '../../check-box';
import { CancelCircleSvg, PanEditSvg, SuccessCircleSvg, TrashSvg } from '../../../constants';
import type { Mode } from '../../../__types__';
import clsx from 'clsx';
import { TableData } from '../../../store/slices/api';

interface Props {
    mode: Mode,
    itemData: TableData,
    handlerOnSelect: (item: TableData) => void,
    handlerOnSetEditItem: (item: TableData, isCancel: boolean) => void,
    handlerOnChangeEditItem: (field: 'first' | 'second' | 'third') => (e: React.ChangeEvent<HTMLInputElement>) => void,
    handlerOnSuccess: (item: TableData) => void,
    handlerOnDelete: (item: TableData) => void,
    isSelect: boolean,
    isEdit: boolean,
    isDisabled: boolean,
}


export const TableRow: React.FunctionComponent<Props> = React.memo(({
                                                                        mode,
                                                                        isEdit,
                                                                        isDisabled,
                                                                        handlerOnSelect,
                                                                        handlerOnSetEditItem,
                                                                        handlerOnChangeEditItem,
                                                                        handlerOnSuccess,
                                                                        handlerOnDelete,
                                                                        isSelect,
                                                                        itemData,
                                                                    }) => {
    return (
        <tr className={clsx('table__row', 'table-body__row', `mode--${mode}`, { select: isSelect && !isDisabled }, { select: isEdit })}
            tabIndex={0}>
            <td className={`table-body__column checkbox`}>
                <CheckBox id={`body-checkbox-${mode}-${itemData.id}`} isChecked={isSelect}
                          isDisabled={isDisabled || isEdit}
                          onChange={handlerOnSelect.bind(this, itemData)} />
            </td>
            <td className={`table-body__column one`}>
                <input className='column__title' type='text' value={itemData.first} disabled={!isEdit}
                       onChange={handlerOnChangeEditItem('first')} />
            </td>
            <td className={`table-body__column two`}>
                <input className='column__title' type='text' value={itemData.second} disabled={!isEdit}
                       onChange={handlerOnChangeEditItem('second')} />
            </td>
            <td className={`table-body__column three`}>
                <input className='column__title' type='text' value={itemData.third} disabled={!isEdit}
                       onChange={handlerOnChangeEditItem('third')} />
            </td>
            <td className='table-body__row--footer'>
                {
                    !isEdit ?
                        ((!isSelect && !isDisabled) && <>
                            <PanEditSvg onClick={handlerOnSetEditItem.bind(this, itemData, false)} />
                            <TrashSvg size={{ w: 13, h: 14 }} onClick={handlerOnDelete.bind(this, itemData)} />
                        </>) :
                        (
                            <>
                                <SuccessCircleSvg onClick={handlerOnSuccess.bind(this, itemData)} />
                                <CancelCircleSvg onClick={handlerOnSetEditItem.bind(this, itemData, true)} />
                            </>
                        )
                }
            </td>
        </tr>
    );
});