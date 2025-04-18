// import { useState } from 'react'

import './css/App.css'
import Home from './Pages/Home.jsx'
import Favorites from './Pages/Favorites.jsx'
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import { ProvideMovie } from './contexts/MovieContext.jsx'
import SingleMovie from './Pages/SingleMovie.jsx'


function App() {
  return (
    <ProvideMovie>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/singleMovie/:id" element={<SingleMovie />} />
        </Routes>

      </main>
    </ProvideMovie>
  );
}

export default App