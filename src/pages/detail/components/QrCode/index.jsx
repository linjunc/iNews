import React, { useMemo } from 'react';
import QRCode from 'qrcode.react';
import LoveButton from '../../../../components/LoveButton';

const QrCode = () => {
    // 获取当前路径 url
    const href = useMemo(() => {
        return window.location.href
    },[])

    return (
        <LoveButton
            key="share"
            content={<QRCode size={100} value={href} />}
            type={5}
        />
    );
};

export default QrCode;