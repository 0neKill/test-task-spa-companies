import React from 'react';
import { Props } from './__types__';

export const PanEditSvg: React.FunctionComponent<Props> = ({ size = { w: 14, h: 14 }, onClick }) => {
    const { h, w } = size;

    return (
        <button className='constant--svg' style={{ width: w, height: h }} onClick={onClick}>
            <svg width={w} height={h} viewBox='0 0 14 14' fill='none'
                 xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M0.771262 14C0.555767 13.9996 0.350338 13.9087 0.205094 13.7495C0.0571725 13.5916 -0.0163304 13.378 0.00305578 13.1624L0.191266 11.0923L8.88583 2.39845L11.603 5.11557L2.91072 13.8087L0.841169 13.9969C0.817355 13.9992 0.79354 14 0.771262 14ZM12.1453 4.5723L9.42895 1.85518L11.0583 0.225366C11.2024 0.0810753 11.3979 0 11.6018 0C11.8057 0 12.0012 0.0810753 12.1453 0.225366L13.7747 1.85518C13.9189 1.99931 14 2.19489 14 2.39883C14 2.60278 13.9189 2.79836 13.7747 2.94249L12.1461 4.57153L12.1453 4.5723Z'
                    fill='#818181' />
            </svg>
        </button>
    );
};