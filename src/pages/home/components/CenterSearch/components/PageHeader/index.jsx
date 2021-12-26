import { PageHeaderWrapper } from './style'
import Weather from '../Weather'
import About from '../About'
import Avatar from '../../../../../../components/Avatar'

const PageHeader = () => {
  return (
    <PageHeaderWrapper>
      <div className="page-header">
        <div className="left-box">
          <About></About>
        </div>
        <div className="right-box">
          <Weather></Weather>
          <Avatar color="rgba(255, 255, 255, 0.9)"></Avatar>
        </div>
      </div>
    </PageHeaderWrapper>
  )
}

export default PageHeader
