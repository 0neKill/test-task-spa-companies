import React from 'react';
import clsx from 'clsx';

import './button.style.scss';

type Props = React.PropsWithChildren<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>

export const Button: React.FunctionComponent<Props> = React.memo((props) => {
    return <button {...props} className={clsx('btn', props.className)}>{props.children}</button>;
});