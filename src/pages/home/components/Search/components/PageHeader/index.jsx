import { PageHeaderWrapper } from './style'
import Weather from '../Weather'
import { Popover } from 'antd'

const PageHeader = () => {
  return (
    <PageHeaderWrapper>
      <div className="page-header">
        <div className="left-box">
          <div>关于</div>
        </div>
        <div className="right-box">
          <Popover content={<Weather />} color="rgba(255, 255, 255, 0.8)">
            天气
          </Popover>
          <div>登录</div>
        </div>
      </div>
    </PageHeaderWrapper>
  )
}

export default PageHeader
