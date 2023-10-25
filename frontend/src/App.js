import React from 'react';
import Panorama from './Panorama';
import KeyMap from './KeyMap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Panorama/>}/>
        <Route path="/keymap" element={<KeyMap/>}/>
      </Routes>
    </Router>
  );
}

export default App;




