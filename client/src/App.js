import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen pr-[15px] pl-[15px]">
      <Router>
        <Header />
        <div className="flex-grow ">
          <Content />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
