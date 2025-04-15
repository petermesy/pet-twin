import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Rect, Circle } from "react-konva";
import Konva from "konva"; // 👈 Import Konva to use Tween
import useImage from "./useIMage";

interface PetAvatarProps {
  imageUrl: string;
  emotion: "idle" | "happy" | "sad" | "blinking";
}

const PetAvatar: React.FC<PetAvatarProps> = ({ imageUrl }) => {
  const [image] = useImage(imageUrl);
  const [emotion, setEmotion] = useState<"idle" | "happy" | "sad" | "blinking">(
    "idle"
  );
  const [foodPosition, setFoodPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const leftCheekRef = useRef<any>(null);
  const rightCheekRef = useRef<any>(null);

  // Blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEmotion('blinking');
      setTimeout(() => setEmotion('idle'), 500); // Blink for 0.5 seconds
    }, 4000); // Blink every 4 seconds
  
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (emotion === "happy") {
      // Simulate food falling animation
      setFoodPosition({ x: 150, y: 0 }); // Start position
      const interval = setInterval(() => {
        setFoodPosition(
          (prev) => (prev && prev.y < 300 ? { ...prev, y: prev.y + 10 } : null) // Move food down
        );
      }, 50);
      return () => clearInterval(interval);
    }
  }, [emotion]);

  // Trigger happy reaction
  const makePetHappy = () => {
    setEmotion("happy");

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
      setEmotion("idle");

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
    <div style={{ textAlign: "center" }}>
      <Stage width={400} height={400}>
        <Layer>
          {/* Pet image */}
          {image && <KonvaImage image={image} width={300} height={300} />}

          {/* Blinking effect */}
          {emotion === "blinking" && (
            <Rect
              x={90}
              y={100}
              width={120}
              height={30}
              fill="black"
              opacity={0.3}
              cornerRadius={15}
            />
          )}

          {/* Happy cheeks */}
          {emotion === "happy" && (
            <>
              <Circle
                x={100}
                y={130}
                radius={12}
                fill="#ffb6c1"
                opacity={0.5}
              />
              <Circle
                x={200}
                y={130}
                radius={12}
                fill="#ffb6c1"
                opacity={0.5}
              />
            </>
          )}

          {/* Sad tears */}
          {emotion === "sad" && (
            <>
              <Circle x={120} y={200} radius={5} fill="blue" opacity={0.6} />
              <Circle x={180} y={200} radius={5} fill="blue" opacity={0.6} />
            </>
          )}

          {foodPosition && (
            <Circle
              x={foodPosition.x}
              y={foodPosition.y}
              radius={10}
              fill="orange"
            />
          )}
        </Layer>
      </Stage>

      {/* 👇 Button to trigger happy emotion */}
      <button
        onClick={makePetHappy}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "10px",
          backgroundColor: "#ffca3a",
          border: "none",
          cursor: "pointer",
        }}
      >
        Make Me Happy 😊
      </button>
    </div>
  );
};

export default PetAvatar;
