import { GlobalStyle } from "./style.js";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import './App.css';
import AfterModal from "./components/AfterModal";
import routes from "./router";
import { articleContext } from './models/context'
import { Article } from "./models/reducer/article.js";
import { useEffect, useReducer, useRef } from "react";
import { INIT_ARTICLE } from "./models/constant.js";

function App() {
  const element = useRoutes(routes)
  return element
}

const AppWrapper = () => { 
  const initRef = useRef([])
  const [article, dispatch] = useReducer(Article, [])
  useEffect(() => {
    initRef.current = JSON.parse(localStorage.getItem('articleLater')) ?? []
    dispatch({
      type: INIT_ARTICLE,
      articleData: initRef.current
    })
  }, [])
  return (
    <Router>
      <articleContext.Provider value={{ article, dispatch }} >
        <App />
        <AfterModal />
      </articleContext.Provider>
      <GlobalStyle />
    </Router>
  )
}
export default AppWrapper;
