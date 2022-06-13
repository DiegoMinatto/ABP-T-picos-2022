
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './Paginas/Login'
import Home from './Paginas/Home'
import Chaves from './Paginas/Chaves'
import Usuarios from './Paginas/Usuarios'
import Reservas from './Paginas/Reservas'





function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chaves" element={<Chaves />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/reservas" element={<Reservas />} />
      </Routes>
    </div>
  );
}

export default App;
