import { AboutContainer } from './style'
import { Popover } from 'antd'
import logoText from '../../../../../../assets/logo/logo_text.png'

const About = () => {
  const content = (
    <AboutContainer>
      <img src={logoText} alt="iNews" className="logo" />
      <div className="text">
        致力于打造一套用户体验好，阅读舒适的新闻阅读平台，同时帮助用户在平台中获取到最新的资讯，了解国家大事，关注疫情动态，做好个人防范。
      </div>
    </AboutContainer>
  )

  return (
    <Popover content={content} color="rgba(255, 255, 255, 0.9)">
      关于
    </Popover>
  )
}

export default About
