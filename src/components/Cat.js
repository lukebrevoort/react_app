import React, { useState } from 'react';

const Cat = () => {
  const [rotation, setRotation] = useState(0);

  const rotateCat = () => {
    setRotation(rotation + 90);
  };

  return (
    <div>
      <img
        src="https://placekitten.com/200/300"
        alt="cat"
        style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.5s' }}
        onClick={rotateCat}
      />
    </div>
  );
};

export default Cat;
