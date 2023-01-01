import React from 'react';
import clsx from 'clsx';

import './check-box.style.scss';

interface Props {
    id: string,
    className?: string,
}

export const CheckBox: React.FunctionComponent<Props> = ({ id, className }) => {
    return (
        <span className={clsx('check-box', className)}>
            <input id={`check-box-${id}`} type='checkbox' />
            <label htmlFor={`check-box-${id}`}></label>
        </span>
    );
};