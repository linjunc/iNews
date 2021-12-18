import { PageHeaderWrapper } from './style'
import Weather from '../Weather'
import { Popover } from 'antd'
import Avatar from '../../../../../../components/Avatar'

const PageHeader = () => {
  return (
    <PageHeaderWrapper>
      <div className="page-header">
        <div className="left-box">
          <div>关于</div>
        </div>
        <div className="right-box">
          <Popover content={<Weather />} color="rgba(255, 255, 255, 0.9)">
            天气
          </Popover>
          <Avatar color="rgba(255, 255, 255, 0.9)"></Avatar>
        </div>
      </div>
    </PageHeaderWrapper>
  )
}

export default PageHeader
