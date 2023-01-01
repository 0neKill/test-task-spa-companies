import React from 'react';
import { CheckBox } from '../../check-box';
import { CancelCircleSvg, PanEditSvg, SuccessCircleSvg, TrashSvg } from '../../../constants';
import type { Mode } from '../../../__types__';
import clsx from 'clsx';

interface Props {
    mode: Mode,
    id: string,
    itemData: { first: string, second: string | number, three: string },
    isSelect?: boolean,
    isEdit?: boolean,
}


export const TableRow: React.FunctionComponent<Props> = ({ mode, id, isEdit = false, isSelect, itemData }) => {
    return (
        <tr className={clsx('table__row', 'table-body__row', `mode--${mode}`, { select: isSelect })} tabIndex={0}>
            <td className={`table-body__column checkbox`}>
                <CheckBox id={`body-checkbox-${mode}-${id}`} />
            </td>
            <td className={`table-body__column one`}>
                <input className='column__title' type='text' value={itemData.first} disabled={!isEdit} />
            </td>
            <td className={`table-body__column two`}>
                <input className='column__title' type='text' value={itemData.second} disabled={!isEdit} />
            </td>
            <td className={`table-body__column three`}>
                <input className='column__title' type='text' value={itemData.three}
                       disabled={!isEdit} />
            </td>
            <td className='table-body__row--footer'>
                {
                    !isEdit ?
                        (<>
                            <PanEditSvg />
                            <TrashSvg size={{ w: 13, h: 14 }} />
                        </>) :
                        (
                            <>
                                <SuccessCircleSvg />
                                <CancelCircleSvg />
                            </>
                        )
                }
            </td>
        </tr>
    );
};