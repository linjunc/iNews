import { RightContentWrapper } from './style'
import logo from '../../../../assets/logo/logo.png'
import { Button, List } from 'antd'
import { useNavigate } from 'react-router'
import CenterLine from '../../../detail/components/CenterLine'
const RightContent = ({ hotArr }) => {
  const isLogin = localStorage.getItem('token') ? true : false
  const navigate = useNavigate()
  const toLogin = () => {
    navigate(`/login`)
  }

  const toDetail = (data) => {
    //跳转详情
    navigate(`/detail/${data.article_id}`) // id
  }

  const toUser = () => {
    //跳转主页
    navigate(`/user/${userInfo.user_id}`)
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const showSvg = (article) => {
    if (article.read_count > 200)
      return (
        <img
          alt=""
          style={{ marginLeft: '5px' }}
          src="https://lf3-cdn2-tos.bytescm.com/toutiao/toutiao_web_pc/svgs/hot.92a15c5e.svg"
        />
      )
    if (Date.now() - article.publish_time * 1000 <= 2000000000)
      return (
        <img
          alt=""
          style={{ marginLeft: '5px' }}
          src="https://lf3-cdn2-tos.bytescm.com/toutiao/toutiao_web_pc/svgs/new.b7973b24.svg"
        />
      )
  }
  const showInfo = () => {
    if (!isLogin)
      return (
        <div className="info">
          <img className="logo" src={logo} alt="" />
          <div className="wrapper">
            <div className="title">
              <p>登录iNews后</p>
              <p>内容更有趣</p>
            </div>
            <div className="btnWrapper">
              <Button onClick={toLogin} className="loginBtn" type="primary">
                立即登录
              </Button>
            </div>
          </div>
        </div>
      )
    return (
      <div className="info">
        <img className="logo" src={logo} alt="" />
        <div onClick={toUser} className="wrapper">
          <div className="avatar">
            <img className="avatarImg" src={userInfo.avatar} alt="" />
          </div>
          <div className="nickname">
            {userInfo.nickname || '用户1234567890'}
          </div>
        </div>
      </div>
    )
  }
  return (
    <RightContentWrapper>
      <div className="right_content">
        {showInfo()}
        <div className="hot_rank">
          <CenterLine title="热门榜单" />
          <List
            dataSource={hotArr.slice(0, 6)}
            renderItem={(item, index) => (
              <List.Item
                style={{ justifyContent: 'left' }}
                key={item.article_id}
              >
                <span ranknum={index} className="rank">
                  {index + 1}
                </span>
                <h4
                  onClick={() => {
                    toDetail(item)
                  }}
                  className="title"
                >
                  {item.title}
                  {showSvg(item)}
                </h4>
              </List.Item>
            )}
          />
        </div>
      </div>
    </RightContentWrapper>
  )
}
export default RightContent
