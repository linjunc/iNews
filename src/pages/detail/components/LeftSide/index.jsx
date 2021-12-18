import React from 'react'
import { Slider } from 'antd'
import QrCode from '../QrCode'
import { SideWrapper } from './style'
import LoveButton from '../../../../components/LoveButton'

const LeftSide = ({
  numGroup,
  size,
  handleCollect,
  handleComment,
  handleLove,
  handleSize,
}) => {
  return (
    <SideWrapper>
      <div className="left-box">
        <div className="left-clear"></div>
        <div className="left-container">
          <LoveButton
            handleClick={handleLove}
            done={numGroup.loveDone}
            key="love"
            content="点赞"
            type={0}
            number={numGroup.loveNum}
          />
          <LoveButton
            handleClick={handleComment}
            key="comment"
            content="评论区"
            type={1}
            number={numGroup.commentNum}
          />
          <LoveButton
            handleClick={handleCollect}
            done={numGroup.collect}
            key="collect"
            content="收藏文章"
            type={2}
            number={numGroup.collectNum}
          />
          <QrCode />
          <div className="size-controller">
            <div className="controller-title">字体大小</div>
            <Slider
              onChange={handleSize}
              min={12}
              max={24}
              vertical
              value={size}
            />
          </div>
        </div>
      </div>
    </SideWrapper>
  )
}

export default LeftSide
