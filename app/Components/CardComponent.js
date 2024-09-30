import React, { useState } from 'react';

const Card = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`w-full max-w-xs text-center cursor-pointer perspective`}
      onClick={handleFlip}
    >
      <div className={`relative h-48 mx-auto rounded-lg bg-white border-4 border-darkgreen shadow-md transition-transform duration-500 transform ${flipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute inset-0 flex justify-center items-center backface-hidden">
          <div className="py-16 px-4">
            <h5 className="text-lg font-bold dark:text-white">{front}</h5>
          </div>
        </div>
        <div className="absolute inset-0 flex justify-center items-center backface-hidden rotate-y-180">
          <div className="py-16 px-4">
            <h5 className="text-lg font-bold dark:text-white">{back}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
