import React from 'react';
import LoveButton from '../../../../components/LoveButton';

const BackToTop = () => {
    // 回到顶部 动画
    const handleTop = () => {
        let scrollTopTimer = setInterval(function () {
            let top = document.body.scrollTop || document.documentElement.scrollTop;
            let speed = top / 30;
            document.documentElement.scrollTop -= speed;
            if (top === 0) {
                clearInterval(scrollTopTimer);
            }
        }, 5);
    }
    return (
        <LoveButton
            handleClick={handleTop}
            key="top"
            content="回到顶部"
            type={4}
        />
    );
};

export default BackToTop;