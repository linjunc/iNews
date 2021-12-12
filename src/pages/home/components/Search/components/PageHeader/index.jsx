import { PageHeaderWrapper } from './style'

const PageHeader = () => {
  return (
    <PageHeaderWrapper>
      <div className="page-header">
        <div className="left-box">
          <div>关于</div>
        </div>
        <div className="right-box">
          <div>天气</div>
          <div>登录</div>
        </div>
      </div>
    </PageHeaderWrapper>
  )
}

export default PageHeader
