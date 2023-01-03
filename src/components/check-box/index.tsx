import React from 'react';
import clsx from 'clsx';

import './check-box.style.scss';

interface Props {
    id: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isChecked: boolean,
    className?: string,
    isDisabled?: boolean
}

export const CheckBox: React.FunctionComponent<Props> = React.memo(({
                                                                        id,
                                                                        className,
                                                                        onChange,
                                                                        isChecked,
                                                                        isDisabled,
                                                                    }) => {
    return (
        <span className={clsx('check-box', className)}>
            <input id={`check-box-${id}`} type='checkbox' onChange={onChange} checked={isChecked}
                   disabled={isDisabled} />
            <label htmlFor={`check-box-${id}`}></label>
        </span>
    );
});