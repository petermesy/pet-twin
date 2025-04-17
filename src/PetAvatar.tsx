import React, { useState } from 'react';
import Lottie from 'lottie-react'; // Import Lottie
import { Stage, Layer } from 'react-konva'; // Import Konva components

const PetAvatar: React.FC<{ animationData: any; emotion: string }> = ({
  animationData,
  emotion,
}) => {
  const [currentEmotion, setCurrentEmotion] = useState(emotion); // State to manage emotion

  const makePetHappy = () => {
    setCurrentEmotion('happy'); // Change emotion to happy
    setTimeout(() => setCurrentEmotion('idle'), 2000); // Reset to idle after 2 seconds
  };

  return (
    <div style={{ textAlign: 'center', position: 'relative', width: '400px', height: '400px' }}>
      {/* Render Lottie Animation */}
      <Lottie
        animationData={animationData}
        loop={true}
        style={{
          position: 'absolute', // Position Lottie over the canvas
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none', // Prevent Lottie from blocking interactions
        }}
      />

      {/* Konva Canvas */}
      <Stage width={400} height={400}>
        <Layer>
          {/* Add Konva shapes here if needed */}
        </Layer>
      </Stage>

      {/* Make Me Happy Button */}
      <button
        onClick={makePetHappy}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '10px',
          backgroundColor: '#8bc34a',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Make Me Happy 😊
      </button>
    </div>
  );
};

export default PetAvatar;