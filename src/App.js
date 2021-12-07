import { GlobalStyle } from "./style.js";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import './App.css';
import AfterModal from "./components/AfterModal";
import routes from "./router";
import { articleContext } from './models/context'
import { Article } from "./models/reducer/article.js";
import { useReducer } from "react";

function App() {
  const element = useRoutes(routes)
  return element
}

const AppWrapper = () => {
  const [article, dispatch] = useReducer(Article, [])
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
