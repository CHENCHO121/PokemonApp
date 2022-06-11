import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/navbar';
import Login from './Components/login';
import Home from './Components/home';
import LikedPokemons from './Components/likedPokemons';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/likedPokemons" element={<LikedPokemons />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
