import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App" class="px-[15px]">
      <Router>
        <Header />
        <Content />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
