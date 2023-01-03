import React from 'react';
import { Props } from './__types__';


export const SuccessCircleSvg: React.FunctionComponent<Props> = ({ size = { w: 14, h: 14 }, onClick }) => {
    const { h, w } = size;

    return (
        <button className='constant--svg' style={{ width: w, height: h }} onClick={onClick}>
            <svg width={w} height={w} viewBox='0 0 14 14' fill='none'
                 xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C13.9958 10.8642 10.8642 13.9958 7 14ZM6.9888 12.6H7C10.0917 12.5969 12.5959 10.0889 12.5944 6.9972C12.5929 3.9055 10.0861 1.4 6.9944 1.4C3.9027 1.4 1.39595 3.9055 1.3944 6.9972C1.39285 10.0889 3.8971 12.5969 6.9888 12.6ZM5.6 10.5L2.8 7.7L3.787 6.713L5.6 8.519L10.213 3.906L11.2 4.9L5.6 10.5Z'
                    fill='#818181' />
            </svg>
        </button>
    );
};