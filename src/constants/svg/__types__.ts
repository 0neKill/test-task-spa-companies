import React from 'react';

export interface Props {
    size?: {
        w: number,
        h: number,
    };
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
}