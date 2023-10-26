import React from 'react';
import Panorama from './pages/Panorama';
import KeyMap from './pages/KeyMap';
import IntelligenceMode from './pages/IntelligenceMode';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";


function App() {

  return (
        <Router>
            <Link to="/intelligenceMode">intelligence mode</Link>

            <Routes>
            <Route path="/" element={<Panorama/>}/>
            <Route path="/keymap" element={<KeyMap/>}/>
            <Route path="/intelligenceMode" element={<IntelligenceMode/>}/>

          </Routes>
        </Router>
  );
}

export default App;




