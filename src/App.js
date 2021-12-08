import { GlobalStyle } from './style.js'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import './App.css'
import AfterModal from './components/AfterModal'
import routes from './router'
import { articleContext, userContext } from './models/context'
import { Article } from './models/reducer/article.js'
import { useEffect, useReducer, useRef } from 'react'
import { INIT_ARTICLE, INIT_INFO } from './models/constant.js'
import { UserInfo } from './models/reducer/userInfo.js'

function App() {
  const element = useRoutes(routes)
  return element
}

const AppWrapper = () => {
  const initRef = useRef([])
  const userRef = useRef(null)
  const [article, dispatch] = useReducer(Article, [])
  const [userInfo, userDispatch] = useReducer(UserInfo, null)
  useEffect(() => {
    // 获取本地的稍后再看数据
    initRef.current = JSON.parse(localStorage.getItem('articleLater')) ?? []
    dispatch({
      type: INIT_ARTICLE,
      articleData: initRef.current,
    })
    // 在 APP 里初始化，之后的修改都通过reducer触发
    // 在本地有 token 的时候，为用户登录，如果token已经失效，就不显示头像，这里采用静默处理
    if (localStorage.getItem('token')) {
      userRef.current = JSON.parse(localStorage.getItem('userInfo')) ?? {}
      userDispatch({
        type: INIT_INFO,
        userInfo: userRef.current,
      })
    }
  }, [])
  return (
    <Router>
      <userContext.Provider value={{ userInfo, userDispatch }}>
        <articleContext.Provider value={{ article, dispatch }}>
          <App />
          <AfterModal />
        </articleContext.Provider>
      </userContext.Provider>
      <GlobalStyle />
    </Router>
  )
}
export default AppWrapper
