import React from 'react';
import { HotLine } from './style';

const CenterLine = ({ title }) => {
    /* 虚线 */
    return (
        <HotLine>
            <span>{title}</span>
        </HotLine>
    );
};

export default CenterLine;