import { GlobalStyle } from "./style.js";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import './App.css';
import routes from "./router";

function App() {
  const element = useRoutes(routes)
  return element
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
      <GlobalStyle />
    </Router>
  )
}
export default AppWrapper;
