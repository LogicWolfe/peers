import React from 'react'
import logo from './logo.svg'
import tauriCircles from './tauri.svg'
import tauriWord from './wordmark.svg'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="inline-logo">
          <img src={tauriCircles} className="App-logo rotate" alt="logo" />
          <h1>Peers</h1>
        </div>
        <p>
          Quick and easy peer review aggregation.
        </p>
      </header>
    </div>
  )
}

export default App
