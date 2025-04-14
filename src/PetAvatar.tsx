import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Circle } from 'react-konva';
import Konva from 'konva'; // 👈 Import Konva to use Tween
import useImage from './useIMage';

interface PetAvatarProps {
  imageUrl: string;
}

const PetAvatar: React.FC<PetAvatarProps> = ({ imageUrl }) => {
  const [image] = useImage(imageUrl);
  const [emotion, setEmotion] = useState<'idle' | 'happy' | 'sad' | 'blinking'>('idle');

  const leftCheekRef = useRef<any>(null);
  const rightCheekRef = useRef<any>(null);

  // Blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEmotion((prev) => (prev === 'idle' ? 'blinking' : prev));
      setTimeout(() => setEmotion('idle'), 200);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Trigger happy reaction
  const makePetHappy = () => {
    setEmotion('happy');
  
    new Konva.Tween({
      node: leftCheekRef.current,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 0.3,
    }).play();
  
    new Konva.Tween({
      node: rightCheekRef.current,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 0.3,
    }).play();
  
    setTimeout(() => {
      setEmotion('idle');
  
      new Konva.Tween({
        node: leftCheekRef.current,
        scaleX: 1,
        scaleY: 1,
        duration: 0.3,
      }).play();
  
      new Konva.Tween({
        node: rightCheekRef.current,
        scaleX: 1,
        scaleY: 1,
        duration: 0.3,
      }).play();
    }, 2000);
  };
  

  return (
    <div style={{ textAlign: 'center' }}>
   <Stage width={400} height={400}>
  <Layer>
    {/* Pet image */}
    {image && <KonvaImage image={image} width={300} height={300} />}

    {/* Blinking effect */}
    {emotion === 'blinking' && (
      <Rect x={90} y={100} width={120} height={30} fill="black" opacity={0.3} cornerRadius={15} />
    )}

    {/* 👇 Happy cheeks (conditionally rendered) */}
    {emotion === 'happy' && (
      <>
        <Circle
          ref={leftCheekRef}
          x={110}
          y={170}
          radius={12}
          fill="#ffb6c1"
          opacity={0.6}
        />
        <Circle
          ref={rightCheekRef}
          x={190}
          y={170}
          radius={12}
          fill="#ffb6c1"
          opacity={0.6}
        />
      </>
    )}
  </Layer>
</Stage>


      {/* 👇 Button to trigger happy emotion */}
      <button
        onClick={makePetHappy}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '10px',
          backgroundColor: '#ffca3a',
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
