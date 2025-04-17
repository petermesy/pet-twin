import React, { useState } from 'react';
import PetAvatar from './PetAvatar.tsx';
import petAnimation from './assets/happyAnimation.json'; // Import the Lottie JSON file

import './App.css';

function App() {
  const [emotion, setEmotion] = useState<'idle' | 'happy' | 'sad' | 'blinking'>('idle');
  const [chatHistory, setChatHistory] = useState<string[]>([]); // Chat history state

  const handleUserInput = (input: string) => {
    setChatHistory((prev) => [...prev, `You: ${input}`]);

    if (input.toLowerCase().includes('happy') || input.toLowerCase().includes('love')) {
      setEmotion('happy');
      setChatHistory((prev) => [...prev, 'Pet: Yay! I am so happy! 😊']);
    } else if (input.toLowerCase().includes('sad') || input.toLowerCase().includes('cry')) {
      setEmotion('sad');
      setChatHistory((prev) => [...prev, 'Pet: Oh no! Why are you sad? 😢']);
    } else {
      setEmotion('idle');
      setChatHistory((prev) => [...prev, "Pet: I'm here for you! 🐾"]);
    }
  };

  const feedPet = () => {
    setEmotion('happy');
    setChatHistory((prev) => [...prev, 'Pet: Yum! Thank you for the food! 🍎']);
    setTimeout(() => setEmotion('idle'), 3000); // Reset to idle after 2 seconds
  };

  const makePetHappy = () => {
    setEmotion('happy');
    setChatHistory((prev) => [...prev, 'Pet: Yay! You made me happy! 😊']);
    setTimeout(() => setEmotion('idle'), 3000); // Reset to idle after 2 seconds
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>My Digital Pet Twin 🐾</h1>
      {/* Pass the Lottie animation JSON to PetAvatar */}
      <PetAvatar animationData={petAnimation} emotion={emotion} />

      {/* Chat History */}
      <div
        style={{
          margin: '20px auto',
          padding: '10px',
          width: '80%',
          height: '200px',
          overflowY: 'scroll',
          border: '1px solid #ccc',
          borderRadius: '10px',
          textAlign: 'left',
        }}
      >
        {chatHistory.map((line, index) => (
          <p key={index} style={{ margin: '5px 0' }}>
            {line}
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Talk to your pet..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleUserInput(e.currentTarget.value);
        }}
        style={{
          marginTop: '20px',
          padding: '10px',
          width: '80%',
          fontSize: '16px',
          borderRadius: '10px',
          border: '1px solid #ccc',
        }}
      />

      {/* Make Me Happy Button */}
      <button
        onClick={makePetHappy}
        style={{
          marginTop: '20px',
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

      {/* Feed Me Button */}
      <button
        onClick={feedPet}
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
        Feed Me 🍎
      </button>
    </div>
  );
}

export default App;