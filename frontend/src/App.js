import React from "react";
import Panorama from "./pages/Panorama";
import KeyMap from "./pages/KeyMap";
import { Clues } from "./pages/Clues";
import IntelligenceMode from "./pages/IntelligenceMode";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useMap, Map } from "./utility/useMap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import ManagersPage from "./pages/ManagersPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      {/*<Link to="/intelligenceMode">intelligence mode</Link>*/}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Panorama" element={<Panorama />} />
        <Route path="/keymap" element={<KeyMap />} />
        <Route path="/intelligenceMode" element={<IntelligenceMode />} />
        <Route path="/clues" element={<Clues />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/managers" element={<ManagersPage />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
