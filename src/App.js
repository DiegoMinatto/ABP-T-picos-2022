
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './Paginas/Login'
import Teste from './Paginas/Teste'





function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path={'/teste'}
          element={false ? <Teste /> : <Navigate to="/" />} 
        />
      </Routes>
    </div>
  );
}

export default App;
