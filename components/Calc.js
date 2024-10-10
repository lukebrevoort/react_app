// src/components/Calc.js
import React, { useState } from 'react';
import axios from 'axios';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const calculate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/calculate', { expression: input });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error calculating:', error);
      setResult('Error');
    }
  };

  return (
    <div>
      <h2>Basic Calculator</h2>
      <input type="text" value={input} onChange={handleInput} placeholder="Enter expression" />
      <button onClick={calculate}>Calculate</button>
      <h3>Result: {result}</h3>
    </div>
  );
};

export default Calculator;
