import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import CalculatorScreen from './Screens/CalculatorScreen';
import MapScreen from './Screens/MapScreen';
import CatScreen from './Screens/CatScreen';

const App = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Calculator" />
        <Tab label="Map" />
        <Tab label="Cat" />
      </Tabs>
      <Box sx={{ padding: 2 }}>
        {value === 0 && <CalculatorScreen />}
        {value === 1 && <MapScreen />}
        {value === 2 && <CatScreen />}
      </Box>
    </Box>
  );
};

export default App;



