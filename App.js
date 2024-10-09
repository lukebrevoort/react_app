import React from 'react';
import Calculator from './components/Cal';
import Map from './components/Map';
import RotatingCat from './components/Cat';

const App = () => {
  return (
    <div>
      <h1>React App</h1>
      <Calculator />
      <Map />
      <RotatingCat />
    </div>
  );
};

export default App;