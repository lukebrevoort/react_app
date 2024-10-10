// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const calculate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/calculate', {
        expression: input
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error calculating:', error);
      setResult('Error');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>GoLang Calculator</h1>
      <input 
        type="text" 
        value={input} 
        onChange={handleInput} 
        placeholder="Enter expression"
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button onClick={calculate} style={{ padding: '5px' }}>Calculate</button>
      <h3>Result: {result}</h3>
    </div>
  );
};

export default App;
