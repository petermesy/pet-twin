import React,{useState} from 'react'
import PetAvatar from './PetAvatar.tsx'
import dogImage from './assets/dogImage.avif'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>My Digital Pet Twin 🐾</h1>
      <PetAvatar imageUrl={dogImage} />
    </div>
  )
}

export default App
