import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";

import Home from "./page/home/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
