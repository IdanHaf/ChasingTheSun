
import React, { useState } from 'react';
import './App.css';
import Counter from './Counter';

function App() {

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-center">React Basics</h1>
      <Counter>

      </Counter>
    </div>
  );
}

export default App;
