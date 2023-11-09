import React from "react";
import Panorama from "./pages/Panorama";
import KeyMap from "./pages/KeyMap";
import Clues from "./components/Clues";
import IntelligenceMode from "./pages/IntelligenceMode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Panorama" element={<Panorama />} />
        <Route path="/keymap" element={<KeyMap />} />
        <Route path="/intelligenceMode" element={<IntelligenceMode />} />
        <Route path="/clues" element={<Clues />} />
      </Routes>
    </Router>
  );
}

export default App;
