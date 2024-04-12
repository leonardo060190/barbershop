import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";

import Home from "./page/home/home";
import SplintUser from "./page/splintUser/splintUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/splintUser" element={<SplintUser />} />
      </Routes>
    </Router>
  );
}

export default App;
