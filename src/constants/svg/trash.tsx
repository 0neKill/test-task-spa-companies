import React from 'react';
import { Props } from './__types__';


export const TrashSvg: React.FunctionComponent<Props> = ({ size = { w: 14, h: 15 }, onClick }) => {
    const { h, w } = size;
    return (
        <button className='constant--svg' style={{ width: w, height: h }} onClick={onClick}>
            <svg width={w} height={h} viewBox='0 0 14 15' fill='none'
                 xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd' clipRule='evenodd'
                      d='M10.8889 2.36842V1.57895C10.8889 0.706919 10.1924 0 9.33333 0H4.66667C3.80756 0 3.11111 0.706919 3.11111 1.57895V2.36842H0.777778C0.348223 2.36842 0 2.72188 0 3.15789C0 3.59391 0.348223 3.94737 0.777778 3.94737H1.55556V12.6316C1.55556 13.9396 2.60022 15 3.88889 15H10.1111C11.3998 15 12.4444 13.9396 12.4444 12.6316V3.94737H13.2222C13.6518 3.94737 14 3.59391 14 3.15789C14 2.72188 13.6518 2.36842 13.2222 2.36842H10.8889ZM9.33333 1.57895H4.66667V2.36842H9.33333V1.57895ZM10.8889 3.94737H3.11111V12.6316C3.11111 13.0676 3.45933 13.4211 3.88889 13.4211H10.1111C10.5407 13.4211 10.8889 13.0676 10.8889 12.6316V3.94737Z'
                      fill='#818181' />
                <path d='M4.66667 5.52632H6.22222V11.8421H4.66667V5.52632Z' fill='#818181' />
                <path d='M7.77778 5.52632H9.33333V11.8421H7.77778V5.52632Z' fill='#818181' />
            </svg>
        </button>

    );
};