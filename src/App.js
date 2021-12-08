import { GlobalStyle } from './style.js'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import './App.css'
import AfterModal from './components/AfterModal'
import routes from './router'
import { articleContext, userContext } from './models/context'
import { Article } from './models/reducer/article.js'
import { useEffect, useReducer, useRef } from 'react'
import { INIT_ARTICLE } from './models/constant.js'

function App() {
  const element = useRoutes(routes)
  return element
}

const AppWrapper = () => {
  const initRef = useRef([])
  const userRef = useRef({})
  const [article, dispatch] = useReducer(Article, [])
  useEffect(() => {
    // 获取本地的稍后再看数据
    initRef.current = JSON.parse(localStorage.getItem('articleLater')) ?? []
    dispatch({
      type: INIT_ARTICLE,
      articleData: initRef.current,
    })
    if (localStorage.getItem('token')) {
      userRef.current = JSON.parse(localStorage.getItem('token'))
    }
  }, [])
  return (
    <Router>
      {/* <userContext.Provider> */}
      <articleContext.Provider value={{ article, dispatch }}>
        <App />
        <AfterModal />
      </articleContext.Provider>
      {/* </userContext.Provider> */}

      <GlobalStyle />
    </Router>
  )
}
export default AppWrapper
