import logo from "./logo.svg";
import Search from "./Search/Search";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RateListMenu from "./pages/rateListMenu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/rateListMenu" element={<RateListMenu />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
