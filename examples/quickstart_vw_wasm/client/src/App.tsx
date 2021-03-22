import React from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar';
import Game from './components/Game';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Game />
      </div>
    </>
  );
}

export default App;
