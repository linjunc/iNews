import { PageHeaderWrapper } from './style'
import Weather from '../Weather'

const PageHeader = () => {
  return (
    <PageHeaderWrapper>
      <div className="page-header">
        <div className="left-box">
          <div>关于</div>
        </div>
        <div className="right-box">
          <Weather></Weather>
          <div>登录</div>
        </div>
      </div>
    </PageHeaderWrapper>
  )
}

export default PageHeader
