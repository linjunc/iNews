import React from 'react';
import LoveButton from '../../../../components/LoveButton';

const SpeakArticle = ({ isSpeak, handleSpeak }) => {
    // 语音播放
    return (
        <LoveButton
            handleClick={handleSpeak}
            done={isSpeak}
            key="speak"
            content={isSpeak ? '关闭' : "开启语音播放"}
            type={6}
        />
    );
};

export default SpeakArticle;